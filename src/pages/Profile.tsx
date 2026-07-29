import { User, Flame, Target, Calendar, Settings, Heart, ChevronRight, Edit3, TrendingUp, Award, Clock, Trophy } from 'lucide-react';
import { useAppStore } from '../store/appStore';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const goalLabels: Record<string, string> = {
  lose_weight: '减脂瘦身',
  gain_muscle: '增肌健体',
  maintain: '保持健康',
  improve_fitness: '提升体能',
};

const activityLabels: Record<string, string> = {
  sedentary: '久坐不动',
  light: '轻度活动',
  moderate: '中度活动',
  active: '高度活动',
  very_active: '极度活动',
};

export function Profile({ onNavigate }: ProfileProps) {
  const { user, favoriteExercises, favoriteMeals, workoutHistory, weightHistory } = useAppStore();
  const bmi = user.weight / Math.pow(user.height / 100, 2);
  const bmiStatus = bmi < 18.5 ? '偏瘦' : bmi < 24 ? '正常' : bmi < 28 ? '超重' : '肥胖';
  const bmiColor = bmi < 18.5 ? 'text-blue-500' : bmi < 24 ? 'text-healthy-500' : bmi < 28 ? 'text-orange-500' : 'text-red-500';

  const stats = [
    { label: '连续打卡', value: `${user.streak}天`, color: 'primary' as const },
    { label: '训练次数', value: user.totalWorkouts, color: 'healthy' as const },
    { label: '消耗卡路里', value: user.totalCaloriesBurned, color: 'orange' as const },
  ];

  const weeklyStats = {
    workouts: workoutHistory.length,
    calories: workoutHistory.reduce((sum, r) => sum + r.caloriesBurned, 0),
    duration: workoutHistory.reduce((sum, r) => sum + r.duration, 0),
  };

  const menuItems = [
    { icon: Heart, label: '我的收藏', value: `${favoriteExercises.length + favoriteMeals.length}项`, action: () => onNavigate('favorites') },
    { icon: Calendar, label: '训练记录', value: `${workoutHistory.length}次训练`, action: () => onNavigate('history') },
    { icon: TrendingUp, label: '体重记录', value: weightHistory.length > 0 ? `${weightHistory.length}条记录` : '暂无记录', action: () => {} },
    { icon: Award, label: '成就徽章', value: '', action: () => {} },
    { icon: Settings, label: '设置', value: '', action: () => onNavigate('edit-profile') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-28">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-400 to-emerald-400 text-white px-4 pt-14 pb-8">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold">个人中心</h1>
          <button
            onClick={() => onNavigate('edit-profile')}
            className="p-2 rounded-full bg-white/25 backdrop-blur-sm hover:bg-white/35 transition-all active:scale-95"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative flex items-center gap-4">
          <div className="w-20 h-20 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-primary-100 text-sm">{user.age}岁 · {user.gender === 'male' ? '男' : '女'}</p>
            <p className="text-primary-100 text-xs">加入于 {user.joinDate}</p>
          </div>
          <button
            onClick={() => onNavigate('edit-profile')}
            className="p-2 rounded-full bg-white/25 backdrop-blur-sm hover:bg-white/35 transition-all active:scale-95"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">身体数据</h3>
            <button
              onClick={() => onNavigate('edit-profile')}
              className="text-sm text-primary-600 flex items-center gap-1"
            >
              编辑 <Edit3 className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">{user.height}</p>
              <p className="text-xs text-gray-500">身高(cm)</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">{user.weight}</p>
              <p className="text-xs text-gray-500">体重(kg)</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">{bmi.toFixed(1)}</p>
              <p className="text-xs text-gray-500">BMI</p>
            </div>
            <div className="text-center">
              <p className={`text-lg font-bold ${bmiColor}`}>{bmiStatus}</p>
              <p className="text-xs text-gray-500">状态</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-gray-800 mb-3">运动统计</h3>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color === 'primary' ? 'bg-primary-100' : stat.color === 'healthy' ? 'bg-healthy-100' : 'bg-orange-100'} mb-2`}>
                  <Flame className={`w-6 h-6 ${stat.color === 'primary' ? 'text-primary-500' : stat.color === 'healthy' ? 'text-healthy-500' : 'text-orange-500'}`} />
                </div>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-gray-800 mb-3">本周数据</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-primary-50 rounded-xl p-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-5 h-5 text-primary-500" />
              </div>
              <p className="text-lg font-bold text-gray-800">{weeklyStats.workouts}</p>
              <p className="text-xs text-gray-500">训练次数</p>
            </div>
            <div className="text-center bg-orange-50 rounded-xl p-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-lg font-bold text-gray-800">{weeklyStats.calories}</p>
              <p className="text-xs text-gray-500">消耗(卡)</p>
            </div>
            <div className="text-center bg-healthy-50 rounded-xl p-3">
              <div className="w-10 h-10 bg-healthy-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-healthy-500" />
              </div>
              <p className="text-lg font-bold text-gray-800">{weeklyStats.duration}</p>
              <p className="text-xs text-gray-500">总时长(分)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-gray-800 mb-3">目标设置</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">健身目标</p>
              <p className="text-sm font-semibold text-gray-800">{goalLabels[user.goal]}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">活动水平</p>
              <p className="text-sm font-semibold text-gray-800">{activityLabels[user.activityLevel]}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 col-span-2">
              <p className="text-xs text-gray-500 mb-1">每日卡路里目标</p>
              <p className="text-sm font-semibold text-primary-600">{user.targetCalories} 卡路里</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">{item.label}</p>
                  {item.value && <p className="text-xs text-gray-500">{item.value}</p>}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-6">
        <p className="text-center text-sm text-gray-400">
          燃脂食堂 v2.0.0
        </p>
      </div>
    </div>
  );
}