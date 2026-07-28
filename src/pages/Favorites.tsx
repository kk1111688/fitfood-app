import { ArrowLeft, Heart, Trash2, ChevronRight, Dumbbell, Utensils } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { exercises } from '../data/exercises';
import { meals } from '../data/meals';

interface FavoritesProps {
  onNavigate: (page: string) => void;
}

export function Favorites({ onNavigate }: FavoritesProps) {
  const { favoriteExercises, favoriteMeals, toggleFavoriteExercise, toggleFavoriteMeal } = useAppStore();
  const [activeTab, setActiveTab] = useState<'exercises' | 'meals'>('exercises');

  const favoriteExerciseList = exercises.filter(e => favoriteExercises.includes(e.id));
  const favoriteMealList = meals.filter(m => favoriteMeals.includes(m.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-20">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 pt-16 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onNavigate('profile')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">我的收藏</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('exercises')}
              className={`flex-1 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                activeTab === 'exercises'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              动作 ({favoriteExerciseList.length})
            </button>
            <button
              onClick={() => setActiveTab('meals')}
              className={`flex-1 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                activeTab === 'meals'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Utensils className="w-4 h-4" />
              食谱 ({favoriteMealList.length})
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {activeTab === 'exercises' ? (
          favoriteExerciseList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">还没有收藏动作</h3>
              <p className="text-gray-500 text-center mb-6">在动作详情页点击❤️收藏喜欢的动作</p>
              <button
                onClick={() => onNavigate('exercises')}
                className="bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-xl px-6 py-3 font-medium"
              >
                浏览动作库
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {favoriteExerciseList.map(exercise => (
                <div key={exercise.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div className="relative">
                    <img
                      src={exercise.imageUrl}
                      alt={exercise.name}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavoriteExercise(exercise.id); }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-800 text-sm">{exercise.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{exercise.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-primary-500">{exercise.sets}组 x {exercise.reps}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          favoriteMealList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">还没有收藏食谱</h3>
              <p className="text-gray-500 text-center mb-6">在食谱详情页点击❤️收藏喜欢的食谱</p>
              <button
                onClick={() => onNavigate('meals')}
                className="bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-xl px-6 py-3 font-medium"
              >
                浏览食谱库
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {favoriteMealList.map(meal => (
                <div key={meal.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div className="relative">
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavoriteMeal(meal.id); }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-800 text-sm">{meal.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{meal.calories}卡</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-primary-500">{meal.prepTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}