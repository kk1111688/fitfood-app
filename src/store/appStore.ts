import { create } from 'zustand';
import { User, Exercise, Meal, WorkoutLog, MealLog, DailyStats } from '../types';
import { currentUser, exercises, meals, dailyStats } from '../data/mockData';

interface AppState {
  user: User;
  exercises: Exercise[];
  meals: Meal[];
  workoutLogs: WorkoutLog[];
  mealLogs: MealLog[];
  stats: DailyStats[];
  completedExercises: string[];
  completedMeals: string[];
  updateUser: (user: Partial<User>) => void;
  addWorkoutLog: (log: Omit<WorkoutLog, 'id'>) => void;
  addMealLog: (log: Omit<MealLog, 'id'>) => void;
  toggleExerciseComplete: (exerciseId: string) => void;
  toggleMealComplete: (mealId: string) => void;
  getTodayCaloriesIntake: () => number;
  getTodayCaloriesBurned: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: currentUser,
  exercises: exercises,
  meals: meals,
  workoutLogs: [],
  mealLogs: [],
  stats: dailyStats,
  completedExercises: [],
  completedMeals: [],

  updateUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  })),

  addWorkoutLog: (log) => set((state) => ({
    workoutLogs: [...state.workoutLogs, { ...log, id: Date.now().toString() }]
  })),

  addMealLog: (log) => set((state) => ({
    mealLogs: [...state.mealLogs, { ...log, id: Date.now().toString() }]
  })),

  toggleExerciseComplete: (exerciseId) => set((state) => ({
    completedExercises: state.completedExercises.includes(exerciseId)
      ? state.completedExercises.filter(id => id !== exerciseId)
      : [...state.completedExercises, exerciseId]
  })),

  toggleMealComplete: (mealId) => set((state) => ({
    completedMeals: state.completedMeals.includes(mealId)
      ? state.completedMeals.filter(id => id !== mealId)
      : [...state.completedMeals, mealId]
  })),

  getTodayCaloriesIntake: () => {
    const { mealLogs, meals } = get();
    return mealLogs.reduce((total, log) => {
      const meal = meals.find(m => m.id === log.mealId);
      return total + (meal ? meal.calories * log.quantity : 0);
    }, 0);
  },

  getTodayCaloriesBurned: () => {
    const { workoutLogs, exercises } = get();
    return workoutLogs.reduce((total, log) => {
      const exercise = exercises.find(e => e.id === log.exerciseId);
      return total + (exercise ? exercise.calories * log.setsCompleted : 0);
    }, 0);
  }
}));
