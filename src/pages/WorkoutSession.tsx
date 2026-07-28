import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, SkipForward, CheckCircle, Flame, Clock, Dumbbell } from 'lucide-react';
import { Exercise, WorkoutRecord } from '../types';
import { useAppStore } from '../store/appStore';

interface WorkoutSessionProps {
  exercises: Exercise[];
  planName: string;
  planId?: string;
  onComplete: () => void;
  onBack: () => void;
}

export function WorkoutSession({ exercises, planName, planId, onComplete, onBack }: WorkoutSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSets, setCompletedSets] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [startTime] = useState(Date.now());
  const { addWorkoutRecord } = useAppStore();

  const currentExercise = exercises[currentIndex];
  const totalExercises = exercises.length;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (!isPaused) {
      if (isResting) {
        timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              setIsResting(false);
              setTimeLeft(currentExercise?.restTime ? parseInt(currentExercise.restTime) : 60);
              return 60;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        timer = setInterval(() => {
          setTotalDuration((prev) => prev + 1);
        }, 1000);
      }
    }
    return () => clearInterval(timer);
  }, [isResting, isPaused, currentExercise]);

  const handleCompleteSet = () => {
    if (currentExercise) {
      const newSets = completedSets + 1;
      setCompletedSets(newSets);
      const caloriesPerSet = currentExercise.calories / currentExercise.sets;
      setTotalCalories((prev) => prev + caloriesPerSet);
      
      if (newSets >= currentExercise.sets) {
        setIsResting(true);
        setTimeLeft(parseInt(currentExercise.restTime) || 60);
      }
    }
  };

  const handleNextExercise = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalExercises - 1));
    setCompletedSets(0);
    setIsResting(false);
  };

  const handleFinishWorkout = () => {
    const record: WorkoutRecord = {
      id: `workout-${Date.now()}`,
      date: new Date().toISOString(),
      planId,
      planName,
      duration: Math.round(totalDuration / 60),
      caloriesBurned: Math.round(totalCalories),
      exercisesCompleted: totalExercises,
      totalSets: exercises.reduce((sum, ex) => sum + ex.sets, 0),
      totalReps: exercises.reduce((sum, ex) => sum + parseInt(ex.reps), 0),
    };
    addWorkoutRecord(record);
    onComplete();
  };

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">没有找到训练动作</p>
      </div>
    );
  }

  if (currentIndex === totalExercises - 1 && completedSets >= currentExercise.sets && !isResting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">训练完成！</h1>
          <p className="text-gray-500 mb-6">{planName}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-50 rounded-xl p-4">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{Math.round(totalCalories)}</p>
              <p className="text-sm text-gray-500">消耗卡路里</p>
            </div>
            <div className="bg-primary-50 rounded-xl p-4">
              <Dumbbell className="w-6 h-6 text-primary-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary-600">{totalExercises}</p>
              <p className="text-sm text-gray-500">完成动作</p>
            </div>
          </div>

          <button
            onClick={handleFinishWorkout}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl py-3 font-bold"
          >
            保存并返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm">
        <div className="px-4 pt-12 pb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-400">{planName}</p>
            <p className="font-bold">
              {currentIndex + 1} / {totalExercises}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-orange-400">
              <Flame className="w-4 h-4" />
              <span className="font-bold">{Math.round(totalCalories)}</span>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-primary-500 transition-all"
            style={{ width: `${((currentIndex + completedSets / currentExercise.sets) / totalExercises) * 100}%` }}
          />
        </div>
      </div>

      <div className="pt-20 pb-32 px-4">
        {isResting ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-gray-400 text-sm mb-4">休息中</p>
            <div className="w-48 h-48 rounded-full border-4 border-gray-700 flex items-center justify-center mb-8">
              <div className="text-center">
                <p className="text-5xl font-bold">{timeLeft}</p>
                <p className="text-gray-400">秒</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              </button>
              <button
                onClick={() => {
                  setIsResting(false);
                  setTimeLeft(parseInt(currentExercise.restTime) || 60);
                }}
                className="px-6 py-3 bg-primary-500 rounded-full font-medium hover:bg-primary-600 transition-colors"
              >
                跳过休息
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm mb-2">当前动作</p>
              <h1 className="text-2xl font-bold">{currentExercise.name}</h1>
            </div>

            <div className="bg-gray-800 rounded-3xl overflow-hidden mb-6">
              <img
                src={currentExercise.imageUrl}
                alt={currentExercise.name}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="bg-gray-800 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-400" />
                  <span>组间休息: {currentExercise.restTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-primary-400" />
                  <span>{currentExercise.sets}组 x {currentExercise.reps}</span>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 text-center">
                <p className="text-5xl font-bold mb-2">{completedSets}</p>
                <p className="text-gray-400">/ {currentExercise.sets} 组</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-4 mb-6">
              <h3 className="font-bold mb-3">动作要点</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                {currentExercise.instructions.slice(0, 3).map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary-400">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {!isResting && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
          <div className="max-w-md mx-auto">
            {completedSets < currentExercise.sets ? (
              <button
                onClick={handleCompleteSet}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-6 h-6" />
                完成当前组
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setCompletedSets(0)}
                  className="flex-1 bg-gray-700 text-white rounded-2xl py-4 font-bold"
                >
                  重置
                </button>
                <button
                  onClick={handleNextExercise}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2"
                >
                  下一个动作
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}