import { useState } from 'react';
import { ArrowLeft, Clock, Flame, Utensils, CheckCircle, Leaf } from 'lucide-react';
import { meals } from '../data/meals';
import { categoryMap } from '../data/meals';

interface MealDetailProps {
  mealId: string;
  onNavigate: (page: string) => void;
}

const categoryColors = {
  breakfast: 'bg-orange-100 text-orange-600',
  lunch: 'bg-blue-100 text-blue-600',
  dinner: 'bg-purple-100 text-purple-600',
  snack: 'bg-green-100 text-green-600',
};

export function MealDetail({ mealId, onNavigate }: MealDetailProps) {
  const [showToast, setShowToast] = useState(false);
  const meal = meals.find(m => m.id === mealId);

  const handleRecordMeal = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  if (!meal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">食谱不存在</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <button
            onClick={() => onNavigate('meals')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <span className="ml-2 font-bold text-gray-800">食谱详情</span>
        </div>
      </div>

      <div className="pt-14">
        <div className="relative h-64">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${categoryColors[meal.category]}`}>
            {categoryMap[meal.category]}
          </div>
        </div>

        <div className="px-4 -mt-6 bg-white rounded-t-3xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{meal.name}</h1>
          <p className="text-gray-500 mb-4">{meal.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">热量</p>
              <p className="text-sm font-semibold text-gray-800">{meal.calories}卡</p>
            </div>
            <div className="bg-primary-50 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-primary-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">时间</p>
              <p className="text-sm font-semibold text-gray-800">{meal.prepTime}</p>
            </div>
            <div className="bg-healthy-50 rounded-xl p-3 text-center">
              <Utensils className="w-5 h-5 text-healthy-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">份量</p>
              <p className="text-sm font-semibold text-gray-800">{meal.servings}人份</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-healthy-500" />
              <h3 className="font-bold text-gray-800">营养成分</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">蛋白质</p>
                <p className="text-lg font-bold text-blue-600">{meal.protein}g</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">碳水化合物</p>
                <p className="text-lg font-bold text-healthy-600">{meal.carbs}g</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">脂肪</p>
                <p className="text-lg font-bold text-orange-600">{meal.fat}g</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">膳食纤维</p>
                <p className="text-lg font-bold text-purple-600">{meal.fiber}g</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">食材清单</h3>
            <div className="grid grid-cols-2 gap-2">
              {meal.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-primary-500" />
                  </div>
                  <span className="text-sm text-gray-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">制作步骤</h3>
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-gray-700 leading-relaxed">{meal.instructions}</p>
            </div>
          </div>

          <button 
            onClick={handleRecordMeal}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl py-3.5 font-bold shadow-soft hover:shadow-hover transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            记录饮食
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-healthy-400" />
          <span>已添加到今日饮食</span>
        </div>
      )}
    </div>
  );
}