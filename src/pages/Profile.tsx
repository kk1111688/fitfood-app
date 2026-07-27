import { User, Flame, Target, Calendar, Settings, HelpCircle, Share2, ChevronRight, Edit3 } from 'lucide-react';
import { userProfile } from '../data/plans';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const menuItems = [
  { icon: Target, label: '我的目标', value: '减脂', arrow: true },
  { icon: Calendar, label: '训练记录', value: '28次', arrow: true },
  { icon: Flame, label: '累计消耗', value: '12500卡', arrow: true },
  { icon: Settings, label: '设置', arrow: true },
  { icon: HelpCircle, label: '帮助与反馈', arrow: true },
  { icon: Share2, label: '分享应用', arrow: true },
];

const stats = [
  { label: '连续打卡', value: `${userProfile.streak}天`, color: 'primary' as const },
  { label: '训练次数', value: userProfile.totalWorkouts, color: 'healthy' as const },
  { label: '消耗卡路里', value: userProfile.totalCaloriesBurned, color: 'orange' as const },
];

export function Profile({ onNavigate }: ProfileProps) {
  const bmi = userProfile.weight / Math.pow(userProfile.height / 100, 2);
  const bmiStatus = bmi < 18.5 ? '偏瘦' : bmi < 24 ? '正常' : bmi < 28 ? '超重' : '肥胖';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-20">
      <div className="bg-gradient-to-r from-primary-500 to-primary-400 text-white px-4 pt-16 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">个人中心</h1>
          <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{userProfile.name}</h2>
            <p className="text-primary-100 text-sm">加入于 {userProfile.joinDate}</p>
          </div>
          <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-gray-800 mb-4">身体数据</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">{userProfile.height}</p>
              <p className="text-xs text-gray-500">身高(cm)</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">{userProfile.weight}</p>
              <p className="text-xs text-gray-500">体重(kg)</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">{bmi.toFixed(1)}</p>
              <p className="text-xs text-gray-500">BMI</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-primary-600">{bmiStatus}</p>
              <p className="text-xs text-gray-500">状态</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">运动统计</h3>
            <button className="text-sm text-primary-600 flex items-center gap-1">
              查看详情 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  if (item.label === '训练记录') onNavigate('plans');
                }}
                className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">{item.label}</p>
                  {item.value && <p className="text-xs text-gray-500">{item.value}</p>}
                </div>
                {item.arrow && <ChevronRight className="w-5 h-5 text-gray-400" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-6">
        <p className="text-center text-sm text-gray-400">
          燃脂食堂 v1.0.0
        </p>
      </div>
    </div>
  );
}