import { Menu, User, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showUser?: boolean;
  showBell?: boolean;
}

export function Header({ title, showBack = false, onBack, showUser = false, showBell = false }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-primary-50 transition-colors"
            >
              <Menu className="w-6 h-6 text-primary-600" />
            </button>
          )}
          <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {showBell && (
            <button className="p-2 rounded-full hover:bg-primary-50 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          )}
          {showUser && (
            <button className="p-2 rounded-full hover:bg-primary-50 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}