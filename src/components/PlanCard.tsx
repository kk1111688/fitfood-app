import { Clock, Flame, Target } from 'lucide-react';
import { WorkoutPlan } from '../types';

interface PlanCardProps {
  plan: WorkoutPlan;
  onClick: () => void;
}

const levelColors = {
  beginner: 'bg-green-100 text-green-600',
  intermediate: 'bg-yellow-100 text-yellow-600',
  advanced: 'bg-red-100 text-red-600',
};

const levelLabels = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

export function PlanCard({ plan, onClick }: PlanCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all card-hover cursor-pointer"
    >
      <div className="relative h-32">
        <img
          src={plan.imageUrl}
          alt={plan.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${levelColors[plan.level]}`}>
          {levelLabels[plan.level]}
        </div>
        <div className="absolute bottom-3 left-3">
          <h3 className="text-white font-bold text-lg">{plan.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{plan.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{plan.duration}分钟</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Target className="w-3.5 h-3.5" />
            <span>{plan.exercises.length}个动作</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-orange-500">
            <Flame className="w-3.5 h-3.5" />
            <span>{plan.calories}卡</span>
          </div>
        </div>
      </div>
    </div>
  );
}