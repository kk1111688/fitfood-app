import { useState } from 'react';
import { ArrowLeft, Clock, Flame, Target, Play, CheckCircle } from 'lucide-react';
import { workoutPlans } from '../data/plans';
import { exercises } from '../data/exercises';
import { WorkoutSession } from './WorkoutSession';
import { Exercise } from '../types';

interface PlanDetailProps {
  planId: string;
  onNavigate: (page: string) => void;
}

const levelLabels = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

const levelColors = {
  beginner: 'bg-green-100 text-green-600',
  intermediate: 'bg-yellow-100 text-yellow-600',
  advanced: 'bg-red-100 text-red-600',
};

export function PlanDetail({ planId, onNavigate }: PlanDetailProps) {
  const [isWorkingOut, setIsWorkingOut] = useState(false);
  const plan = workoutPlans.find(p => p.id === planId);
  const planExercises = (plan?.exercises.map(id => exercises.find(e => e.id === id)).filter(Boolean) || []) as Exercise[];

  if (!plan) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">计划不存在</p>
      </div>
    );
  }

  if (isWorkingOut) {
    return (
      <WorkoutSession
        exercises={planExercises}
        planName={plan.name}
        onComplete={() => {
          setIsWorkingOut(false);
          onNavigate('plans');
        }}
        onBack={() => setIsWorkingOut(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <button
            onClick={() => onNavigate('plans')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <span className="ml-2 font-bold text-gray-800">计划详情</span>
        </div>
      </div>

      <div className="pt-14">
        <div className="relative h-64">
          <img
            src={plan.imageUrl}
            alt={plan.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${levelColors[plan.level]}`}>
            {levelLabels[plan.level]}
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-2xl font-bold mb-1">{plan.name}</h1>
            <p className="text-white/80 text-sm">{plan.description}</p>
          </div>
        </div>

        <div className="px-4 -mt-6 bg-white rounded-t-3xl">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-primary-50 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-primary-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">时长</p>
              <p className="text-sm font-semibold text-gray-800">{plan.duration}分钟</p>
            </div>
            <div className="bg-healthy-50 rounded-xl p-3 text-center">
              <Target className="w-5 h-5 text-healthy-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">动作数</p>
              <p className="text-sm font-semibold text-gray-800">{plan.exercises.length}个</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">消耗</p>
              <p className="text-sm font-semibold text-gray-800">{plan.calories}卡</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">训练动作</h3>
            <div className="space-y-3">
              {planExercises.map((exercise, index) => (
                <div key={exercise?.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <img
                    src={exercise?.imageUrl}
                    alt={exercise?.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{exercise?.name}</p>
                    <p className="text-xs text-gray-500">{exercise?.sets}组 x {exercise?.reps}次</p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-primary-100 transition-colors">
                    <Play className="w-5 h-5 text-primary-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">训练小贴士</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-healthy-500 flex-shrink-0 mt-0.5" />
                <span>训练前做好热身运动，避免受伤</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-healthy-500 flex-shrink-0 mt-0.5" />
                <span>保持正确姿势，感受目标肌群发力</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-healthy-500 flex-shrink-0 mt-0.5" />
                <span>训练后及时补充蛋白质和水分</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={() => setIsWorkingOut(true)}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl py-3.5 font-bold shadow-soft hover:shadow-hover transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            开始训练
          </button>
        </div>
      </div>
    </div>
  );
}