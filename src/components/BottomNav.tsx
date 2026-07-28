import { Home, Dumbbell, Utensils, Users, User, Calendar } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'exercises', label: '动作', icon: Dumbbell },
  { id: 'plans', label: '计划', icon: Calendar },
  { id: 'meals', label: '食谱', icon: Utensils },
  { id: 'community', label: '社区', icon: Users },
  { id: 'profile', label: '我的', icon: User },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
      <div className="max-w-md mx-auto flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCenter = tab.id === 'plans';
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isCenter
                  ? isActive 
                    ? 'text-primary-600' 
                    : 'text-gray-400'
                  : isActive 
                    ? 'text-primary-600' 
                    : 'text-gray-400'
              }`}
            >
              <div className={`relative ${isCenter ? '-mt-5' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCenter ? 'bg-gradient-to-br from-primary-500 to-primary-400' : ''} ${isCenter && !isActive ? 'bg-gray-100' : ''}`}>
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''} ${isCenter ? 'text-white' : ''}`} />
                </div>
              </div>
              <span className={`text-xs font-medium mt-0.5 ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}