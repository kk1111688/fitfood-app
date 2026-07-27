import { create } from 'zustand';
import { UserProfile, DailyLog } from '../types';
import { userProfile, todayLog } from '../data/plans';

interface AppStore {
  user: UserProfile;
  todayLog: DailyLog;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  updateWater: (water: number) => void;
  updateSleep: (sleep: number) => void;
  addExercise: (exerciseId: string, sets: number, reps: number) => void;
  addMeal: (mealId: string, servings: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: userProfile,
  todayLog: todayLog,
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  updateWater: (water) => set((state) => ({ todayLog: { ...state.todayLog, water } })),
  updateSleep: (sleep) => set((state) => ({ todayLog: { ...state.todayLog, sleep } })),
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
}));