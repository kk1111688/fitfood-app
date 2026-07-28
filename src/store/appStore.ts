import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, DailyLog, WorkoutRecord, WeightRecord } from '../types';
import { userProfile, todayLog } from '../data/plans';

interface AppStore {
  user: UserProfile;
  todayLog: DailyLog;
  activeTab: string;
  favoriteExercises: string[];
  favoriteMeals: string[];
  workoutHistory: WorkoutRecord[];
  weightHistory: WeightRecord[];
  setActiveTab: (tab: string) => void;
  updateUser: (data: Partial<UserProfile>) => void;
  updateWater: (water: number) => void;
  updateSleep: (sleep: number) => void;
  updateCalories: (burned: number, consumed: number) => void;
  addExercise: (exerciseId: string, sets: number, reps: number) => void;
  addMeal: (mealId: string, servings: number) => void;
  resetTodayLog: () => void;
  toggleFavoriteExercise: (exerciseId: string) => void;
  toggleFavoriteMeal: (mealId: string) => void;
  addWorkoutRecord: (record: WorkoutRecord) => void;
  addWeightRecord: (weight: number) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: userProfile,
      todayLog: todayLog,
      activeTab: 'home',
      favoriteExercises: [],
      favoriteMeals: [],
      workoutHistory: [],
      weightHistory: [],
      setActiveTab: (tab) => set({ activeTab: tab }),
      updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
      updateWater: (water) => set((state) => ({ todayLog: { ...state.todayLog, water } })),
      updateSleep: (sleep) => set((state) => ({ todayLog: { ...state.todayLog, sleep } })),
      updateCalories: (burned, consumed) => set((state) => ({
        todayLog: {
          ...state.todayLog,
          caloriesBurned: burned,
          caloriesConsumed: consumed
        }
      })),
      addExercise: (exerciseId, sets, reps) => set((state) => ({
        todayLog: {
          ...state.todayLog,
          exercises: [...state.todayLog.exercises, { exerciseId, sets, reps }]
        }
      })),
      addMeal: (mealId, servings) => set((state) => ({
        todayLog: {
          ...state.todayLog,
          meals: [...state.todayLog.meals, { mealId, servings }]
        }
      })),
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
      addWorkoutRecord: (record) => set((state) => ({
        workoutHistory: [record, ...state.workoutHistory],
        user: {
          ...state.user,
          totalWorkouts: state.user.totalWorkouts + 1,
          totalCaloriesBurned: state.user.totalCaloriesBurned + record.caloriesBurned,
          streak: record.date === new Date(Date.now() - 86400000).toDateString() 
            ? state.user.streak + 1 
            : 1
        }
      })),
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
    }),
    {
      name: 'fitfood-storage',
    }
  )
);