import { Meal, User, DailyStats, CategoryType } from '../types';
import { exercises, categories } from './exercises';

export { exercises, categories };

export const meals: Meal[] = [
  {
    id: '1',
    name: '鸡胸肉沙拉',
    description: '高蛋白低脂肪的健康沙拉，适合减脂人群',
    type: '减脂',
    mealTime: '午餐',
    ingredients: ['鸡胸肉150g', '生菜100g', '番茄50g', '黄瓜50g', '橄榄油10ml'],
    instructions: ['鸡胸肉煮熟切块', '蔬菜洗净切块', '加入橄榄油和盐调味', '搅拌均匀即可'],
    calories: 320,
    protein: 35,
    carbs: 12,
    fat: 12,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20salad%20healthy%20food&image_size=square'
  },
  {
    id: '2',
    name: '燕麦牛奶早餐',
    description: '营养丰富的早餐，提供持久能量',
    type: '均衡',
    mealTime: '早餐',
    ingredients: ['燕麦片50g', '牛奶200ml', '香蕉1根', '坚果20g'],
    instructions: ['牛奶加热', '加入燕麦片煮3-5分钟', '香蕉切片，加入坚果', '搅拌均匀即可'],
    calories: 420,
    protein: 15,
    carbs: 60,
    fat: 12,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oatmeal%20breakfast%20healthy%20food&image_size=square'
  },
  {
    id: '3',
    name: '三文鱼蔬菜饭',
    description: '富含Omega-3的健康餐，适合增肌和减脂',
    type: '均衡',
    mealTime: '晚餐',
    ingredients: ['三文鱼150g', '糙米100g', '西兰花100g', '胡萝卜50g'],
    instructions: ['三文鱼用盐和黑胡椒腌制', '蔬菜焯水', '三文鱼煎熟', '搭配米饭和蔬菜'],
    calories: 520,
    protein: 30,
    carbs: 45,
    fat: 20,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=salmon%20rice%20vegetables%20healthy%20dinner&image_size=square'
  },
  {
    id: '4',
    name: '蛋白香蕉奶昔',
    description: '快速补充蛋白质，适合运动后或加餐',
    type: '增肌',
    mealTime: '加餐',
    ingredients: ['蛋白粉25g', '香蕉1根', '牛奶200ml', '冰块适量'],
    instructions: ['所有材料放入搅拌机', '搅拌30秒至顺滑', '倒入杯中即可饮用'],
    calories: 380,
    protein: 30,
    carbs: 35,
    fat: 8,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=protein%20shake%20smoothie%20healthy&image_size=square'
  },
  {
    id: '5',
    name: '牛肉蔬菜汤',
    description: '营养丰富的汤品，低卡高营养',
    type: '减脂',
    mealTime: '晚餐',
    ingredients: ['瘦牛肉100g', '番茄2个', '土豆1个', '胡萝卜1根', '洋葱半个'],
    instructions: ['牛肉切块焯水', '蔬菜切块', '锅中加水煮沸', '加入所有食材煮20分钟', '加盐调味'],
    calories: 280,
    protein: 25,
    carbs: 20,
    fat: 8,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beef%20vegetable%20soup%20healthy&image_size=square'
  },
  {
    id: '6',
    name: '全麦三明治',
    description: '便捷营养的午餐选择',
    type: '均衡',
    mealTime: '午餐',
    ingredients: ['全麦面包2片', '鸡胸肉100g', '生菜2片', '番茄2片', '低脂芝士1片'],
    instructions: ['鸡胸肉煮熟切片', '面包上依次放生菜、番茄、鸡胸肉、芝士', '盖上另一片面包', '对角切开'],
    calories: 380,
    protein: 28,
    carbs: 35,
    fat: 12,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=whole%20wheat%20sandwich%20healthy%20lunch&image_size=square'
  },
  {
    id: '7',
    name: '鸡蛋菠菜卷',
    description: '高蛋白低碳水的早餐选择',
    type: '减脂',
    mealTime: '早餐',
    ingredients: ['鸡蛋2个', '菠菜50g', '全麦饼皮1张', '低脂酸奶20g'],
    instructions: ['鸡蛋打散煎成蛋皮', '菠菜焯水切碎', '饼皮上抹酸奶，放蛋皮和菠菜', '卷起来即可'],
    calories: 250,
    protein: 20,
    carbs: 15,
    fat: 12,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=egg%20spinach%20wrap%20breakfast&image_size=square'
  },
  {
    id: '8',
    name: '希腊酸奶水果碗',
    description: '富含益生菌和膳食纤维的健康加餐',
    type: '均衡',
    mealTime: '加餐',
    ingredients: ['希腊酸奶150g', '蓝莓50g', '草莓50g', '燕麦片30g', '蜂蜜10g'],
    instructions: ['酸奶倒入碗中', '加入洗净的水果', '撒上燕麦片', '淋上蜂蜜'],
    calories: 280,
    protein: 18,
    carbs: 35,
    fat: 5,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=greek%20yogurt%20fruit%20bowl%20healthy&image_size=square'
  },
  {
    id: '9',
    name: '鸡腿糙米餐',
    description: '增肌期理想的蛋白质来源',
    type: '增肌',
    mealTime: '午餐',
    ingredients: ['去皮鸡腿150g', '糙米120g', '芦笋100g', '橄榄油10ml'],
    instructions: ['鸡腿用盐、黑胡椒、大蒜粉腌制', '烤箱200度烤20分钟', '芦笋焯水', '搭配糙米和芦笋'],
    calories: 550,
    protein: 40,
    carbs: 50,
    fat: 18,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20leg%20brown%20rice%20meal&image_size=square'
  },
  {
    id: '10',
    name: '豆腐蔬菜炒面',
    description: '素食者的优质选择，营养均衡',
    type: '均衡',
    mealTime: '晚餐',
    ingredients: ['豆腐150g', '全麦面条100g', '青菜100g', '胡萝卜50g', '生抽10ml'],
    instructions: ['面条煮熟备用', '豆腐切块煎至金黄', '蔬菜切丝炒熟', '加入面条和生抽翻炒'],
    calories: 420,
    protein: 22,
    carbs: 55,
    fat: 12,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tofu%20vegetable%20stir%20fried%20noodles&image_size=square'
  }
];

export const currentUser: User = {
  id: '1',
  email: 'user@example.com',
  name: '健身达人',
  avatarUrl: '',
  height: 175,
  weight: 70,
  fitnessGoal: '增肌',
  createdAt: '2024-01-01'
};

export const dailyStats: DailyStats[] = [
  { date: '周一', caloriesIntake: 1800, caloriesBurned: 450, exercisesCompleted: 3, mealsEaten: 3 },
  { date: '周二', caloriesIntake: 2000, caloriesBurned: 520, exercisesCompleted: 4, mealsEaten: 4 },
  { date: '周三', caloriesIntake: 1900, caloriesBurned: 380, exercisesCompleted: 2, mealsEaten: 3 },
  { date: '周四', caloriesIntake: 2100, caloriesBurned: 600, exercisesCompleted: 5, mealsEaten: 4 },
  { date: '周五', caloriesIntake: 1850, caloriesBurned: 480, exercisesCompleted: 3, mealsEaten: 3 },
  { date: '周六', caloriesIntake: 2200, caloriesBurned: 700, exercisesCompleted: 6, mealsEaten: 4 },
  { date: '周日', caloriesIntake: 1950, caloriesBurned: 400, exercisesCompleted: 2, mealsEaten: 3 }
];

export const todayPlan = {
  exercises: exercises.slice(0, 3),
  meals: meals.filter(m => m.mealTime === '早餐' || m.mealTime === '午餐' || m.mealTime === '晚餐').slice(0, 3)
};
