import React from 'react';
import { useParams } from 'react-router-dom';
import { Flame, Beef, Wheat, Droplet, CheckCircle, Clock, UtensilsCrossed } from 'lucide-react';
import { Header } from '../components/Header';
import { useAppStore } from '../store/appStore';

export const MealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { meals, toggleMealComplete, completedMeals, addMealLog } = useAppStore();
  
  const meal = meals.find(m => m.id === id);
  const isCompleted = completedMeals.includes(id || '');

  if (!meal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">食谱不存在</p>
      </div>
    );
  }

  const handleComplete = () => {
    toggleMealComplete(meal.id);
    addMealLog({
      userId: '1',
      mealId: meal.id,
      date: new Date().toISOString(),
      quantity: 1,
      mealTime: meal.mealTime
    });
  };

  const typeColors = {
    减脂: 'bg-orange-100 text-orange-700',
    增肌: 'bg-blue-100 text-blue-700',
    均衡: 'bg-green-100 text-green-700',
  };

  const mealTimeColors = {
    早餐: 'bg-yellow-100 text-yellow-700',
    午餐: 'bg-blue-100 text-blue-700',
    晚餐: 'bg-purple-100 text-purple-700',
    加餐: 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="食谱详情" showBack />
      
      <div className="relative h-64">
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-white text-2xl font-bold mb-2">{meal.name}</h1>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[meal.type]}`}>
              {meal.type}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${mealTimeColors[meal.mealTime]}`}>
              {meal.mealTime}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-3">营养成分</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                <Flame size={14} />
              </div>
              <span className="text-lg font-bold text-gray-800">{meal.calories}</span>
              <span className="text-xs text-gray-500">卡</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                <Beef size={14} />
              </div>
              <span className="text-lg font-bold text-gray-800">{meal.protein}</span>
              <span className="text-xs text-gray-500">g</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                <Wheat size={14} />
              </div>
              <span className="text-lg font-bold text-gray-800">{meal.carbs}</span>
              <span className="text-xs text-gray-500">g</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                <Droplet size={14} />
              </div>
              <span className="text-lg font-bold text-gray-800">{meal.fat}</span>
              <span className="text-xs text-gray-500">g</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500">蛋白质占比</span>
              <span className="text-gray-700">{Math.round((meal.protein * 4 / meal.calories) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-400 rounded-full"
                style={{ width: `${(meal.protein * 4 / meal.calories) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm mb-2 mt-2">
              <span className="text-gray-500">碳水化合物占比</span>
              <span className="text-gray-700">{Math.round((meal.carbs * 4 / meal.calories) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full"
                style={{ width: `${(meal.carbs * 4 / meal.calories) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm mb-2 mt-2">
              <span className="text-gray-500">脂肪占比</span>
              <span className="text-gray-700">{Math.round((meal.fat * 9 / meal.calories) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full"
                style={{ width: `${(meal.fat * 9 / meal.calories) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-3">食材清单</h3>
          <ul className="space-y-2">
            {meal.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-healthy-100 flex items-center justify-center">
                  <CheckCircle className="text-healthy-500" size={14} />
                </div>
                <span className="text-gray-600 text-sm">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-3">制作步骤</h3>
          <ol className="space-y-4">
            {meal.instructions.map((step, index) => (
              <li key={index} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">描述</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{meal.description}</p>
        </div>
      </div>

      <div className="fixed bottom-20 left-4 right-4">
        <button
          onClick={handleComplete}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
            isCompleted
              ? 'bg-green-500 text-white'
              : 'gradient-healthy text-white shadow-lg hover:shadow-xl'
          }`}
        >
          <CheckCircle size={20} />
          {isCompleted ? '已完成' : '标记为已吃'}
        </button>
      </div>
    </div>
  );
};
