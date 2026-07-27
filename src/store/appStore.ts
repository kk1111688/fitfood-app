import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, DailyLog } from '../types';
import { userProfile, todayLog } from '../data/plans';

interface AppStore {
  user: UserProfile;
  todayLog: DailyLog;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  updateUser: (data: Partial<UserProfile>) => void;
  updateWater: (water: number) => void;
  updateSleep: (sleep: number) => void;
  updateCalories: (burned: number, consumed: number) => void;
  addExercise: (exerciseId: string, sets: number, reps: number) => void;
  addMeal: (mealId: string, servings: number) => void;
  resetTodayLog: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: userProfile,
      todayLog: todayLog,
      activeTab: 'home',
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
    }),
    {
      name: 'fitfood-storage',
    }
  )
);