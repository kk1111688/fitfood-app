import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Flame, Target, AlertTriangle, CheckCircle, Play, Pause, Dumbbell } from 'lucide-react';
import { Header } from '../components/Header';
import { useAppStore } from '../store/appStore';

export const ExerciseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { exercises, toggleExerciseComplete, completedExercises, addWorkoutLog } = useAppStore();
  
  const exercise = exercises.find(e => e.id === id);
  const [currentSet, setCurrentSet] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <p className="text-gray-400">动作不存在</p>
      </div>
    );
  }

  const handleComplete = () => {
    toggleExerciseComplete(exercise.id);
    addWorkoutLog({
      userId: '1',
      exerciseId: exercise.id,
      date: new Date().toISOString(),
      setsCompleted: exercise.sets,
      repsCompleted: exercise.reps
    });
    setIsCompleted(true);
  };

  const difficultyColors = {
    初级: 'bg-green-100 text-green-700',
    中级: 'bg-yellow-100 text-yellow-700',
    高级: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-primary-50 pb-20">
      <Header title="动作详情" showBack />
      
      <div className="relative h-64">
        {exercise.gifUrl ? (
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-white text-2xl font-bold mb-2">{exercise.name}</h1>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[exercise.difficulty]}`}>
              {exercise.difficulty}
            </span>
            <span className="text-white/80 text-sm">{exercise.category}</span>
            {exercise.equipment && (
              <span className="text-white/80 text-sm flex items-center gap-1">
                <Dumbbell size={12} />
                {exercise.equipment}
              </span>
            )}
          </div>
        </div>
        {exercise.gifUrl && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            {isPlaying ? (
              <Pause className="text-primary-500" size={32} />
            ) : (
              <Play className="text-primary-500" size={32} fill="currentColor" />
            )}
          </button>
        )}
      </div>

      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl p-5 shadow-card mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">训练计划</h3>
            {isCompleted ? (
              <span className="flex items-center gap-1 text-green-500 text-sm">
                <CheckCircle size={16} />
                已完成
              </span>
            ) : (
              <span className="text-sm text-gray-400">
                {currentSet}/{exercise.sets}组
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-primary-500 mb-1">
                <Clock size={16} />
                <span className="text-xl font-bold">{exercise.sets}</span>
              </div>
              <span className="text-xs text-gray-500">组数</span>
            </div>
            <div className="bg-healthy-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-healthy-500 mb-1">
                <Target size={16} />
                <span className="text-xl font-bold">{exercise.reps}</span>
              </div>
              <span className="text-xs text-gray-500">次数</span>
            </div>
            <div className="bg-accent-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-accent-500 mb-1">
                <Flame size={16} />
                <span className="text-xl font-bold">{exercise.calories}</span>
              </div>
              <span className="text-xs text-gray-500">卡路里</span>
            </div>
          </div>

          {!isCompleted && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-300"
                    style={{ width: `${(currentSet / exercise.sets) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{Math.round((currentSet / exercise.sets) * 100)}%</span>
              </div>
              <button
                onClick={() => setCurrentSet(Math.min(currentSet + 1, exercise.sets))}
                className="w-full py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
              >
                {currentSet === exercise.sets ? '完成训练' : '完成当前组'}
              </button>
            </div>
          )}
        </div>

        {exercise.instructions && exercise.instructions.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-card mb-4">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="text-primary-500" size={20} />
              动作步骤
            </h3>
            <ol className="space-y-3">
              {exercise.instructions.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="bg-white rounded-2xl p-5 shadow-card mb-4">
          <h3 className="font-bold text-gray-800 mb-3">目标肌群</h3>
          <div className="flex flex-wrap gap-2">
            {exercise.targetMuscle.split('、').map((muscle, index) => (
              <span key={index} className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm">
                {muscle}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-orange-500" size={20} />
            <h3 className="font-bold text-orange-800">注意事项</h3>
          </div>
          <p className="text-orange-700 text-sm leading-relaxed">{exercise.tips}</p>
        </div>
      </div>

      <div className="fixed bottom-20 left-4 right-4">
        <button
          onClick={handleComplete}
          disabled={!isCompleted && currentSet !== exercise.sets}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            (!isCompleted && currentSet !== exercise.sets)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'gradient-primary text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isCompleted ? '已完成' : '标记完成'}
        </button>
      </div>
    </div>
  );
};
