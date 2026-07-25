import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showMenu?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false, showMenu = false }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 ${isHome ? 'bg-transparent' : 'bg-white shadow-md'}`}>
      <div className={`flex items-center justify-between px-4 h-14 ${isHome ? 'text-white' : 'text-gray-800'}`}>
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        {showMenu && (
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors">
            <Menu size={24} />
          </button>
        )}
      </div>
    </header>
  );
};
