import { useState } from 'react';
import { Search, Filter, Sparkles, ChefHat, Calculator, Flame } from 'lucide-react';
import { MealCard } from '../components/MealCard';
import { meals, mealCategories } from '../data/meals';

interface MealsProps {
  onNavigate: (page: string) => void;
}

export function Meals({ onNavigate }: MealsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryKey = mealCategories.indexOf(selectedCategory);
    const categoryMap: Record<string, string> = {
      '全部': '全部',
      '早餐': 'breakfast',
      '午餐': 'lunch',
      '晚餐': 'dinner',
      '加餐': 'snack'
    };
    const matchesCategory = categoryMap[selectedCategory] === '全部' || meal.category === categoryMap[selectedCategory];
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-28">
      <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="px-4 pt-14 pb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-4">食谱库</h1>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => onNavigate('ingredient-recipe')}
              className="bg-gradient-to-br from-primary-500 to-emerald-500 rounded-2xl p-3 text-white flex items-center gap-2 shadow-lg shadow-primary-500/20 hover:shadow-xl transition-all active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-bold text-sm flex items-center gap-1">
                  <ChefHat className="w-3 h-3" />
                  智能推荐
                </div>
                <p className="text-xs opacity-90 truncate">按食材推荐菜谱</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('calorie-tester')}
              className="bg-gradient-to-br from-orange-500 to-red-400 rounded-2xl p-3 text-white flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-xl transition-all active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-bold text-sm flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  卡路里测试
                </div>
                <p className="text-xs opacity-90 truncate">计算食物热量</p>
              </div>
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索食谱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100/80 rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {mealCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-md shadow-primary-500/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4 animate-stagger-1">
          <span className="text-sm text-gray-500">共 {filteredMeals.length} 个食谱</span>
          <button className="flex items-center gap-1 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            筛选
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 animate-stagger-2">
          {filteredMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onClick={() => onNavigate(`meal/${meal.id}`)} />
          ))}
        </div>
        {filteredMeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">没有找到相关食谱</p>
          </div>
        )}
      </div>
    </div>
  );
}