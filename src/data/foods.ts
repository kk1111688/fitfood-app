export interface FoodItem {
  id: string;
  name: string;
  category: string;
  emoji: string;
  calories: number;
  unit: string;
  protein: number;
  carbs: number;
  fat: number;
}

export const foodCategories = [
  { id: 'all', name: '全部', icon: '🍽️' },
  { id: 'staple', name: '主食', icon: '🍚' },
  { id: 'meat', name: '肉类', icon: '🥩' },
  { id: 'vegetable', name: '蔬菜', icon: '🥬' },
  { id: 'fruit', name: '水果', icon: '🍎' },
  { id: 'snack', name: '零食', icon: '🍪' },
  { id: 'drink', name: '饮品', icon: '🥤' },
  { id: 'fastfood', name: '快餐', icon: '🍔' },
];

export const foodItems: FoodItem[] = [
  { id: 'f1', name: '米饭', category: 'staple', emoji: '🍚', calories: 116, unit: '100g/碗', protein: 2.6, carbs: 25.9, fat: 0.3 },
  { id: 'f2', name: '面条', category: 'staple', emoji: '🍜', calories: 110, unit: '100g/份', protein: 3.5, carbs: 22.5, fat: 0.6 },
  { id: 'f3', name: '馒头', category: 'staple', emoji: '🍞', calories: 223, unit: '100g/个', protein: 7.0, carbs: 47.0, fat: 1.1 },
  { id: 'f4', name: '燕麦片', category: 'staple', emoji: '🥣', calories: 377, unit: '100g', protein: 13.0, carbs: 67.0, fat: 7.0 },
  { id: 'f5', name: '红薯', category: 'staple', emoji: '🍠', calories: 99, unit: '100g', protein: 1.1, carbs: 23.1, fat: 0.2 },
  { id: 'f6', name: '玉米', category: 'staple', emoji: '🌽', calories: 86, unit: '100g/根', protein: 3.3, carbs: 19.0, fat: 1.2 },
  { id: 'f7', name: '全麦面包', category: 'staple', emoji: '🍞', calories: 246, unit: '100g/2片', protein: 9.0, carbs: 46.0, fat: 3.5 },
  { id: 'f8', name: '土豆', category: 'staple', emoji: '🥔', calories: 77, unit: '100g', protein: 2.0, carbs: 17.0, fat: 0.1 },
  { id: 'f9', name: '鸡胸肉', category: 'meat', emoji: '🍗', calories: 165, unit: '100g', protein: 31.0, carbs: 0, fat: 3.6 },
  { id: 'f10', name: '瘦牛肉', category: 'meat', emoji: '🥩', calories: 106, unit: '100g', protein: 20.2, carbs: 1.2, fat: 2.3 },
  { id: 'f11', name: '瘦猪肉', category: 'meat', emoji: '🥓', calories: 143, unit: '100g', protein: 20.3, carbs: 1.5, fat: 6.2 },
  { id: 'f12', name: '三文鱼', category: 'meat', emoji: '🐟', calories: 208, unit: '100g', protein: 20.4, carbs: 0, fat: 13.4 },
  { id: 'f13', name: '虾仁', category: 'meat', emoji: '🦐', calories: 48, unit: '100g', protein: 10.4, carbs: 0.6, fat: 0.7 },
  { id: 'f14', name: '鸡腿', category: 'meat', emoji: '🍗', calories: 181, unit: '100g', protein: 20.2, carbs: 0, fat: 10.5 },
  { id: 'f15', name: '鸡蛋', category: 'meat', emoji: '🥚', calories: 144, unit: '1个/50g', protein: 6.7, carbs: 0.7, fat: 10.0 },
  { id: 'f16', name: '豆腐', category: 'meat', emoji: '🫘', calories: 81, unit: '100g', protein: 8.1, carbs: 1.9, fat: 4.8 },
  { id: 'f17', name: '西兰花', category: 'vegetable', emoji: '🥦', calories: 34, unit: '100g', protein: 4.1, carbs: 4.3, fat: 0.6 },
  { id: 'f18', name: '菠菜', category: 'vegetable', emoji: '🥬', calories: 24, unit: '100g', protein: 2.6, carbs: 4.5, fat: 0.3 },
  { id: 'f19', name: '番茄', category: 'vegetable', emoji: '🍅', calories: 19, unit: '100g/个', protein: 0.9, carbs: 4.0, fat: 0.2 },
  { id: 'f20', name: '黄瓜', category: 'vegetable', emoji: '🥒', calories: 15, unit: '100g/根', protein: 0.8, carbs: 2.9, fat: 0.2 },
  { id: 'f21', name: '胡萝卜', category: 'vegetable', emoji: '🥕', calories: 39, unit: '100g', protein: 1.0, carbs: 8.8, fat: 0.2 },
  { id: 'f22', name: '生菜', category: 'vegetable', emoji: '🥗', calories: 15, unit: '100g', protein: 1.4, carbs: 2.9, fat: 0.2 },
  { id: 'f23', name: '蘑菇', category: 'vegetable', emoji: '🍄', calories: 22, unit: '100g', protein: 3.1, carbs: 3.3, fat: 0.3 },
  { id: 'f24', name: '洋葱', category: 'vegetable', emoji: '🧅', calories: 40, unit: '100g', protein: 1.1, carbs: 9.3, fat: 0.2 },
  { id: 'f25', name: '苹果', category: 'fruit', emoji: '🍎', calories: 52, unit: '100g/个', protein: 0.3, carbs: 14.0, fat: 0.2 },
  { id: 'f26', name: '香蕉', category: 'fruit', emoji: '🍌', calories: 89, unit: '100g/根', protein: 1.1, carbs: 23.0, fat: 0.3 },
  { id: 'f27', name: '橙子', category: 'fruit', emoji: '🍊', calories: 47, unit: '100g/个', protein: 0.9, carbs: 12.0, fat: 0.1 },
  { id: 'f28', name: '蓝莓', category: 'fruit', emoji: '🫐', calories: 57, unit: '100g', protein: 0.7, carbs: 14.0, fat: 0.3 },
  { id: 'f29', name: '草莓', category: 'fruit', emoji: '🍓', calories: 32, unit: '100g', protein: 0.7, carbs: 8.0, fat: 0.3 },
  { id: 'f30', name: '牛油果', category: 'fruit', emoji: '🥑', calories: 160, unit: '100g', protein: 2.0, carbs: 9.0, fat: 15.0 },
  { id: 'f31', name: '牛奶', category: 'drink', emoji: '🥛', calories: 54, unit: '100ml', protein: 3.0, carbs: 3.4, fat: 3.2 },
  { id: 'f32', name: '酸奶', category: 'drink', emoji: '🥛', calories: 72, unit: '100ml', protein: 2.5, carbs: 9.3, fat: 2.7 },
  { id: 'f33', name: '豆浆', category: 'drink', emoji: '🥛', calories: 31, unit: '100ml', protein: 1.8, carbs: 1.1, fat: 1.6 },
  { id: 'f34', name: '可乐', category: 'drink', emoji: '🥤', calories: 43, unit: '100ml', protein: 0, carbs: 10.6, fat: 0 },
  { id: 'f35', name: '橙汁', category: 'drink', emoji: '🧃', calories: 45, unit: '100ml', protein: 0.7, carbs: 10.4, fat: 0.2 },
  { id: 'f36', name: '美式咖啡', category: 'drink', emoji: '☕', calories: 5, unit: '350ml/杯', protein: 0.3, carbs: 0, fat: 0.2 },
  { id: 'f37', name: '拿铁', category: 'drink', emoji: '☕', calories: 75, unit: '350ml/杯', protein: 4.0, carbs: 6.0, fat: 4.0 },
  { id: 'f38', name: '汉堡', category: 'fastfood', emoji: '🍔', calories: 295, unit: '100g/个', protein: 12.0, carbs: 30.0, fat: 14.0 },
  { id: 'f39', name: '薯条', category: 'fastfood', emoji: '🍟', calories: 312, unit: '100g/中份', protein: 3.4, carbs: 41.0, fat: 15.0 },
  { id: 'f40', name: '披萨', category: 'fastfood', emoji: '🍕', calories: 266, unit: '100g/片', protein: 11.0, carbs: 33.0, fat: 10.0 },
  { id: 'f41', name: '炸鸡', category: 'fastfood', emoji: '🍗', calories: 246, unit: '100g', protein: 20.0, carbs: 10.0, fat: 14.0 },
  { id: 'f42', name: '热狗', category: 'fastfood', emoji: '🌭', calories: 290, unit: '100g/个', protein: 10.0, carbs: 18.0, fat: 18.0 },
  { id: 'f43', name: '方便面', category: 'fastfood', emoji: '🍜', calories: 436, unit: '100g/包', protein: 9.0, carbs: 60.0, fat: 17.0 },
  { id: 'f44', name: '巧克力', category: 'snack', emoji: '🍫', calories: 546, unit: '100g', protein: 7.0, carbs: 58.0, fat: 31.0 },
  { id: 'f45', name: '薯片', category: 'snack', emoji: '🥔', calories: 536, unit: '100g/包', protein: 7.0, carbs: 53.0, fat: 33.0 },
  { id: 'f46', name: '饼干', category: 'snack', emoji: '🍪', calories: 433, unit: '100g', protein: 9.0, carbs: 70.0, fat: 13.0 },
  { id: 'f47', name: '蛋糕', category: 'snack', emoji: '🍰', calories: 347, unit: '100g/块', protein: 5.0, carbs: 52.0, fat: 12.0 },
  { id: 'f48', name: '冰淇淋', category: 'snack', emoji: '🍦', calories: 127, unit: '100g', protein: 2.5, carbs: 17.0, fat: 5.5 },
  { id: 'f49', name: '花生', category: 'snack', emoji: '🥜', calories: 567, unit: '100g', protein: 26.0, carbs: 16.0, fat: 49.0 },
  { id: 'f50', name: '杏仁', category: 'snack', emoji: '🌰', calories: 579, unit: '100g', protein: 21.0, carbs: 22.0, fat: 50.0 },
];