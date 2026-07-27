import { Home, Dumbbell, Utensils, Calendar, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'exercises', label: '动作', icon: Dumbbell },
  { id: 'meals', label: '食谱', icon: Utensils },
  { id: 'plans', label: '计划', icon: Calendar },
  { id: 'profile', label: '我的', icon: User },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
      <div className="max-w-md mx-auto flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}