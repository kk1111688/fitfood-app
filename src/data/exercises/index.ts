import rawExercises from './exercises.json';

export interface RawExercise {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  bodyPart: string;
  equipment: string;
  equipmentEn: string;
  target: string;
  targetEn: string;
  muscles: string[];
  musclesEn: string[];
  difficulty: string;
  difficultyEn: string;
  mediaId: string;
  gifUrl: string;
  thumbnailUrl: string;
  instructions: {
    zh: string[];
    en: string[];
  };
}

export interface AdaptedExercise {
  id: string;
  name: string;
  description: string;
  category: string;
  targetMuscle: string;
  difficulty: '初级' | '中级' | '高级';
  sets: number;
  reps: number;
  imageUrl: string;
  gifUrl: string;
  tips: string;
  calories: number;
  equipment: string;
  instructions: string[];
}

const difficultyMap: Record<string, '初级' | '中级' | '高级'> = {
  '初级': '初级',
  '中级': '中级',
  '高级': '高级',
  'beginner': '初级',
  'intermediate': '中级',
  'advanced': '高级',
};

const getSetsReps = (difficulty: string) => {
  switch (difficulty) {
    case '初级':
    case 'beginner':
      return { sets: 3, reps: 15 };
    case '中级':
    case 'intermediate':
      return { sets: 4, reps: 12 };
    case '高级':
    case 'advanced':
      return { sets: 4, reps: 8 };
    default:
      return { sets: 3, reps: 12 };
  }
};

const getCalories = (difficulty: string) => {
  switch (difficulty) {
    case '初级':
    case 'beginner':
      return 8;
    case '中级':
    case 'intermediate':
      return 12;
    case '高级':
    case 'advanced':
      return 18;
    default:
      return 10;
  }
};

export const adaptExercises = (): AdaptedExercise[] => {
  return rawExercises.map((exercise: RawExercise): AdaptedExercise => {
    const { sets, reps } = getSetsReps(exercise.difficulty);
    const calories = getCalories(exercise.difficulty);
    
    return {
      id: exercise.id,
      name: exercise.name,
      description: `锻炼${exercise.target}的${exercise.difficulty}级动作，使用${exercise.equipment}完成`,
      category: exercise.category,
      targetMuscle: exercise.muscles.join('、'),
      difficulty: difficultyMap[exercise.difficulty],
      sets,
      reps,
      imageUrl: exercise.thumbnailUrl,
      gifUrl: exercise.gifUrl,
      tips: '注意保持正确姿势，避免受伤',
      calories,
      equipment: exercise.equipment,
      instructions: exercise.instructions.zh,
    };
  });
};

export const exercises = adaptExercises();

export const categories = ['胸部', '背部', '腿部', '肩部', '手臂', '核心', '有氧', '拉伸'];

export const equipments = ['徒手', '哑铃', '杠铃', '绳索', '单杠', '划船机', '瑜伽垫'];
