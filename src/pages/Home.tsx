import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { Flame, Droplets, Moon, Activity, TrendingUp, ArrowRight, Dumbbell, Utensils, Heart, Award, Plus, Minus, X, Zap, CheckCircle, Target } from 'lucide-react';
import { exercises } from '../data/exercises';
import { meals } from '../data/meals';
import { workoutPlans as plans } from '../data/plans';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { user, todayLog, workoutHistory, addCaloriesBurned, addCaloriesConsumed, updateWater, updateSleep, lastCheckInDate, checkIn } = useAppStore();
  const [showCalorieModal, setShowCalorieModal] = useState(false);
  const [calorieInput, setCalorieInput] = useState('');
  const [calorieType, setCalorieType] = useState<'burned' | 'consumed'>('burned');
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [waterInput, setWaterInput] = useState('');
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [sleepInput, setSleepInput] = useState('');
  const [showCheckInSuccess, setShowCheckInSuccess] = useState(false);

  const hasCheckedInToday = lastCheckInDate === new Date().toDateString();

  const handleCheckIn = () => {
    const success = checkIn();
    if (success) {
      setShowCheckInSuccess(true);
      setTimeout(() => setShowCheckInSuccess(false), 2000);
    }
  };

  const todayWaterGoal = 2000;
  const waterProgress = Math.min((todayLog.water / todayWaterGoal) * 100, 100);
  const calorieProgress = user.targetCalories > 0 
    ? Math.min((todayLog.caloriesBurned / user.targetCalories) * 100, 100)
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
      color: 'orange' as const,
      gradient: 'from-orange-400 to-red-400',
      progress: Math.min((todayLog.caloriesBurned / user.targetCalories) * 100, 100)
    },
    { 
      icon: Droplets, 
      value: todayLog.water, 
      target: todayWaterGoal, 
      label: '饮水量(ml)', 
      color: 'blue' as const,
      gradient: 'from-blue-400 to-cyan-400',
      progress: waterProgress
    },
    { 
      icon: Moon, 
      value: todayLog.sleep, 
      target: 8, 
      label: '睡眠(小时)', 
      color: 'purple' as const,
      gradient: 'from-purple-400 to-indigo-400',
      progress: Math.min((todayLog.sleep / 8) * 100, 100)
    },
    { 
      icon: Activity, 
      value: user.streak, 
      target: 30, 
      label: '连续打卡', 
      color: 'primary' as const,
      gradient: 'from-primary-400 to-emerald-400',
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

  const getStatIconBg = (color: string) => {
    switch (color) {
      case 'orange': return 'bg-orange-50 text-orange-500';
      case 'blue': return 'bg-blue-50 text-blue-500';
      case 'purple': return 'bg-purple-50 text-purple-500';
      default: return 'bg-primary-50 text-primary-500';
    }
  };

  const getStatProgressBg = (color: string) => {
    switch (color) {
      case 'orange': return 'bg-gradient-to-r from-orange-400 to-red-400';
      case 'blue': return 'bg-gradient-to-r from-blue-400 to-cyan-400';
      case 'purple': return 'bg-gradient-to-r from-purple-400 to-indigo-400';
      default: return 'bg-gradient-to-r from-primary-400 to-emerald-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-28">
      {/* 顶部区域 */}
      <div className="relative overflow-hidden animate-stagger-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-400 to-emerald-400 rounded-b-3xl" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative text-white px-4 pt-14 pb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-white/80 text-sm font-medium">你好，</p>
              <h1 className="text-2xl font-bold mt-0.5">{user.name} <span className="inline-block animate-pulse">👋</span></h1>
            </div>
            <button
              onClick={() => onNavigate('profile')}
              className="w-11 h-11 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/35 transition-all active:scale-95"
            >
              <span className="text-lg font-bold">{user.name[0]}</span>
            </button>
          </div>
          
          {/* 目标进度卡片 */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">今日目标进度</span>
              </div>
              <span className="text-sm font-bold bg-white/25 px-2 py-0.5 rounded-full">
                {Math.round(calorieProgress)}%
              </span>
            </div>
            <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-white to-emerald-200 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2.5 text-xs text-white/90">
              <span>已消耗 {todayLog.caloriesBurned}卡</span>
              <span>目标 {user.targetCalories}卡</span>
            </div>
          </div>
        </div>
      </div>

      {/* 打卡卡片 */}
      <div className="px-4 -mt-5 relative z-10 animate-stagger-2">
        <div className="bg-white rounded-2xl p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${hasCheckedInToday ? 'bg-healthy-100' : 'bg-gradient-to-br from-primary-100 to-emerald-100'}`}>
                {hasCheckedInToday ? (
                  <CheckCircle className="w-6 h-6 text-healthy-500" />
                ) : (
                  <Flame className="w-6 h-6 text-primary-500" />
                )}
              </div>
              <div>
                <p className="font-bold text-gray-800">
                  {hasCheckedInToday ? '今日已打卡' : '今日未打卡'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  已连续打卡 <span className="text-primary-500 font-semibold">{user.streak}</span> 天 🔥
                </p>
              </div>
            </div>
            <button
              onClick={handleCheckIn}
              disabled={hasCheckedInToday}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                hasCheckedInToday
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30'
              }`}
            >
              {hasCheckedInToday ? '已打卡 ✓' : '立即打卡'}
            </button>
          </div>
        </div>
      </div>

      {/* 统计卡片网格 */}
      <div className="px-4 mt-4 animate-stagger-3">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
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
                className="group bg-white rounded-2xl p-3.5 shadow-soft cursor-pointer hover:shadow-elevated transition-all duration-300 active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${getStatIconBg(stat.color)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <Plus className="w-4 h-4 text-gray-300 group-hover:text-primary-400 transition-colors" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-gray-800">{stat.value}</span>
                  <span className="text-xs text-gray-400">/ {stat.target}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-700 ease-out ${getStatProgressBg(stat.color)}`}
                    style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 推荐训练计划 */}
      <div className="px-4 mt-5 animate-stagger-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-primary-500" />
            推荐训练计划
          </h3>
          <button 
            onClick={() => onNavigate('plans')}
            className="text-primary-500 text-sm font-medium flex items-center gap-0.5 hover:gap-1 transition-all"
          >
            全部 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {recommendedPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => onNavigate(`plan/${plan.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-soft cursor-pointer hover:shadow-elevated transition-all duration-300 active:scale-[0.98]"
            >
              <div className="relative">
                <img
                  src={plan.imageUrl}
                  alt={plan.name}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <span className="text-xs font-semibold text-primary-600">{plan.level === 'beginner' ? '入门' : plan.level === 'intermediate' ? '进阶' : '高级'}</span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm text-gray-800 truncate">{plan.name}</h4>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                  <span className="flex items-center gap-0.5">⏱ {plan.duration}分</span>
                  <span className="flex items-center gap-0.5">🔥 {plan.calories}卡</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 推荐动作 */}
      <div className="px-4 mt-5 animate-stagger-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            推荐动作
          </h3>
          <button 
            onClick={() => onNavigate('exercises')}
            className="text-primary-500 text-sm font-medium flex items-center gap-0.5 hover:gap-1 transition-all"
          >
            全部 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {recommendedExercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => onNavigate(`exercise/${exercise.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-soft cursor-pointer hover:shadow-elevated transition-all duration-300 active:scale-[0.98]"
            >
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className="w-full h-20 object-cover"
              />
              <div className="p-2">
                <h4 className="text-xs font-semibold text-gray-800 truncate">{exercise.name}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">{exercise.sets}组 · {exercise.reps}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 今日食谱 */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-orange-500" />
            今日食谱
          </h3>
          <button 
            onClick={() => onNavigate('meals')}
            className="text-primary-500 text-sm font-medium flex items-center gap-0.5 hover:gap-1 transition-all"
          >
            全部 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2.5">
          {recommendedMeals.map((meal) => (
            <div
              key={meal.id}
              onClick={() => onNavigate(`meal/${meal.id}`)}
              className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-soft cursor-pointer hover:shadow-elevated transition-all duration-300 active:scale-[0.99]"
            >
              <img
                src={meal.imageUrl}
                alt={meal.name}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate">{meal.name}</h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-0.5"><Flame className="w-3 h-3 text-orange-400" />{meal.calories}卡</span>
                  <span>⏱ {meal.prepTime}</span>
                </div>
                <div className="flex gap-2 mt-1.5">
                  <span className="text-[10px] text-healthy-600 bg-healthy-50 px-1.5 py-0.5 rounded-md">蛋白{meal.protein}g</span>
                  <span className="text-[10px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-md">脂肪{meal.fat}g</span>
                  <span className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md">碳水{meal.carbs}g</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* 成就徽章 */}
      <div className="px-4 mt-5">
        <div className="bg-white rounded-2xl p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              成就徽章
            </h3>
            <button 
              onClick={() => onNavigate('profile')}
              className="text-primary-500 text-sm font-medium flex items-center gap-0.5 hover:gap-1 transition-all"
            >
              全部 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {recentAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-3 rounded-xl transition-all ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1.5 ${
                    achievement.unlocked ? 'bg-gradient-to-br from-amber-200 to-yellow-300' : 'bg-gray-200'
                  }`}>
                    <Icon className={`w-5 h-5 ${achievement.unlocked ? 'text-amber-600' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-xs font-medium ${achievement.unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                    {achievement.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 浮动操作按钮 */}
      <div className="fixed bottom-24 left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-elevated p-2.5 flex gap-1.5 z-40 border border-white/60">
        <button
          onClick={() => { setCalorieType('burned'); setShowCalorieModal(true); }}
          className="flex flex-col items-center px-3 py-2 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:from-orange-100 hover:to-red-100 transition-all active:scale-95"
        >
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-[10px] text-orange-600 mt-0.5 font-medium">消耗</span>
        </button>
        <button
          onClick={() => { setCalorieType('consumed'); setShowCalorieModal(true); }}
          className="flex flex-col items-center px-3 py-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all active:scale-95"
        >
          <Utensils className="w-5 h-5 text-green-500" />
          <span className="text-[10px] text-green-600 mt-0.5 font-medium">摄入</span>
        </button>
        <button
          onClick={() => setShowWaterModal(true)}
          className="flex flex-col items-center px-3 py-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all active:scale-95"
        >
          <Droplets className="w-5 h-5 text-blue-500" />
          <span className="text-[10px] text-blue-600 mt-0.5 font-medium">饮水</span>
        </button>
      </div>

      {/* 卡路里弹窗 */}
      {showCalorieModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center px-4 animate-fade-in" onClick={() => setShowCalorieModal(false)}>
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {calorieType === 'burned' ? '添加消耗卡路里' : '添加摄入卡路里'}
              </h3>
              <button onClick={() => setShowCalorieModal(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setCalorieType('burned')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  calorieType === 'burned' 
                    ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                🔥 消耗
              </button>
              <button
                onClick={() => setCalorieType('consumed')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  calorieType === 'consumed' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                🍎 摄入
              </button>
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={calorieInput}
                onChange={(e) => setCalorieInput(e.target.value)}
                placeholder="输入卡路里数值"
                className="w-full px-4 py-4 bg-gray-100 rounded-2xl text-2xl font-bold text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                autoFocus
              />
            </div>
            <div className="flex gap-2 mb-4">
              {[50, 100, 200, 500].map((value) => (
                <button
                  key={value}
                  onClick={() => setCalorieInput(String(value))}
                  className="flex-1 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-600 font-medium hover:bg-primary-50 hover:text-primary-600 transition-all active:scale-95"
                >
                  +{value}
                </button>
              ))}
            </div>
            <button
              onClick={handleAddCalories}
              disabled={!calorieInput || parseInt(calorieInput) <= 0}
              className="w-full bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-2xl py-3.5 font-bold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              确认添加
            </button>
          </div>
        </div>
      )}

      {/* 饮水弹窗 */}
      {showWaterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center px-4 animate-fade-in" onClick={() => setShowWaterModal(false)}>
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">记录饮水量</h3>
              <button onClick={() => setShowWaterModal(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="mb-4 p-3 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600">当前已饮 <span className="font-bold text-blue-600">{todayLog.water}ml</span></p>
              <div className="w-full bg-blue-100 rounded-full h-2 mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-500" style={{ width: `${waterProgress}%` }} />
              </div>
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={waterInput}
                onChange={(e) => setWaterInput(e.target.value)}
                placeholder="输入饮水量"
                className="w-full px-4 py-4 bg-gray-100 rounded-2xl text-2xl font-bold text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                autoFocus
              />
            </div>
            <div className="flex gap-2 mb-4">
              {[100, 200, 300, 500].map((value) => (
                <button
                  key={value}
                  onClick={() => setWaterInput(String(value))}
                  className="flex-1 py-2.5 bg-blue-50 rounded-xl text-sm text-blue-600 font-medium hover:bg-blue-100 transition-all active:scale-95"
                >
                  +{value}ml
                </button>
              ))}
            </div>
            <button
              onClick={handleAddWater}
              disabled={!waterInput || parseInt(waterInput) <= 0}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl py-3.5 font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              确认添加
            </button>
          </div>
        </div>
      )}

      {/* 睡眠弹窗 */}
      {showSleepModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center px-4 animate-fade-in" onClick={() => setShowSleepModal(false)}>
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">记录睡眠时长</h3>
              <button onClick={() => setShowSleepModal(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="mb-4 p-3 bg-purple-50 rounded-xl">
              <p className="text-sm text-gray-600">当前睡眠 <span className="font-bold text-purple-600">{todayLog.sleep} 小时</span></p>
            </div>
            <div className="mb-3">
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={sleepInput}
                onChange={(e) => setSleepInput(e.target.value)}
                placeholder="输入睡眠时长，如 8"
                className="w-full px-4 py-4 bg-gray-100 rounded-2xl text-2xl font-bold text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                autoFocus
              />
            </div>
            <div className="flex gap-2 mb-4">
              {[6, 7, 8, 9].map((value) => (
                <button
                  key={value}
                  onClick={() => setSleepInput(String(value))}
                  className="flex-1 py-2.5 bg-purple-50 rounded-xl text-sm text-purple-600 font-medium hover:bg-purple-100 transition-all active:scale-95"
                >
                  {value}小时
                </button>
              ))}
            </div>
            <button
              onClick={handleSetSleep}
              disabled={!sleepInput || parseFloat(sleepInput) < 0}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl py-3.5 font-bold shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              确认设置
            </button>
          </div>
        </div>
      )}

      {/* 打卡成功提示 */}
      {showCheckInSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center px-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-br from-healthy-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-healthy-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">打卡成功！</h3>
            <p className="text-sm text-gray-500">
              已连续打卡 <span className="text-primary-500 font-bold">{user.streak}</span> 天，继续加油！🔥
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
