import { useState } from 'react';
import { ArrowLeft, Calendar, Dumbbell, Utensils, Plus, X, Check, Coffee, Sun, Moon, Cookie, Trash2, Sparkles, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { exercises } from '../data/exercises';
import { meals } from '../data/meals';
import { DayPlan, WeeklyPlan } from '../types';

interface WeeklyPlanPageProps {
  onNavigate: (page: string) => void;
}

const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const GOAL_LABELS: Record<string, string> = {
  lose_weight: '减脂瘦身',
  gain_muscle: '增肌强体',
  maintain: '保持健康',
  improve_fitness: '提升体能',
};

const mealIconMap: Record<string, typeof Coffee> = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snack: Cookie,
};

const mealLabelMap: Record<string, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '加餐',
};

export function WeeklyPlanPage({ onNavigate }: WeeklyPlanPageProps) {
  const { weeklyPlan, setWeeklyPlan, updateDayPlan, clearWeeklyPlan } = useAppStore();
  const [activeDay, setActiveDay] = useState(0);
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [pickerMealType, setPickerMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [searchTerm, setSearchTerm] = useState('');

  const createEmptyPlan = (goal: WeeklyPlan['goal']) => {
    const plan: WeeklyPlan = {
      id: Date.now().toString(),
      name: GOAL_LABELS[goal] + '一周计划',
      goal,
      startDate: new Date().toISOString(),
      days: DAYS.map(day => ({
        day,
        breakfast: null,
        lunch: null,
        dinner: null,
        snack: null,
        exerciseIds: [],
        restDay: false,
      })),
    };
    setWeeklyPlan(plan);
  };

  // 生成智能推荐计划
  const createSmartPlan = (goal: WeeklyPlan['goal']) => {
    const breakfastMeals = meals.filter(m => m.category === 'breakfast');
    const lunchMeals = meals.filter(m => m.category === 'lunch');
    const dinnerMeals = meals.filter(m => m.category === 'dinner');
    const snackMeals = meals.filter(m => m.category === 'snack');

    // 根据目标选择动作
    let planExercises: string[] = [];
    if (goal === 'lose_weight') {
      planExercises = ['7', '9', '15', '1', '2', '8', '10'];
    } else if (goal === 'gain_muscle') {
      planExercises = ['3', '4', '5', '6', '11', '12'];
    } else if (goal === 'improve_fitness') {
      planExercises = ['7', '9', '15', '1', '3', '8', '10'];
    } else {
      planExercises = ['1', '2', '8', '9', '10'];
    }

    const days: DayPlan[] = DAYS.map((day, i) => {
      const isRestDay = i === 6; // 周日休息
      const exerciseCount = goal === 'gain_muscle' ? 4 : 3;
      const dayExercises = isRestDay ? [] : planExercises.slice(i % planExercises.length, (i % planExercises.length) + exerciseCount);

      return {
        day,
        breakfast: breakfastMeals[i % breakfastMeals.length]?.id || null,
        lunch: lunchMeals[i % lunchMeals.length]?.id || null,
        dinner: dinnerMeals[i % dinnerMeals.length]?.id || null,
        snack: snackMeals[i % snackMeals.length]?.id || null,
        exerciseIds: dayExercises,
        restDay: isRestDay,
      };
    });

    const plan: WeeklyPlan = {
      id: Date.now().toString(),
      name: GOAL_LABELS[goal] + '一周计划',
      goal,
      startDate: new Date().toISOString(),
      days,
    };
    setWeeklyPlan(plan);
  };

  const getMealName = (id: string | null) => {
    if (!id) return null;
    return meals.find(m => m.id === id)?.name || null;
  };

  const getMealCalories = (id: string | null) => {
    if (!id) return 0;
    return meals.find(m => m.id === id)?.calories || 0;
  };

  const getExerciseName = (id: string) => {
    return exercises.find(e => e.id === id)?.name || '';
  };

  const getExerciseImage = (id: string) => {
    return exercises.find(e => e.id === id)?.imageUrl || '';
  };

  const currentDay = weeklyPlan?.days[activeDay];

  const dayCalories = currentDay
    ? getMealCalories(currentDay.breakfast) +
      getMealCalories(currentDay.lunch) +
      getMealCalories(currentDay.dinner) +
      getMealCalories(currentDay.snack)
    : 0;

  const filteredMeals = meals.filter(m =>
    m.category === pickerMealType &&
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExercises = exercises.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 统计一周数据
  const weekStats = weeklyPlan?.days.reduce((acc, day) => {
    const dayCals = getMealCalories(day.breakfast) + getMealCalories(day.lunch) + getMealCalories(day.dinner) + getMealCalories(day.snack);
    acc.totalCalories += dayCals;
    acc.totalExercises += day.exerciseIds.length;
    return acc;
  }, { totalCalories: 0, totalExercises: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-20">
      <div className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="px-4 h-14 flex items-center gap-3">
          <button onClick={() => onNavigate('plans')} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-bold text-gray-800 flex-1">一周计划</h1>
          {weeklyPlan && (
            <button
              onClick={() => clearWeeklyPlan()}
              className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              重置
            </button>
          )}
        </div>
      </div>

      {!weeklyPlan ? (
        <div className="p-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-primary-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">制定你的一周计划</h2>
            <p className="text-sm text-gray-500">选择目标，智能生成饮食和训练安排</p>
          </div>

          <div className="space-y-3">
            {Object.entries(GOAL_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => createSmartPlan(key as WeeklyPlan['goal'])}
                className="w-full bg-white rounded-2xl p-4 shadow-card flex items-center gap-3 hover:shadow-hover transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-300 rounded-xl flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-800 flex items-center gap-2">
                    {label}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {key === 'lose_weight' && '低卡饮食 + 有氧训练，快速燃脂'}
                    {key === 'gain_muscle' && '高蛋白饮食 + 力量训练，增肌塑形'}
                    {key === 'maintain' && '均衡饮食 + 适度运动，保持健康'}
                    {key === 'improve_fitness' && '多样饮食 + 综合训练，提升体能'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            ))}
          </div>

          <button
            onClick={() => createEmptyPlan('maintain')}
            className="w-full mt-4 py-3 text-sm text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl hover:border-primary-300 hover:text-primary-500 transition-colors"
          >
            + 从空白计划开始自定义
          </button>
        </div>
      ) : (
        <>
          {/* 计划概览 */}
          <div className="px-4 pt-4">
            <div className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-bold text-lg">{weeklyPlan.name}</h2>
                  <p className="text-xs text-primary-100 mt-0.5">
                    目标：{GOAL_LABELS[weeklyPlan.goal]}
                  </p>
                </div>
                <Sparkles className="w-6 h-6 text-white/80" />
              </div>
              <div className="flex gap-4">
                <div className="bg-white/10 rounded-xl px-3 py-2 flex-1">
                  <p className="text-xs text-primary-100">日均摄入</p>
                  <p className="font-bold">{Math.round((weekStats?.totalCalories || 0) / 7)} 卡</p>
                </div>
                <div className="bg-white/10 rounded-xl px-3 py-2 flex-1">
                  <p className="text-xs text-primary-100">周训练次数</p>
                  <p className="font-bold">{weekStats?.totalExercises || 0} 个动作</p>
                </div>
              </div>
            </div>
          </div>

          {/* 日期选择器 */}
          <div className="px-4 mt-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {weeklyPlan.days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`flex-shrink-0 w-14 h-16 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    activeDay === i
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  <span className="text-xs">{day.day}</span>
                  {day.restDay ? (
                    <span className="text-lg mt-0.5">😴</span>
                  ) : (
                    <span className="text-lg mt-0.5">💪</span>
                  )}
                  <span className={`text-[10px] mt-0.5 ${activeDay === i ? 'text-primary-100' : 'text-gray-400'}`}>
                    {day.restDay ? '休息' : `${day.exerciseIds.length}动作`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 当日详情 */}
          {currentDay && (
            <div className="px-4 mt-4 space-y-4">
              {/* 饮食安排 */}
              <div className="bg-white rounded-2xl p-4 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-primary-500" />
                    {currentDay.day}饮食
                  </h3>
                  <span className="text-xs text-gray-500">共 {dayCalories} 卡</span>
                </div>

                <div className="space-y-2">
                  {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(mealType => {
                    const Icon = mealIconMap[mealType];
                    const mealId = currentDay[mealType];
                    const mealName = getMealName(mealId);
                    return (
                      <div
                        key={mealType}
                        onClick={() => {
                          setPickerMealType(mealType);
                          setShowMealPicker(true);
                          setSearchTerm('');
                        }}
                        className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">{mealLabelMap[mealType]}</p>
                          {mealName ? (
                            <p className="text-sm font-medium text-gray-800 truncate">{mealName}</p>
                          ) : (
                            <p className="text-sm text-gray-400">点击选择</p>
                          )}
                        </div>
                        {mealName && (
                          <span className="text-xs text-gray-400">{getMealCalories(mealId)}卡</span>
                        )}
                        {mealId ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateDayPlan(activeDay, { [mealType]: null });
                            }}
                            className="p-1"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        ) : (
                          <Plus className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 训练安排 */}
              <div className="bg-white rounded-2xl p-4 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-orange-500" />
                    {currentDay.day}训练
                  </h3>
                  <button
                    onClick={() => {
                      updateDayPlan(activeDay, { restDay: !currentDay.restDay, exerciseIds: currentDay.restDay ? [] : currentDay.exerciseIds });
                    }}
                    className={`text-xs px-2 py-1 rounded-full ${
                      currentDay.restDay ? 'bg-gray-100 text-gray-500' : 'bg-orange-50 text-orange-500'
                    }`}
                  >
                    {currentDay.restDay ? '休息日' : '训练日'}
                  </button>
                </div>

                {!currentDay.restDay && (
                  <>
                    <div className="space-y-2 mb-3">
                      {currentDay.exerciseIds.map((exId, idx) => {
                        const ex = exercises.find(e => e.id === exId);
                        return (
                          <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                            <img
                              src={ex?.imageUrl}
                              alt={ex?.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800">{ex?.name}</p>
                              <p className="text-xs text-gray-500">
                                {ex?.sets}组 × {ex?.reps} · {ex?.calories}卡
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                updateDayPlan(activeDay, {
                                  exerciseIds: currentDay.exerciseIds.filter(id => id !== exId)
                                });
                              }}
                              className="p-1"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        );
                      })}
                      {currentDay.exerciseIds.length === 0 && (
                        <p className="text-center text-sm text-gray-400 py-4">暂无训练动作，点击下方添加</p>
                      )}
                    </div>

                    <button
                      onClick={() => { setShowExercisePicker(true); setSearchTerm(''); }}
                      className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-primary-300 hover:text-primary-500 transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      添加训练动作
                    </button>
                  </>
                )}

                {currentDay.restDay && (
                  <div className="text-center py-6">
                    <p className="text-3xl mb-2">😴</p>
                    <p className="text-sm text-gray-500">今天是休息日，好好恢复吧！</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* 食物选择弹窗 */}
      {showMealPicker && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center" onClick={() => setShowMealPicker(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">选择{mealLabelMap[pickerMealType]}</h3>
                <button onClick={() => setShowMealPicker(false)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="搜索食物..."
                className="w-full px-3 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredMeals.map(meal => (
                <button
                  key={meal.id}
                  onClick={() => {
                    updateDayPlan(activeDay, { [pickerMealType]: meal.id });
                    setShowMealPicker(false);
                  }}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <img src={meal.imageUrl} alt={meal.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-800 text-sm">{meal.name}</p>
                    <p className="text-xs text-gray-500">{meal.calories}卡 · 蛋白{meal.protein}g</p>
                  </div>
                  <Plus className="w-5 h-5 text-primary-500" />
                </button>
              ))}
              {filteredMeals.length === 0 && (
                <p className="text-center text-gray-400 py-8">没有找到相关食物</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 动作选择弹窗 */}
      {showExercisePicker && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center" onClick={() => setShowExercisePicker(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">选择训练动作</h3>
                <button onClick={() => setShowExercisePicker(false)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="搜索动作..."
                className="w-full px-3 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredExercises.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => {
                    const currentIds = currentDay?.exerciseIds || [];
                    if (!currentIds.includes(ex.id)) {
                      updateDayPlan(activeDay, { exerciseIds: [...currentIds, ex.id] });
                    }
                    setShowExercisePicker(false);
                  }}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <img src={ex.imageUrl} alt={ex.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-800 text-sm">{ex.name}</p>
                    <p className="text-xs text-gray-500">{ex.category} · {ex.sets}组×{ex.reps}</p>
                  </div>
                  <Plus className="w-5 h-5 text-orange-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}