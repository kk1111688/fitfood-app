import { useState } from 'react';
import { ArrowLeft, Search, ChefHat, Sparkles, Plus, X, Check, AlertCircle } from 'lucide-react';
import { ingredients, ingredientCategories, matchMealsByIngredients, Ingredient } from '../data/ingredients';
import { meals } from '../data/meals';

interface IngredientRecipeProps {
  onNavigate: (page: string) => void;
}

export function IngredientRecipe({ onNavigate }: IngredientRecipeProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showResults, setShowResults] = useState(false);

  const filteredIngredients = activeCategory === 'all' 
    ? ingredients 
    : ingredients.filter(i => i.category === activeCategory);
  
  const searchedIngredients = searchTerm 
    ? filteredIngredients.filter(i => 
        i.name.includes(searchTerm) || 
        i.aliases.some(a => a.includes(searchTerm))
      )
    : filteredIngredients;

  const toggleIngredient = (id: string) => {
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== id));
    } else {
      setSelectedIngredients([...selectedIngredients, id]);
    }
  };

  const getResults = () => {
    if (selectedIngredients.length === 0) return [];
    const matches = matchMealsByIngredients(selectedIngredients);
    return matches.map(m => ({
      ...m,
      meal: meals.find(meal => meal.id === m.mealId)
    })).filter(m => m.meal);
  };

  const results = getResults();
  const selectedIngredientObjects = ingredients.filter(i => selectedIngredients.includes(i.id));

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 pb-28">
        <div className="bg-white sticky top-0 z-40 shadow-sm">
          <div className="px-4 h-14 flex items-center gap-3">
            <button
              onClick={() => setShowResults(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="font-bold text-gray-800">为你推荐</h1>
            <span className="ml-auto text-sm text-gray-500">
              已选 {selectedIngredients.length} 种食材
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-2xl p-4 text-white mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">智能匹配结果</span>
            </div>
            <p className="text-sm opacity-90">
              根据你选择的 {selectedIngredients.length} 种食材，我们为你找到了 {results.length} 道菜谱
            </p>
          </div>

          {results.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">没有找到匹配的菜谱</p>
              <p className="text-sm text-gray-400">试试选择更多常见食材</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map(({ meal, score, matched, missing }) => {
                if (!meal) return null;
                const percentage = Math.round(score * 100);
                const isHighMatch = percentage >= 70;
                
                return (
                  <div 
                    key={meal.id}
                    onClick={() => onNavigate(`meal/${meal.id}`)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex">
                      <img
                        src={meal.imageUrl}
                        alt={meal.name}
                        className="w-28 h-28 object-cover"
                      />
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-gray-800">{meal.name}</h3>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            isHighMatch 
                              ? 'bg-healthy-100 text-healthy-600' 
                              : 'bg-orange-100 text-orange-600'
                          }`}>
                            匹配 {percentage}%
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{meal.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-500">🔥 {meal.calories}卡</span>
                          <span className="text-xs text-gray-500">🥩 {meal.protein}g蛋白</span>
                          <span className="text-xs text-gray-500">⏱ {meal.prepTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {matched.map((id, idx) => {
                            const ingredient = ingredients.find(i => i.id === id);
                            return ingredient ? (
                              <span key={idx} className="text-xs bg-healthy-50 text-healthy-600 px-2 py-0.5 rounded-full">
                                ✓ {ingredient.name}
                              </span>
                            ) : null;
                          })}
                          {missing.map((name, idx) => (
                            <span key={`m${idx}`} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                              +{name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {isHighMatch ? '🎉 食材基本齐全' : '需要购买一些食材'}
                      </span>
                      <span className="text-xs text-primary-500 font-medium">查看详情 →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={() => setShowResults(false)}
            className="w-full mt-4 py-3 bg-white rounded-2xl text-gray-600 font-medium shadow-sm"
          >
            重新选择食材
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="font-bold text-gray-800">智能推荐</h1>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索食材，如：鸡胸、番茄..."
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-br from-primary-500 to-primary-400 rounded-2xl p-4 text-white mb-4">
          <div className="flex items-center gap-2 mb-2">
            <ChefHat className="w-5 h-5" />
            <span className="font-bold">今天想吃什么？</span>
          </div>
          <p className="text-sm opacity-90 mb-3">选择你家里现有的食材，我们为你推荐可以做的菜谱</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-white/20 px-2 py-0.5 rounded-full">已选 {selectedIngredients.length} 种食材</span>
            {selectedIngredients.length > 0 && (
              <button 
                onClick={() => setSelectedIngredients([])}
                className="bg-white/20 px-2 py-0.5 rounded-full hover:bg-white/30"
              >
                清空
              </button>
            )}
          </div>
        </div>

        {selectedIngredientObjects.length > 0 && (
          <div className="bg-white rounded-2xl p-3 mb-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-2">已选食材：</p>
            <div className="flex flex-wrap gap-2">
              {selectedIngredientObjects.map(ing => (
                <span 
                  key={ing.id}
                  className="inline-flex items-center gap-1 bg-primary-50 text-primary-600 px-2 py-1 rounded-full text-sm"
                >
                  {ing.emoji} {ing.name}
                  <button onClick={() => toggleIngredient(ing.id)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-2">选择食材：</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
                activeCategory === 'all' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600'
              }`}
            >
              全部
            </button>
            {ingredientCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activeCategory === cat.id ? 'bg-primary-500 text-white' : 'bg-white text-gray-600'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {searchedIngredients.map(ing => (
            <button
              key={ing.id}
              onClick={() => toggleIngredient(ing.id)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                selectedIngredients.includes(ing.id)
                  ? 'bg-primary-100 border-2 border-primary-500'
                  : 'bg-white border-2 border-transparent hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl mb-1">{ing.emoji}</span>
              <span className={`text-xs ${selectedIngredients.includes(ing.id) ? 'text-primary-600 font-medium' : 'text-gray-600'}`}>
                {ing.name}
              </span>
              {selectedIngredients.includes(ing.id) && (
                <Check className="w-4 h-4 text-primary-500 absolute" />
              )}
            </button>
          ))}
        </div>

        {searchedIngredients.length === 0 && (
          <div className="text-center py-8">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">没有找到这个食材</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-white to-transparent pt-4">
        <button
          onClick={() => selectedIngredients.length > 0 && setShowResults(true)}
          disabled={selectedIngredients.length === 0}
          className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
            selectedIngredients.length > 0
              ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          {selectedIngredients.length > 0 
            ? `查看推荐菜谱 (${getResults().length}道)` 
            : '选择食材开始推荐'
          }
        </button>
      </div>
    </div>
  );
}