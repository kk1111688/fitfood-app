import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Activity, Dumbbell, UtensilsCrossed, TrendingUp, Calendar, User, Leaf, Sparkles } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ExerciseCard } from '../components/ExerciseCard';
import { MealCard } from '../components/MealCard';
import { useAppStore } from '../store/appStore';
import { todayPlan } from '../data/mockData';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { completedExercises, completedMeals, toggleExerciseComplete, toggleMealComplete, user } = useAppStore();

  const today = new Date();
  const dateString = `${today.getMonth() + 1}月${today.getDate()}日`;
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][today.getDay()];

  const exercisesCompleted = completedExercises.length;
  const totalExercises = todayPlan.exercises.length;
  const mealsCompleted = completedMeals.length;
  const totalMeals = todayPlan.meals.length;

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  return (
    <div className="min-h-screen bg-primary-50 pb-20">
      <div className="gradient-primary pt-16 pb-12 px-4 rounded-b-[2.5rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm flex items-center gap-1">
              <Calendar size={14} />
              {dateString} {weekday}
            </p>
            <h2 className="text-white text-2xl font-bold mt-1 flex items-center gap-2">
              {getGreeting()}，{user.name}
              <Sparkles className="text-yellow-200" size={20} />
            </h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
            <User className="text-white" size={24} />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/90 text-sm font-medium">今日目标完成度</span>
            <span className="text-white font-bold text-xl">
              {Math.round(((exercisesCompleted + mealsCompleted) / (totalExercises + totalMeals)) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((exercisesCompleted + mealsCompleted) / (totalExercises + totalMeals)) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-white/70 text-xs">
            <span className="flex items-center gap-1">
              <Dumbbell size={12} />
              训练: {exercisesCompleted}/{totalExercises}
            </span>
            <span className="flex items-center gap-1">
              <Leaf size={12} />
              饮食: {mealsCompleted}/{totalMeals}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Flame}
            label="今日摄入"
            value="1,850"
            subValue="卡路里"
            color="primary"
          />
          <StatCard
            icon={Activity}
            label="今日消耗"
            value="480"
            subValue="卡路里"
            color="healthy"
          />
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800">快捷入口</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/exercises')}
            className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-card card-hover"
          >
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Dumbbell className="text-primary-500" size={24} />
            </div>
            <span className="text-sm text-gray-600">动作库</span>
          </button>
          <button
            onClick={() => navigate('/meals')}
            className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-card card-hover"
          >
            <div className="w-12 h-12 rounded-full bg-healthy-100 flex items-center justify-center">
              <UtensilsCrossed className="text-healthy-500" size={24} />
            </div>
            <span className="text-sm text-gray-600">饮食推荐</span>
          </button>
          <button
            onClick={() => navigate('/exercises')}
            className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-card card-hover"
          >
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <Activity className="text-primary-500" size={24} />
            </div>
            <span className="text-sm text-gray-600">开始训练</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-card card-hover"
          >
            <div className="w-12 h-12 rounded-full bg-accent-50 flex items-center justify-center">
              <TrendingUp className="text-accent-500" size={24} />
            </div>
            <span className="text-sm text-gray-600">数据统计</span>
          </button>
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <Dumbbell className="text-primary-500" size={20} />
            今日训练
          </h3>
          <button onClick={() => navigate('/exercises')} className="text-sm text-primary-500 font-medium">
            查看全部
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {todayPlan.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => {
                toggleExerciseComplete(exercise.id);
                navigate(`/exercises/${exercise.id}`);
              }}
              isCompleted={completedExercises.includes(exercise.id)}
            />
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <Leaf className="text-healthy-500" size={20} />
            今日饮食
          </h3>
          <button onClick={() => navigate('/meals')} className="text-sm text-primary-500 font-medium">
            查看全部
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {todayPlan.meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onClick={() => {
                toggleMealComplete(meal.id);
                navigate(`/meals/${meal.id}`);
              }}
              isCompleted={completedMeals.includes(meal.id)}
            />
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800">本周训练统计</h3>
          <Calendar className="text-gray-400" size={20} />
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <div className="flex items-end justify-between h-32">
            {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
              <div key={day} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-8 rounded-t-xl bg-gradient-to-t from-primary-400 to-primary-300 transition-all duration-300 hover:from-primary-500 hover:to-primary-400"
                  style={{ height: `${30 + index * 8}px` }}
                />
                <span className="text-xs text-gray-400">
                  {['一', '二', '三', '四', '五', '六', '日'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
