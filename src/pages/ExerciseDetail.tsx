import { useState } from 'react';
import { ArrowLeft, Clock, Flame, Dumbbell, Target, CheckCircle, Heart } from 'lucide-react';
import { exercises } from '../data/exercises';
import { WorkoutSession } from './WorkoutSession';
import { Exercise } from '../types';
import { useAppStore } from '../store/appStore';

interface ExerciseDetailProps {
  exerciseId: string;
  onNavigate: (page: string) => void;
}

const difficultyLabels = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-600',
  intermediate: 'bg-yellow-100 text-yellow-600',
  advanced: 'bg-red-100 text-red-600',
};

export function ExerciseDetail({ exerciseId, onNavigate }: ExerciseDetailProps) {
  const [isWorkingOut, setIsWorkingOut] = useState(false);
  const exercise = exercises.find(e => e.id === exerciseId);
  const { favoriteExercises, toggleFavoriteExercise } = useAppStore();
  const isFavorite = favoriteExercises.includes(exerciseId);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">动作不存在</p>
      </div>
    );
  }

  if (isWorkingOut) {
    const exerciseList: Exercise[] = [exercise];
    return (
      <WorkoutSession
        exercises={exerciseList}
        planName={exercise.name}
        planId={`single-${exercise.id}`}
        onComplete={() => {
          setIsWorkingOut(false);
          onNavigate('exercises');
        }}
        onBack={() => setIsWorkingOut(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => onNavigate('exercises')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <span className="font-bold text-gray-800">动作详情</span>
          <button
            onClick={() => toggleFavoriteExercise(exerciseId)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>

      <div className="pt-14">
        <div className="relative h-64">
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[exercise.difficulty]}`}>
            {difficultyLabels[exercise.difficulty]}
          </div>
        </div>

        <div className="px-4 -mt-6 bg-white rounded-t-3xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{exercise.name}</h1>
          <p className="text-gray-500 mb-4">{exercise.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-primary-50 rounded-xl p-3 text-center">
              <Dumbbell className="w-5 h-5 text-primary-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">器械</p>
              <p className="text-sm font-semibold text-gray-800">{exercise.equipment}</p>
            </div>
            <div className="bg-healthy-50 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-healthy-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">休息</p>
              <p className="text-sm font-semibold text-gray-800">{exercise.restTime}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">消耗</p>
              <p className="text-sm font-semibold text-gray-800">{exercise.calories}卡</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-primary-500" />
              <h3 className="font-bold text-gray-800">目标肌群</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {exercise.targetMuscles.map((muscle) => (
                <span key={muscle} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell className="w-5 h-5 text-primary-500" />
              <h3 className="font-bold text-gray-800">训练建议</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">组数</p>
                <p className="text-lg font-bold text-gray-800">{exercise.sets}组</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">次数</p>
                <p className="text-lg font-bold text-gray-800">{exercise.reps}次</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">动作步骤</h3>
            <div className="space-y-3">
              {exercise.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsWorkingOut(true)}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl py-3.5 font-bold shadow-soft hover:shadow-hover transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            开始训练
          </button>
        </div>
      </div>
    </div>
  );
}