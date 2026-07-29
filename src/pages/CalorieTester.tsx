import { useState } from 'react';
import { ArrowLeft, Search, Plus, Minus, Trash2, Flame, Calculator, AlertCircle, CheckCircle } from 'lucide-react';
import { foodItems, foodCategories, FoodItem } from '../data/foods';
import { useAppStore } from '../store/appStore';

interface CalorieTesterProps {
  onNavigate: (page: string) => void;
}

interface SelectedFood {
  food: FoodItem;
  servings: number;
}

export function CalorieTester({ onNavigate }: CalorieTesterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
  const [showResult, setShowResult] = useState(false);
  const { addCaloriesConsumed } = useAppStore();

  const filteredFoods = foodItems.filter(food => {
    const matchesSearch = food.name.includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || food.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFood = (food: FoodItem) => {
    const existing = selectedFoods.find(f => f.food.id === food.id);
    if (existing) {
      setSelectedFoods(selectedFoods.filter(f => f.food.id !== food.id));
    } else {
      setSelectedFoods([...selectedFoods, { food, servings: 1 }]);
    }
  };

  const updateServings = (foodId: string, delta: number) => {
    setSelectedFoods(selectedFoods.map(f => 
      f.food.id === foodId 
        ? { ...f, servings: Math.max(0.5, Math.min(10, f.servings + delta)) }
        : f
    ));
  };

  const removeFood = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(f => f.food.id !== foodId));
  };

  const totalCalories = selectedFoods.reduce((sum, f) => sum + f.food.calories * f.servings, 0);
  const totalProtein = selectedFoods.reduce((sum, f) => sum + f.food.protein * f.servings, 0);
  const totalCarbs = selectedFoods.reduce((sum, f) => sum + f.food.carbs * f.servings, 0);
  const totalFat = selectedFoods.reduce((sum, f) => sum + f.food.fat * f.servings, 0);

  const getCalorieLevel = (calories: number) => {
    if (calories < 200) return { level: '低热量', color: 'text-healthy-600', bg: 'bg-healthy-50', icon: '🟢' };
    if (calories < 500) return { level: '中等热量', color: 'text-orange-600', bg: 'bg-orange-50', icon: '🟡' };
    if (calories < 800) return { level: '较高热量', color: 'text-red-500', bg: 'bg-red-50', icon: '🟠' };
    return { level: '高热量', color: 'text-red-600', bg: 'bg-red-100', icon: '🔴' };
  };

  const calorieLevel = getCalorieLevel(totalCalories);

  const handleSaveToToday = () => {
    addCaloriesConsumed(Math.round(totalCalories));
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      onNavigate('home');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => onNavigate('meals')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-bold text-gray-800">卡路里测试器</h1>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 mb-3">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索食物，如：米饭、鸡胸肉..."
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')}>
                <Minus className="w-4 h-4 text-gray-400 rotate-45" />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {foodCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activeCategory === cat.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        {selectedFoods.length > 0 && (
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-primary-500" />
                已选食物 ({selectedFoods.length})
              </h3>
              <button
                onClick={() => setSelectedFoods([])}
                className="text-xs text-red-400 hover:text-red-500"
              >
                清空
              </button>
            </div>

            <div className="space-y-2 mb-3">
              {selectedFoods.map(({ food, servings }) => (
                <div key={food.id} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                  <span className="text-xl">{food.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800">{food.name}</div>
                    <div className="text-xs text-gray-500">
                      {food.calories}卡/{food.unit} × {servings}份 = {Math.round(food.calories * servings)}卡
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateServings(food.id, -0.5)}
                      className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center">{servings}</span>
                    <button
                      onClick={() => updateServings(food.id, 0.5)}
                      className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-sm"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFood(food.id)}
                      className="w-7 h-7 bg-red-50 text-red-400 rounded-full flex items-center justify-center ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={`rounded-xl p-4 ${calorieLevel.bg}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">总热量</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${calorieLevel.color} bg-white/80`}>
                  {calorieLevel.icon} {calorieLevel.level}
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className={`text-3xl font-bold ${calorieLevel.color}`}>{Math.round(totalCalories)}</span>
                <span className="text-sm text-gray-500">卡路里</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-white/80 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">蛋白质</p>
                  <p className="text-sm font-bold text-blue-600">{totalProtein.toFixed(1)}g</p>
                </div>
                <div className="bg-white/80 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">碳水</p>
                  <p className="text-sm font-bold text-healthy-600">{totalCarbs.toFixed(1)}g</p>
                </div>
                <div className="bg-white/80 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">脂肪</p>
                  <p className="text-sm font-bold text-orange-600">{totalFat.toFixed(1)}g</p>
                </div>
              </div>

              <button
                onClick={handleSaveToToday}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-xl py-2.5 font-bold text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                记录到今日饮食
              </button>
            </div>
          </div>
        )}

        <p className="text-sm font-medium text-gray-600 mb-3">
          {selectedFoods.length === 0 ? '选择食物开始计算' : '继续添加食物'}：
        </p>

        <div className="grid grid-cols-2 gap-2">
          {filteredFoods.map(food => {
            const isSelected = selectedFoods.some(f => f.food.id === food.id);
            return (
              <button
                key={food.id}
                onClick={() => toggleFood(food)}
                className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-primary-100 border-2 border-primary-500'
                    : 'bg-white border-2 border-transparent hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">{food.emoji}</span>
                <div className="flex-1 text-left min-w-0">
                  <div className={`text-sm font-medium truncate ${isSelected ? 'text-primary-600' : 'text-gray-800'}`}>
                    {food.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {food.calories}卡 · {food.unit}
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-8">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">没有找到这个食物</p>
          </div>
        )}
      </div>

      {showResult && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-healthy-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-healthy-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">记录成功！</h3>
            <p className="text-sm text-gray-500">
              已添加 {Math.round(totalCalories)} 卡到今日饮食
            </p>
          </div>
        </div>
      )}
    </div>
  );
}