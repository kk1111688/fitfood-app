import { Flame, Droplets, Moon, Activity, ArrowRight, ChevronRight, TrendingUp, Heart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { ExerciseCard } from '../components/ExerciseCard';
import { MealCard } from '../components/MealCard';
import { exercises } from '../data/exercises';
import { meals } from '../data/meals';
import { weeklyLogs } from '../data/plans';
import { useAppStore } from '../store/appStore';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { user, todayLog, updateWater, updateSleep } = useAppStore();
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [tempWater, setTempWater] = useState(todayLog.water);
  const [tempSleep, setTempSleep] = useState(todayLog.sleep);

  const quickStats = [
    { 
      icon: Flame, 
      label: '今日消耗', 
      value: todayLog.caloriesBurned, 
      subValue: `目标 ${user.targetCalories - 500}卡`, 
      color: 'orange' as const 
    },
    { 
      icon: Activity, 
      label: '今日摄入', 
      value: todayLog.caloriesConsumed, 
      subValue: `目标 ${user.targetCalories}卡`, 
      color: 'primary' as const 
    },
    { 
      icon: Droplets, 
      label: '饮水量', 
      value: `${todayLog.water}ml`, 
      subValue: '目标 2000ml', 
      color: 'blue' as const,
      onClick: () => { setTempWater(todayLog.water); setShowWaterModal(true); }
    },
    { 
      icon: Moon, 
      label: '睡眠', 
      value: `${todayLog.sleep}小时`, 
      subValue: '目标 8小时', 
      color: 'purple' as const,
      onClick: () => { setTempSleep(todayLog.sleep); setShowSleepModal(true); }
    },
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
            <p className="text-primary-100 text-sm">欢迎回来，{user.name}</p>
            <h2 className="text-2xl font-bold">今天也要加油！</h2>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-orange-300" />
            <span className="text-sm font-medium">{user.streak}天连续</span>
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
            <div key={index} onClick={stat.onClick} className={stat.onClick ? 'cursor-pointer' : ''}>
              <StatCard
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                subValue={stat.subValue}
                color={stat.color}
              />
            </div>
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

      {showWaterModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowWaterModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              记录饮水量
            </h3>
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setTempWater(Math.max(0, tempWater - 100))}
                className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"
              >
                <Minus className="w-6 h-6" />
              </button>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{tempWater}</p>
                <p className="text-sm text-gray-500">ml</p>
              </div>
              <button
                onClick={() => setTempWater(tempWater + 100)}
                className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[200, 300, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTempWater(tempWater + amount)}
                  className="py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                >
                  +{amount}
                </button>
              ))}
            </div>
            <button
              onClick={() => { updateWater(tempWater); setShowWaterModal(false); }}
              className="w-full bg-blue-500 text-white rounded-xl py-3 font-medium"
            >
              确认
            </button>
          </div>
        </div>
      )}

      {showSleepModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowSleepModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5 text-purple-500" />
              记录睡眠时间
            </h3>
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setTempSleep(Math.max(0, tempSleep - 0.5))}
                className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"
              >
                <Minus className="w-6 h-6" />
              </button>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{tempSleep}</p>
                <p className="text-sm text-gray-500">小时</p>
              </div>
              <button
                onClick={() => setTempSleep(tempSleep + 0.5)}
                className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-gray-500">快速选择:</span>
              {[6, 7, 8, 9].map((hours) => (
                <button
                  key={hours}
                  onClick={() => setTempSleep(hours)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    tempSleep === hours ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  {hours}h
                </button>
              ))}
            </div>
            <button
              onClick={() => { updateSleep(tempSleep); setShowSleepModal(false); }}
              className="w-full bg-purple-500 text-white rounded-xl py-3 font-medium"
            >
              确认
            </button>
          </div>
        </div>
      )}
    </div>
  );
}