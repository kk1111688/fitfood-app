import { meals } from './meals';

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  emoji: string;
  aliases: string[];
}

export const ingredientCategories = [
  { id: 'protein', name: '蛋白质', icon: '🥩' },
  { id: 'vegetable', name: '蔬菜', icon: '🥬' },
  { id: 'fruit', name: '水果', icon: '🍎' },
  { id: 'grain', name: '主食', icon: '🍚' },
  { id: 'dairy', name: '乳制品', icon: '🥛' },
  { id: 'egg', name: '蛋类', icon: '🥚' },
  { id: 'bean', name: '豆制品', icon: '🫘' },
  { id: 'fat', name: '油脂', icon: '🧈' },
  { id: 'seasoning', name: '调料', icon: '🧂' },
];

export const ingredients: Ingredient[] = [
  { id: 'chicken_breast', name: '鸡胸肉', category: 'protein', emoji: '🍗', aliases: ['鸡胸', '鸡胸肉', '鸡胸脯'] },
  { id: 'chicken', name: '鸡肉', category: 'protein', emoji: '🍗', aliases: ['鸡肉', '鸡腿', '整鸡'] },
  { id: 'beef', name: '牛肉', category: 'protein', emoji: '🥩', aliases: ['牛肉', '牛排', '牛里脊'] },
  { id: 'pork', name: '猪肉', category: 'protein', emoji: '🥓', aliases: ['猪肉', '五花肉', '瘦肉'] },
  { id: 'salmon', name: '三文鱼', category: 'protein', emoji: '🐟', aliases: ['三文鱼', '鲑鱼'] },
  { id: 'shrimp', name: '虾', category: 'protein', emoji: '🦐', aliases: ['虾', '虾仁', '大虾'] },
  { id: 'tuna', name: '金枪鱼', category: 'protein', emoji: '🐟', aliases: ['金枪鱼', '吞拿鱼'] },
  { id: 'egg', name: '鸡蛋', category: 'egg', emoji: '🥚', aliases: ['鸡蛋', '蛋'] },
  { id: 'egg_white', name: '蛋白', category: 'egg', emoji: '🥚', aliases: ['蛋白', '蛋清'] },
  { id: 'tofu', name: '豆腐', category: 'bean', emoji: '🫘', aliases: ['豆腐', '嫩豆腐', '老豆腐'] },
  { id: 'edamame', name: '毛豆', category: 'bean', emoji: '🫛', aliases: ['毛豆', '毛豆荚'] },
  { id: 'spinach', name: '菠菜', category: 'vegetable', emoji: '🥬', aliases: ['菠菜'] },
  { id: 'broccoli', name: '西兰花', category: 'vegetable', emoji: '🥦', aliases: ['西兰花', '花椰菜'] },
  { id: 'tomato', name: '番茄', category: 'vegetable', emoji: '🍅', aliases: ['番茄', '西红柿'] },
  { id: 'cucumber', name: '黄瓜', category: 'vegetable', emoji: '🥒', aliases: ['黄瓜'] },
  { id: 'carrot', name: '胡萝卜', category: 'vegetable', emoji: '🥕', aliases: ['胡萝卜', '红萝卜'] },
  { id: 'lettuce', name: '生菜', category: 'vegetable', emoji: '🥗', aliases: ['生菜', '卷生菜'] },
  { id: 'cabbage', name: '白菜', category: 'vegetable', emoji: '🥬', aliases: ['白菜', '大白菜', '卷心菜'] },
  { id: 'mushroom', name: '蘑菇', category: 'vegetable', emoji: '🍄', aliases: ['蘑菇', '香菇', '金针菇'] },
  { id: 'onion', name: '洋葱', category: 'vegetable', emoji: '🧅', aliases: ['洋葱', '葱头'] },
  { id: 'garlic', name: '大蒜', category: 'seasoning', emoji: '🧄', aliases: ['大蒜', '蒜', '蒜末'] },
  { id: 'ginger', name: '生姜', category: 'seasoning', emoji: '🫚', aliases: ['生姜', '姜'] },
  { id: 'pepper', name: '辣椒', category: 'vegetable', emoji: '🌶️', aliases: ['辣椒', '青椒', '红椒'] },
  { id: 'zucchini', name: '西葫芦', category: 'vegetable', emoji: '🥒', aliases: ['西葫芦', '南瓜'] },
  { id: 'eggplant', name: '茄子', category: 'vegetable', emoji: '🍆', aliases: ['茄子'] },
  { id: 'asparagus', name: '芦笋', category: 'vegetable', emoji: '🥗', aliases: ['芦笋'] },
  { id: 'apple', name: '苹果', category: 'fruit', emoji: '🍎', aliases: ['苹果'] },
  { id: 'banana', name: '香蕉', category: 'fruit', emoji: '🍌', aliases: ['香蕉'] },
  { id: 'blueberry', name: '蓝莓', category: 'fruit', emoji: '🫐', aliases: ['蓝莓'] },
  { id: 'orange', name: '橙子', category: 'fruit', emoji: '🍊', aliases: ['橙子', '橘子'] },
  { id: 'lemon', name: '柠檬', category: 'fruit', emoji: '🍋', aliases: ['柠檬'] },
  { id: 'strawberry', name: '草莓', category: 'fruit', emoji: '🍓', aliases: ['草莓'] },
  { id: 'rice', name: '大米', category: 'grain', emoji: '🍚', aliases: ['大米', '米饭', '白饭'] },
  { id: 'brown_rice', name: '糙米', category: 'grain', emoji: '🍚', aliases: ['糙米', '杂粮饭'] },
  { id: 'oatmeal', name: '燕麦', category: 'grain', emoji: '🥣', aliases: ['燕麦', '燕麦片'] },
  { id: 'bread', name: '面包', category: 'grain', emoji: '🍞', aliases: ['面包', '全麦面包'] },
  { id: 'noodle', name: '面条', category: 'grain', emoji: '🍜', aliases: ['面条', '意大利面', '拉面'] },
  { id: 'potato', name: '土豆', category: 'grain', emoji: '🥔', aliases: ['土豆', '马铃薯'] },
  { id: 'sweet_potato', name: '红薯', category: 'grain', emoji: '🍠', aliases: ['红薯', '紫薯'] },
  { id: 'corn', name: '玉米', category: 'grain', emoji: '🌽', aliases: ['玉米', '玉米粒'] },
  { id: 'milk', name: '牛奶', category: 'dairy', emoji: '🥛', aliases: ['牛奶', '鲜奶'] },
  { id: 'yogurt', name: '酸奶', category: 'dairy', emoji: '🥛', aliases: ['酸奶'] },
  { id: 'cheese', name: '奶酪', category: 'dairy', emoji: '🧀', aliases: ['奶酪', '芝士'] },
  { id: 'butter', name: '黄油', category: 'fat', emoji: '🧈', aliases: ['黄油'] },
  { id: 'olive_oil', name: '橄榄油', category: 'fat', emoji: '🫒', aliases: ['橄榄油', '食用油', '植物油'] },
  { id: 'honey', name: '蜂蜜', category: 'seasoning', emoji: '🍯', aliases: ['蜂蜜'] },
  { id: 'soy_sauce', name: '酱油', category: 'seasoning', emoji: '🍶', aliases: ['酱油', '生抽', '老抽'] },
  { id: 'salt', name: '盐', category: 'seasoning', emoji: '🧂', aliases: ['盐', '食盐'] },
  { id: 'pepper_powder', name: '黑胡椒', category: 'seasoning', emoji: '🧂', aliases: ['黑胡椒', '胡椒'] },
  { id: 'vinegar', name: '醋', category: 'seasoning', emoji: '🍶', aliases: ['醋', '白醋'] },
  { id: 'sesame', name: '芝麻', category: 'seasoning', emoji: '🌰', aliases: ['芝麻', '黑芝麻'] },
  { id: 'almond', name: '杏仁', category: 'fruit', emoji: '🌰', aliases: ['杏仁', '坚果'] },
  { id: 'avocado', name: '牛油果', category: 'fruit', emoji: '🥑', aliases: ['牛油果', '鳄梨'] },
  { id: 'chia_seed', name: '奇亚籽', category: 'grain', emoji: '🌰', aliases: ['奇亚籽'] },
  { id: 'peanut', name: '花生', category: 'bean', emoji: '🥜', aliases: ['花生'] },
  { id: 'tofu_skin', name: '豆皮', category: 'bean', emoji: '🫘', aliases: ['豆皮', '腐竹'] },
];

// 智能匹配：从食谱的实际食材文本中匹配用户选择的食材
export function matchMealsByIngredients(availableIngredientIds: string[]) {
  const results: { mealId: string; score: number; matched: string[]; missing: string[] }[] = [];
  
  // 获取用户选择的食材对象
  const selectedIngredients = ingredients.filter(i => availableIngredientIds.includes(i.id));
  
  for (const meal of meals) {
    const matched: string[] = [];
    const missing: string[] = [];
    let totalIngredients = meal.ingredients.length;
    
    for (const ingredientStr of meal.ingredients) {
      // 提取食材名称（去掉数量部分，如"燕麦片 50g" -> "燕麦片"）
      const ingredientName = ingredientStr.replace(/\s*\d+.*$/, '').trim();
      
      // 检查是否匹配用户选择的食材
      const matchedIngredient = selectedIngredients.find(ing => 
        ingredientName.includes(ing.name) || 
        ing.aliases.some(alias => ingredientName.includes(alias))
      );
      
      if (matchedIngredient) {
        if (!matched.includes(matchedIngredient.id)) {
          matched.push(matchedIngredient.id);
        }
      } else {
        missing.push(ingredientStr);
      }
    }
    
    const score = matched.length / Math.max(totalIngredients, 1);
    
    if (score > 0) {
      results.push({ 
        mealId: meal.id, 
        score, 
        matched, 
        missing: missing.slice(0, 3) // 最多显示3个缺失食材
      });
    }
  }
  
  return results.sort((a, b) => b.score - a.score);
}

export function getIngredientByNameOrAlias(name: string): Ingredient | undefined {
  const lowerName = name.toLowerCase();
  return ingredients.find(i => 
    i.name === name || 
    i.aliases.some(alias => alias.toLowerCase() === lowerName)
  );
}