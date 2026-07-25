import React from 'react';
import { User, Settings, HelpCircle, LogOut, Dumbbell, UtensilsCrossed, TrendingUp, Flame, Activity, Calendar, Target } from 'lucide-react';
import { Header } from '../components/Header';
import { StatCard } from '../components/StatCard';
import { useAppStore } from '../store/appStore';

export const Profile: React.FC = () => {
  const { user, stats, completedExercises, completedMeals } = useAppStore();

  const totalWorkouts = stats.reduce((sum, day) => sum + day.exercisesCompleted, 0);
  const totalCaloriesBurned = stats.reduce((sum, day) => sum + day.caloriesBurned, 0);
  const totalCaloriesIntake = stats.reduce((sum, day) => sum + day.caloriesIntake, 0);
  const totalMeals = stats.reduce((sum, day) => sum + day.mealsEaten, 0);

  const menuItems = [
    { icon: Target, label: '健身目标', value: user.fitnessGoal },
    { icon: Settings, label: '设置', value: '' },
    { icon: HelpCircle, label: '帮助与反馈', value: '' },
    { icon: LogOut, label: '退出登录', value: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="我的" />
      
      <div className="px-4 py-4">
        <div className="bg-gradient-to-br from-primary-500 to-orange-400 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <User size={40} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-white/80 text-sm">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  目标: {user.fitnessGoal}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{user.weight}kg</p>
              <p className="text-xs text-white/80">体重</p>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <p className="text-2xl font-bold">{user.height}cm</p>
              <p className="text-xs text-white/80">身高</p>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <p className="text-2xl font-bold">{(user.weight / (user.height / 100) ** 2).toFixed(1)}</p>
              <p className="text-xs text-white/80">BMI</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            icon={Dumbbell}
            label="本周训练"
            value={totalWorkouts}
            subValue="次训练"
            color="primary"
          />
          <StatCard
            icon={UtensilsCrossed}
            label="本周饮食"
            value={totalMeals}
            subValue="餐"
            color="healthy"
          />
          <StatCard
            icon={Flame}
            label="本周消耗"
            value={totalCaloriesBurned}
            subValue="卡路里"
            color="blue"
          />
          <StatCard
            icon={Activity}
            label="本周摄入"
            value={totalCaloriesIntake}
            subValue="卡路里"
            color="purple"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">本周训练趋势</h3>
            <Calendar className="text-gray-400" size={20} />
          </div>
          <div className="flex items-end justify-between h-32">
            {stats.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-8 rounded-t-lg bg-primary-500 transition-all duration-300"
                  style={{ height: `${(day.exercisesCompleted / 6) * 100}px` }}
                />
                <span className="text-xs text-gray-400">
                  {day.date.replace('周', '')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h3 className="font-bold text-gray-800 mb-4">完成情况</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">训练完成</span>
                <span className="text-sm font-medium text-primary-500">
                  {completedExercises.length}/12
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${(completedExercises.length / 12) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">饮食完成</span>
                <span className="text-sm font-medium text-healthy-500">
                  {completedMeals.length}/10
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-healthy-500 rounded-full"
                  style={{ width: `${(completedMeals.length / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index === 0 ? 'bg-primary-100' :
                index === 1 ? 'bg-blue-100' :
                index === 2 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <item.icon size={20} className={
                  index === 0 ? 'text-primary-500' :
                  index === 1 ? 'text-blue-500' :
                  index === 2 ? 'text-yellow-500' : 'text-red-500'
                } />
              </div>
              <span className="flex-1 text-left text-gray-800">{item.label}</span>
              {item.value && (
                <span className="text-sm text-gray-400">{item.value}</span>
              )}
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        <div className="text-center text-gray-400 text-xs mt-6">
          燃脂食堂 v1.0.0
        </div>
      </div>
    </div>
  );
};
