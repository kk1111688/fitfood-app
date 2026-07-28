export interface Exercise {
  id: string;
  name: string;
  category: string;
  targetMuscles: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string;
  description: string;
  instructions: string[];
  sets: number;
  reps: string;
  restTime: string;
  calories: number;
  imageUrl: string;
  gifUrl?: string;
}

export interface Meal {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  ingredients: string[];
  instructions: string;
  description: string;
  imageUrl: string;
  prepTime: string;
  servings: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  exercises: string[];
  calories: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
}

export interface DailyLog {
  id: string;
  date: string;
  exercises: CompletedExercise[];
  meals: CompletedMeal[];
  caloriesBurned: number;
  caloriesConsumed: number;
  water: number;
  sleep: number;
  notes: string;
}

export interface CompletedExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
}

export interface CompletedMeal {
  mealId: string;
  servings: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_fitness';
  targetCalories: number;
  streak: number;
  totalWorkouts: number;
  totalCaloriesBurned: number;
  joinDate: string;
}

export interface Stat {
  label: string;
  value: string | number;
  subValue?: string;
  icon: string;
  color: 'primary' | 'healthy' | 'blue' | 'purple' | 'orange';
}

export interface WorkoutRecord {
  id: string;
  date: string;
  planId?: string;
  planName: string;
  duration: number;
  caloriesBurned: number;
  exercisesCompleted: number;
  totalSets: number;
  totalReps: number;
  notes?: string;
}

export interface WeightRecord {
  date: string;
  weight: number;
  bmi: number;
}