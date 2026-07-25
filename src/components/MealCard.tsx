import React from 'react';
import { Flame, Beef, Wheat, Droplet } from 'lucide-react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
  onClick: () => void;
  isCompleted?: boolean;
}

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

export const MealCard: React.FC<MealCardProps> = ({ meal, onClick, isCompleted }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[meal.type]}`}>
            {meal.type}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${mealTimeColors[meal.mealTime]}`}>
            {meal.mealTime}
          </span>
        </div>
        {isCompleted && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{meal.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{meal.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Beef size={12} />
              {meal.protein}g
            </span>
            <span className="flex items-center gap-1">
              <Wheat size={12} />
              {meal.carbs}g
            </span>
            <span className="flex items-center gap-1">
              <Droplet size={12} />
              {meal.fat}g
            </span>
          </div>
          <span className="flex items-center gap-1 text-primary-500 font-medium">
            <Flame size={14} />
            {meal.calories}卡
          </span>
        </div>
      </div>
    </div>
  );
};
