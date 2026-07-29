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
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-md mx-auto px-4 pb-3 pt-2 pointer-events-auto">
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(20,184,166,0.18)] border border-white/60 flex items-center justify-around h-16 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center flex-1 h-full transition-transform active:scale-90"
                aria-label={tab.label}
              >
                <div
                  className={`relative flex items-center justify-center px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-primary-50' : ''
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-primary-600' : 'text-gray-400'
                    }`}
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                </div>
                <span
                  className={`text-[10px] mt-0.5 transition-colors ${
                    isActive ? 'text-primary-600 font-semibold' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
