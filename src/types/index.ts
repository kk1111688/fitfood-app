export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
  targetMuscle: string;
  difficulty: '初级' | '中级' | '高级';
  sets: number;
  reps: number;
  imageUrl: string;
  gifUrl?: string;
  tips: string;
  calories: number;
  equipment?: string;
  instructions?: string[];
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  type: '减脂' | '增肌' | '均衡';
  mealTime: '早餐' | '午餐' | '晚餐' | '加餐';
  ingredients: string[];
  instructions: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  height: number;
  weight: number;
  fitnessGoal: '减脂' | '增肌' | '塑形' | '健康';
  createdAt: string;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  exerciseId: string;
  date: string;
  setsCompleted: number;
  repsCompleted: number;
  weightUsed?: number;
  duration?: number;
}

export interface MealLog {
  id: string;
  userId: string;
  mealId: string;
  date: string;
  quantity: number;
  mealTime: string;
}

export interface DailyStats {
  date: string;
  caloriesIntake: number;
  caloriesBurned: number;
  exercisesCompleted: number;
  mealsEaten: number;
}

export type CategoryType = '胸部' | '背部' | '腿部' | '肩部' | '手臂' | '核心' | '有氧' | '拉伸';
