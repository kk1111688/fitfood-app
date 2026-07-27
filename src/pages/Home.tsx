import { useState } from 'react';
import { Flame, Droplets, Moon, Activity, ArrowRight, ChevronRight, TrendingUp, Heart } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ExerciseCard } from '../components/ExerciseCard';
import { MealCard } from '../components/MealCard';
import { exercises } from '../data/exercises';
import { meals } from '../data/meals';
import { userProfile, todayLog, weeklyLogs } from '../data/plans';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [water, setWater] = useState(todayLog.water);
  const [sleep, setSleep] = useState(todayLog.sleep);

  const quickStats = [
    { icon: Flame, label: '今日消耗', value: todayLog.caloriesBurned, subValue: '目标 500卡', color: 'orange' as const },
    { icon: Activity, label: '今日摄入', value: todayLog.caloriesConsumed, subValue: '目标 2000卡', color: 'primary' as const },
    { icon: Droplets, label: '饮水量', value: `${water}ml`, subValue: '目标 2000ml', color: 'blue' as const },
    { icon: Moon, label: '睡眠', value: `${sleep}小时`, subValue: '目标 8小时', color: 'purple' as const },
  ];

  const recentExercises = exercises.slice(0, 3);
  const recentMeals = meals.filter(m => m.category === 'lunch').slice(0, 2);

  const weeklyCalories = weeklyLogs.map(log => log.caloriesBurned);
  const maxCalories = Math.max(...weeklyCalories, 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-20">
      <div className="bg-gradient-to-r from-primary-500 to-primary-400 text-white px-4 pt-16 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-100 text-sm">欢迎回来，{userProfile.name}</p>
            <h2 className="text-2xl font-bold">今天也要加油！</h2>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-orange-300" />
            <span className="text-sm font-medium">{userProfile.streak}天连续</span>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-primary-100">本周运动趋势</span>
            <button className="text-xs text-white flex items-center gap-1">
              查看详情 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-end justify-between h-20 gap-2">
            {['一', '二', '三', '四', '五', '六', '日'].map((day, index) => (
              <div key={day} className="flex flex-col items-center gap-1 flex-1">
                <div 
                  className="w-full rounded-t-md bg-white/80 transition-all hover:bg-white"
                  style={{ height: `${(weeklyCalories[index] / maxCalories) * 100}%` }}
                />
                <span className="text-xs text-primary-200">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              subValue={stat.subValue}
              color={stat.color}
            />
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-gray-800">今日推荐动作</h3>
          </div>
          <button 
            onClick={() => onNavigate('exercises')}
            className="text-sm text-primary-600 flex items-center gap-1"
          >
            查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {recentExercises.map((exercise) => (
            <div key={exercise.id} className="min-w-[200px]">
              <ExerciseCard exercise={exercise} onClick={() => onNavigate(`exercise/${exercise.id}`)} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-healthy-500" />
            <h3 className="font-bold text-gray-800">今日食谱推荐</h3>
          </div>
          <button 
            onClick={() => onNavigate('meals')}
            className="text-sm text-primary-600 flex items-center gap-1"
          >
            查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {recentMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onClick={() => onNavigate(`meal/${meal.id}`)} />
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <button 
          onClick={() => onNavigate('plans')}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl p-4 flex items-center justify-between shadow-soft hover:shadow-hover transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold">开始今日训练</p>
              <p className="text-sm text-primary-100">选择一个训练计划</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}