import { Clock, Flame, Dumbbell } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-600',
  intermediate: 'bg-yellow-100 text-yellow-600',
  advanced: 'bg-red-100 text-red-600',
};

const difficultyLabels = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all card-hover cursor-pointer"
    >
      <div className="relative h-36">
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColors[exercise.difficulty]}`}>
          {difficultyLabels[exercise.difficulty]}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">{exercise.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{exercise.description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>{exercise.equipment}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{exercise.sets}组 x {exercise.reps}次</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-orange-400">{exercise.calories}卡</span>
          </div>
        </div>
      </div>
    </div>
  );
}