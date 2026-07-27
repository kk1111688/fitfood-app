import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subValue?: string;
  color: 'primary' | 'healthy' | 'blue' | 'purple' | 'orange';
}

const colorClasses = {
  primary: 'bg-primary-50 text-primary-600',
  healthy: 'bg-healthy-50 text-healthy-600',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
};

const iconBgClasses = {
  primary: 'bg-primary-100',
  healthy: 'bg-healthy-100',
  blue: 'bg-blue-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100',
};

export function StatCard({ icon: Icon, label, value, subValue, color }: StatCardProps) {
  return (
    <div className={`${colorClasses[color]} rounded-2xl p-4 flex items-center gap-3 card-hover`}>
      <div className={`${iconBgClasses[color]} p-2.5 rounded-xl`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-xs opacity-70">{label}</p>
        <p className="text-lg font-bold">{value}</p>
        {subValue && <p className="text-xs opacity-60">{subValue}</p>}
      </div>
    </div>
  );
}