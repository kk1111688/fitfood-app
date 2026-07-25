import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subValue?: string;
  color: 'primary' | 'healthy' | 'blue' | 'purple';
}

const colorClasses = {
  primary: 'bg-primary-50 text-primary-600',
  healthy: 'bg-healthy-50 text-healthy-600',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
};

const iconBgClasses = {
  primary: 'bg-primary-100',
  healthy: 'bg-healthy-100',
  blue: 'bg-blue-100',
  purple: 'bg-purple-100',
};

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  subValue,
  color,
}) => {
  return (
    <div className={`${colorClasses[color]} rounded-2xl p-4 flex items-center gap-3`}>
      <div className={`${iconBgClasses[color]} w-12 h-12 rounded-xl flex items-center justify-center`}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <p className="text-sm opacity-80">{label}</p>
        <p className="text-xl font-bold">{value}</p>
        {subValue && <p className="text-xs opacity-60">{subValue}</p>}
      </div>
    </div>
  );
};
