import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { Flame, Droplets, Moon, Activity, TrendingUp, ArrowRight, Dumbbell, Utensils, Heart, Award, Plus, Minus, X, Zap } from 'lucide-react';
import { exercises } from '../data/exercises';
import { meals } from '../data/meals';
import { workoutPlans as plans } from '../data/plans';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { user, todayLog, workoutHistory, addCaloriesBurned, addCaloriesConsumed, updateWater, updateSleep } = useAppStore();
  const [showCalorieModal, setShowCalorieModal] = useState(false);
  const [calorieInput, setCalorieInput] = useState('');
  const [calorieType, setCalorieType] = useState<'burned' | 'consumed'>('burned');
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [waterInput, setWaterInput] = useState('');
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [sleepInput, setSleepInput] = useState('');

  const todayWaterGoal = 2000;
  const waterProgress = (todayLog.water / todayWaterGoal) * 100;
  const calorieProgress = todayLog.caloriesConsumed > 0 
    ? (todayLog.caloriesBurned / todayLog.caloriesConsumed) * 100 
    : 0;

  const recommendedExercises = exercises.slice(0, 3);
  const recommendedMeals = meals.slice(0, 3);
  const recommendedPlans = plans.slice(0, 2);

  const stats = [
    { 
      icon: Flame, 
      value: todayLog.caloriesBurned, 
      target: user.targetCalories, 
      label: '消耗卡路里', 
      color: 'orange',
      progress: todayLog.caloriesBurned / user.targetCalories * 100
    },
    { 
      icon: Droplets, 
      value: todayLog.water, 
      target: todayWaterGoal, 
      label: '饮水量(ml)', 
      color: 'blue',
      progress: waterProgress
    },
    { 
      icon: Moon, 
      value: todayLog.sleep, 
      target: 8, 
      label: '睡眠(小时)', 
      color: 'purple',
      progress: (todayLog.sleep / 8) * 100
    },
    { 
      icon: Activity, 
      value: user.streak, 
      target: 30, 
      label: '连续打卡', 
      color: 'primary',
      progress: Math.min((user.streak / 30) * 100, 100)
    },
  ];

  const recentAchievements = [
    { icon: Award, label: '首次训练', unlocked: workoutHistory.length > 0 },
    { icon: Flame, label: '累计100卡', unlocked: user.totalCaloriesBurned >= 100 },
    { icon: Flame, label: '累计500卡', unlocked: user.totalCaloriesBurned >= 500 },
    { icon: TrendingUp, label: '连续3天', unlocked: user.streak >= 3 },
    { icon: TrendingUp, label: '连续7天', unlocked: user.streak >= 7 },
    { icon: Heart, label: '收藏10个', unlocked: false },
  ];

  const handleAddCalories = () => {
    const amount = parseInt(calorieInput);
    if (amount > 0) {
      if (calorieType === 'burned') {
        addCaloriesBurned(amount);
      } else {
        addCaloriesConsumed(amount);
      }
      setCalorieInput('');
      setShowCalorieModal(false);
    }
  };

  const handleAddWater = () => {
    const amount = parseInt(waterInput);
    if (amount > 0) {
      updateWater(todayLog.water + amount);
      setWaterInput('');
      setShowWaterModal(false);
    }
  };

  const handleSetSleep = () => {
    const amount = parseFloat(sleepInput);
    if (amount >= 0 && amount <= 24) {
      updateSleep(amount);
      setSleepInput('');
      setShowSleepModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-20">
      <div className="bg-gradient-to-r from-primary-500 to-primary-400 text-white px-4 pt-16 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-100 text-sm">你好，</p>
            <h1 className="text-2xl font-bold">{user.name} 👋</h1>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <span className="text-lg font-bold">{user.name[0]}</span>
          </button>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">今日目标进度</span>
            <span className="text-sm font-medium">
              {Math.round(calorieProgress)}%
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${Math.min(calorieProgress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span>已消耗 {todayLog.caloriesBurned}卡</span>
            <span>目标 {user.targetCalories}卡</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const progressColor = stat.color === 'orange' ? 'bg-orange-400' 
              : stat.color === 'blue' ? 'bg-blue-400' 
              : stat.color === 'purple' ? 'bg-purple-400' 
              : 'bg-primary-400';
            
            const handleStatClick = () => {
              if (stat.label === '消耗卡路里') {
                setCalorieType('burned');
                setShowCalorieModal(true);
              } else if (stat.label === '饮水量(ml)') {
                setShowWaterModal(true);
              } else if (stat.label === '睡眠(小时)') {
                setShowSleepModal(true);
              }
            };
            
            return (
              <div 
                key={index} 
                onClick={handleStatClick}
                className="bg-white rounded-2xl p-4 shadow-card cursor-pointer hover:shadow-hover transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 ${stat.color === 'orange' ? 'bg-orange-100' : stat.color === 'blue' ? 'bg-blue-100' : stat.color === 'purple' ? 'bg-purple-100' : 'bg-primary-100'} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${stat.color === 'orange' ? 'text-orange-500' : stat.color === 'blue' ? 'text-blue-500' : stat.color === 'purple' ? 'text-purple-500' : 'text-primary-500'}`} />
                    </div>
                    <span className="text-xs text-gray-500">{stat.label}</span>
                  </div>
                  <Plus className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-gray-800">{stat.value}</span>
                  <span className="text-xs text-gray-400">/ {stat.target}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                  <div 
                    className={`${progressColor} rounded-full h-1.5 transition-all duration-500`}
                    style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">推荐训练计划</h3>
            <button 
              onClick={() => onNavigate('plans')}
              className="text-primary-500 text-sm flex items-center gap-1"
            >
              查看全部 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recommendedPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => onNavigate(`plan/${plan.id}`)}
                className="bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <img
                  src={plan.imageUrl}
                  alt={plan.name}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <h4 className="font-semibold text-sm text-gray-800">{plan.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{plan.duration}分钟 · {plan.calories}卡</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">推荐动作</h3>
            <button 
              onClick={() => onNavigate('exercises')}
              className="text-primary-500 text-sm flex items-center gap-1"
            >
              查看全部 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {recommendedExercises.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => onNavigate(`exercise/${exercise.id}`)}
                className="cursor-pointer"
              >
                <img
                  src={exercise.imageUrl}
                  alt={exercise.name}
                  className="w-full h-20 object-cover rounded-lg mb-2"
                />
                <h4 className="text-xs font-medium text-gray-800 truncate">{exercise.name}</h4>
                <p className="text-xs text-gray-500">{exercise.sets}组</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">今日食谱</h3>
            <button 
              onClick={() => onNavigate('meals')}
              className="text-primary-500 text-sm flex items-center gap-1"
            >
              查看全部 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recommendedMeals.map((meal) => (
              <div
                key={meal.id}
                onClick={() => onNavigate(`meal/${meal.id}`)}
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <img
                  src={meal.imageUrl}
                  alt={meal.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{meal.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{meal.calories}卡 · {meal.prepTime}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-healthy-600">蛋白{meal.protein}g</span>
                    <span className="text-xs text-orange-500">脂肪{meal.fat}g</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">成就徽章</h3>
            <button 
              onClick={() => onNavigate('profile')}
              className="text-primary-500 text-sm flex items-center gap-1"
            >
              查看更多 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {recentAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-3 rounded-xl ${achievement.unlocked ? 'bg-yellow-50' : 'bg-gray-50'}`}
                >
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${achievement.unlocked ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                    <Icon className={`w-5 h-5 ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-xs ${achievement.unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                    {achievement.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showCalorieModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowCalorieModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {calorieType === 'burned' ? '添加消耗卡路里' : '添加摄入卡路里'}
              </h3>
              <button onClick={() => setShowCalorieModal(false)} className="p-1">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setCalorieType('burned')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium ${calorieType === 'burned' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}
              >
                🔥 消耗
              </button>
              <button
                onClick={() => setCalorieType('consumed')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium ${calorieType === 'consumed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}
              >
                🍎 摄入
              </button>
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">卡路里数值</label>
              <input
                type="number"
                value={calorieInput}
                onChange={(e) => setCalorieInput(e.target.value)}
                placeholder="输入卡路里数值"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
            </div>
            <div className="flex gap-2 mb-4">
              {[50, 100, 200, 500].map((value) => (
                <button
                  key={value}
                  onClick={() => setCalorieInput(String(value))}
                  className="flex-1 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                >
                  +{value}
                </button>
              ))}
            </div>
            <button
              onClick={handleAddCalories}
              disabled={!calorieInput || parseInt(calorieInput) <= 0}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl py-3 font-bold disabled:opacity-50"
            >
              确认添加
            </button>
          </div>
        </div>
      )}

      {showWaterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowWaterModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">记录饮水量</h3>
              <button onClick={() => setShowWaterModal(false)} className="p-1">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">当前已饮 {todayLog.water}ml</p>
              <label className="text-sm text-gray-600 mb-2 block">添加饮水量 (ml)</label>
              <input
                type="number"
                value={waterInput}
                onChange={(e) => setWaterInput(e.target.value)}
                placeholder="输入饮水量"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex gap-2 mb-4">
              {[100, 200, 300, 500].map((value) => (
                <button
                  key={value}
                  onClick={() => setWaterInput(String(value))}
                  className="flex-1 py-2 bg-blue-50 rounded-lg text-sm text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  +{value}ml
                </button>
              ))}
            </div>
            <button
              onClick={handleAddWater}
              disabled={!waterInput || parseInt(waterInput) <= 0}
              className="w-full bg-blue-500 text-white rounded-2xl py-3 font-bold disabled:opacity-50"
            >
              确认添加
            </button>
          </div>
        </div>
      )}

      {showSleepModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowSleepModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">记录睡眠时长</h3>
              <button onClick={() => setShowSleepModal(false)} className="p-1">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">当前睡眠 {todayLog.sleep} 小时</p>
              <label className="text-sm text-gray-600 mb-2 block">设置睡眠时长 (小时)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={sleepInput}
                onChange={(e) => setSleepInput(e.target.value)}
                placeholder="输入睡眠时长，如 8"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>
            <div className="flex gap-2 mb-4">
              {[6, 7, 8, 9].map((value) => (
                <button
                  key={value}
                  onClick={() => setSleepInput(String(value))}
                  className="flex-1 py-2 bg-purple-50 rounded-lg text-sm text-purple-600 hover:bg-purple-100 transition-colors"
                >
                  {value}小时
                </button>
              ))}
            </div>
            <button
              onClick={handleSetSleep}
              disabled={!sleepInput || parseFloat(sleepInput) < 0}
              className="w-full bg-purple-500 text-white rounded-2xl py-3 font-bold disabled:opacity-50"
            >
              确认设置
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-24 left-4 bg-white rounded-2xl shadow-lg p-3 flex gap-2 z-40">
        <button
          onClick={() => { setCalorieType('burned'); setShowCalorieModal(true); }}
          className="flex flex-col items-center px-3 py-2 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
        >
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-xs text-orange-600 mt-1">消耗</span>
        </button>
        <button
          onClick={() => { setCalorieType('consumed'); setShowCalorieModal(true); }}
          className="flex flex-col items-center px-3 py-2 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
        >
          <Utensils className="w-5 h-5 text-green-500" />
          <span className="text-xs text-green-600 mt-1">摄入</span>
        </button>
        <button
          onClick={() => setShowWaterModal(true)}
          className="flex flex-col items-center px-3 py-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <Droplets className="w-5 h-5 text-blue-500" />
          <span className="text-xs text-blue-600 mt-1">饮水</span>
        </button>
      </div>
    </div>
  );
}