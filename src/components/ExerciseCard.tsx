import React from 'react';
import { Clock, Flame } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
  isCompleted?: boolean;
}

const difficultyColors = {
  初级: 'bg-green-100 text-green-700',
  中级: 'bg-yellow-100 text-yellow-700',
  高级: 'bg-red-100 text-red-700',
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onClick, isCompleted }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[exercise.difficulty]}`}>
            {exercise.difficulty}
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
        <h3 className="font-bold text-lg text-gray-800 mb-2">{exercise.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{exercise.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            {exercise.targetMuscle}
          </span>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {exercise.sets}组
            </span>
            <span className="flex items-center gap-1">
              <Flame size={12} />
              {exercise.calories}卡
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
