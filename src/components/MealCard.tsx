import { Clock, Flame, Utensils } from 'lucide-react';
import { Meal } from '../types';
import { categoryMap } from '../data/meals';

interface MealCardProps {
  meal: Meal;
  onClick: () => void;
}

const categoryColors = {
  breakfast: 'bg-orange-100 text-orange-600',
  lunch: 'bg-blue-100 text-blue-600',
  dinner: 'bg-purple-100 text-purple-600',
  snack: 'bg-green-100 text-green-600',
};

export function MealCard({ meal, onClick }: MealCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all card-hover cursor-pointer"
    >
      <div className="relative h-36">
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[meal.category]}`}>
          {categoryMap[meal.category]}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">{meal.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{meal.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-orange-500">
            <Flame className="w-3.5 h-3.5" />
            <span>{meal.calories}卡</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{meal.prepTime}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Utensils className="w-3.5 h-3.5" />
            <span>{meal.servings}人份</span>
          </div>
        </div>
      </div>
    </div>
  );
}