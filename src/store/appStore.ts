import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, DailyLog, WorkoutRecord, WeightRecord, WeeklyPlan, DayPlan } from '../types';
import { userProfile, todayLog } from '../data/plans';

interface AppStore {
  user: UserProfile;
  todayLog: DailyLog;
  activeTab: string;
  favoriteExercises: string[];
  favoriteMeals: string[];
  workoutHistory: WorkoutRecord[];
  weightHistory: WeightRecord[];
  lastCheckInDate: string | null;
  weeklyPlan: WeeklyPlan | null;
  setActiveTab: (tab: string) => void;
  updateUser: (data: Partial<UserProfile>) => void;
  updateWater: (water: number) => void;
  updateSleep: (sleep: number) => void;
  setCaloriesBurned: (calories: number) => void;
  setCaloriesConsumed: (calories: number) => void;
  addCaloriesBurned: (calories: number) => void;
  addCaloriesConsumed: (calories: number) => void;
  addExercise: (exerciseId: string, sets: number, reps: number) => void;
  addMeal: (mealId: string, servings: number, calories?: number) => void;
  removeMeal: (mealId: string) => void;
  resetTodayLog: () => void;
  toggleFavoriteExercise: (exerciseId: string) => void;
  toggleFavoriteMeal: (mealId: string) => void;
  addWorkoutRecord: (record: WorkoutRecord) => void;
  addWeightRecord: (weight: number) => void;
  checkIn: () => boolean;
  setWeeklyPlan: (plan: WeeklyPlan) => void;
  updateDayPlan: (dayIndex: number, dayPlan: Partial<DayPlan>) => void;
  clearWeeklyPlan: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      user: userProfile,
      todayLog: todayLog,
      activeTab: 'home',
      favoriteExercises: [],
      favoriteMeals: [],
      workoutHistory: [],
      weightHistory: [],
      lastCheckInDate: null,
      weeklyPlan: null,
      setActiveTab: (tab) => set({ activeTab: tab }),
      updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
      updateWater: (water) => set((state) => ({ todayLog: { ...state.todayLog, water } })),
      updateSleep: (sleep) => set((state) => ({ todayLog: { ...state.todayLog, sleep } })),
      setCaloriesBurned: (calories) => set((state) => ({
        todayLog: { ...state.todayLog, caloriesBurned: calories }
      })),
      setCaloriesConsumed: (calories) => set((state) => ({
        todayLog: { ...state.todayLog, caloriesConsumed: calories }
      })),
      addCaloriesBurned: (calories) => set((state) => ({
        todayLog: { 
          ...state.todayLog, 
          caloriesBurned: state.todayLog.caloriesBurned + calories 
        }
      })),
      addCaloriesConsumed: (calories) => set((state) => ({
        todayLog: { 
          ...state.todayLog, 
          caloriesConsumed: state.todayLog.caloriesConsumed + calories 
        }
      })),
      addExercise: (exerciseId, sets, reps) => set((state) => ({
        todayLog: {
          ...state.todayLog,
          exercises: [...state.todayLog.exercises, { exerciseId, sets, reps }]
        }
      })),
      addMeal: (mealId, servings, calories) => set((state) => {
        const meal = state.todayLog.meals.find(m => m.mealId === mealId);
        if (meal) {
          return state;
        }
        return {
          todayLog: {
            ...state.todayLog,
            meals: [...state.todayLog.meals, { mealId, servings }],
            caloriesConsumed: calories 
              ? state.todayLog.caloriesConsumed + calories 
              : state.todayLog.caloriesConsumed
          }
        };
      }),
      removeMeal: (mealId) => set((state) => {
        const meal = state.todayLog.meals.find(m => m.mealId === mealId);
        if (!meal) return state;
        return {
          todayLog: {
            ...state.todayLog,
            meals: state.todayLog.meals.filter(m => m.mealId !== mealId)
          }
        };
      }),
      resetTodayLog: () => set({ todayLog: { ...todayLog } }),
      toggleFavoriteExercise: (exerciseId) => set((state) => ({
        favoriteExercises: state.favoriteExercises.includes(exerciseId)
          ? state.favoriteExercises.filter(id => id !== exerciseId)
          : [...state.favoriteExercises, exerciseId]
      })),
      toggleFavoriteMeal: (mealId) => set((state) => ({
        favoriteMeals: state.favoriteMeals.includes(mealId)
          ? state.favoriteMeals.filter(id => id !== mealId)
          : [...state.favoriteMeals, mealId]
      })),
      addWorkoutRecord: (record) => set((state) => {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const lastWorkoutDate = state.workoutHistory[0]?.date;
        let newStreak = state.user.streak;
        if (lastWorkoutDate !== today && lastWorkoutDate !== yesterday) {
          newStreak = 1;
        } else if (lastWorkoutDate === yesterday) {
          newStreak = state.user.streak + 1;
        }
        return {
          workoutHistory: [record, ...state.workoutHistory],
          user: {
            ...state.user,
            totalWorkouts: state.user.totalWorkouts + 1,
            totalCaloriesBurned: state.user.totalCaloriesBurned + record.caloriesBurned,
            streak: newStreak
          },
          todayLog: {
            ...state.todayLog,
            caloriesBurned: state.todayLog.caloriesBurned + record.caloriesBurned
          }
        };
      }),
      checkIn: () => {
        const state = get();
        const today = new Date().toDateString();
        if (state.lastCheckInDate === today) {
          return false;
        }
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak = state.lastCheckInDate === yesterday
          ? state.user.streak + 1
          : 1;
        set({
          lastCheckInDate: today,
          user: { ...state.user, streak: newStreak }
        });
        return true;
      },
      addWeightRecord: (weight) => set((state) => {
        const newRecord: WeightRecord = {
          date: new Date().toISOString(),
          weight,
          bmi: weight / Math.pow(state.user.height / 100, 2)
        };
        return {
          weightHistory: [newRecord, ...state.weightHistory],
          user: {
            ...state.user,
            weight
          }
        };
      }),
      setWeeklyPlan: (plan) => set({ weeklyPlan: plan }),
      updateDayPlan: (dayIndex, dayPlan) => set((state) => {
        if (!state.weeklyPlan) return state;
        const newDays = [...state.weeklyPlan.days];
        newDays[dayIndex] = { ...newDays[dayIndex], ...dayPlan };
        return { weeklyPlan: { ...state.weeklyPlan, days: newDays } };
      }),
      clearWeeklyPlan: () => set({ weeklyPlan: null }),
    }),
    {
      name: 'fitfood-storage',
    }
  )
);