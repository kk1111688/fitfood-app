import { WorkoutPlan, UserProfile, DailyLog } from '../types';

export const workoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    name: '全身入门计划',
    description: '适合健身新手的全身训练计划，每周3次，每次45分钟。',
    duration: 45,
    exercises: ['1', '2', '8', '10'],
    calories: 300,
    level: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: '增肌训练计划',
    description: '针对增肌目标的训练计划，每周4次，分为上下肢训练。',
    duration: 60,
    exercises: ['4', '5', '6', '11'],
    calories: 450,
    level: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: '减脂燃脂计划',
    description: '高强度间歇训练计划，快速燃烧卡路里。',
    duration: 30,
    exercises: ['7', '9', '15'],
    calories: 400,
    level: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: '核心强化计划',
    description: '专门针对核心肌群的训练计划，改善体态和平衡。',
    duration: 30,
    exercises: ['8', '9', '10'],
    calories: 200,
    level: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    name: '力量进阶计划',
    description: '针对有一定基础的健身者，提升整体力量水平。',
    duration: 60,
    exercises: ['3', '4', '5', '6'],
    calories: 500,
    level: 'advanced',
    imageUrl: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    name: '居家健身计划',
    description: '无需器械的居家训练计划，随时随地都能锻炼。',
    duration: 30,
    exercises: ['1', '2', '8', '9', '10'],
    calories: 280,
    level: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1540206276207-3af25c089d36?w=400&h=300&fit=crop'
  }
];

export const userProfile: UserProfile = {
  id: 'user-1',
  name: '健身爱好者',
  avatar: '',
  height: 175,
  weight: 70,
  age: 28,
  gender: 'male',
  activityLevel: 'moderate',
  goal: 'lose_weight',
  targetCalories: 2000,
  streak: 5,
  totalWorkouts: 28,
  totalCaloriesBurned: 12500,
  joinDate: '2026-06-01'
};

export const todayLog: DailyLog = {
  id: 'log-' + new Date().toISOString().split('T')[0],
  date: new Date().toISOString().split('T')[0],
  exercises: [],
  meals: [],
  caloriesBurned: 0,
  caloriesConsumed: 0,
  water: 1200,
  sleep: 7,
  notes: ''
};

export const weeklyLogs: DailyLog[] = [
  {
    id: 'log-2026-07-21',
    date: '2026-07-21',
    exercises: [],
    meals: [],
    caloriesBurned: 350,
    caloriesConsumed: 1800,
    water: 1500,
    sleep: 8,
    notes: ''
  },
  {
    id: 'log-2026-07-22',
    date: '2026-07-22',
    exercises: [],
    meals: [],
    caloriesBurned: 420,
    caloriesConsumed: 1950,
    water: 1800,
    sleep: 7.5,
    notes: ''
  },
  {
    id: 'log-2026-07-23',
    date: '2026-07-23',
    exercises: [],
    meals: [],
    caloriesBurned: 0,
    caloriesConsumed: 2100,
    water: 1200,
    sleep: 9,
    notes: '休息日'
  },
  {
    id: 'log-2026-07-24',
    date: '2026-07-24',
    exercises: [],
    meals: [],
    caloriesBurned: 380,
    caloriesConsumed: 1750,
    water: 2000,
    sleep: 7,
    notes: ''
  },
  {
    id: 'log-2026-07-25',
    date: '2026-07-25',
    exercises: [],
    meals: [],
    caloriesBurned: 450,
    caloriesConsumed: 1850,
    water: 1600,
    sleep: 6.5,
    notes: ''
  },
  {
    id: 'log-2026-07-26',
    date: '2026-07-26',
    exercises: [],
    meals: [],
    caloriesBurned: 300,
    caloriesConsumed: 2000,
    water: 1400,
    sleep: 8,
    notes: ''
  },
  {
    id: 'log-2026-07-27',
    date: '2026-07-27',
    exercises: [],
    meals: [],
    caloriesBurned: 0,
    caloriesConsumed: 1600,
    water: 1200,
    sleep: 7,
    notes: ''
  }
];