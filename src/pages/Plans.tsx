import { useState } from 'react';
import { Filter, ArrowRight, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { PlanCard } from '../components/PlanCard';
import { workoutPlans } from '../data/plans';

interface PlansProps {
  onNavigate: (page: string) => void;
}

const levels = ['全部', '入门', '进阶', '高级'];

const levelMap: Record<string, string> = {
  '全部': '全部',
  '入门': 'beginner',
  '进阶': 'intermediate',
  '高级': 'advanced',
};

export function Plans({ onNavigate }: PlansProps) {
  const [selectedLevel, setSelectedLevel] = useState('全部');

  const filteredPlans = workoutPlans.filter(plan => 
    selectedLevel === '全部' || plan.level === levelMap[selectedLevel]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-20">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 pt-16 pb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-4">训练计划</h1>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedLevel === level
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <button
          onClick={() => onNavigate('weekly-plan')}
          className="w-full mb-4 bg-gradient-to-r from-primary-500 to-healthy-400 rounded-2xl p-4 text-white flex items-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-bold flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              一周饮食+训练计划
            </div>
            <p className="text-sm opacity-90">智能生成一周饮食和训练安排</p>
          </div>
          <ArrowRight className="w-5 h-5 text-white/80" />
        </button>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">共 {filteredPlans.length} 个计划</span>
          <button className="flex items-center gap-1 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            筛选
          </button>
        </div>

        <div className="space-y-4">
          {filteredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onClick={() => onNavigate(`plan/${plan.id}`)} />
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">没有找到相关计划</p>
          </div>
        )}
      </div>

      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-gray-800 mb-3">今日完成情况</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">全身入门计划</span>
              <button className="flex items-center gap-1 text-sm text-primary-600">
                开始 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">核心强化计划</span>
              <div className="flex items-center gap-1 text-sm text-healthy-600">
                <CheckCircle className="w-4 h-4" />
                已完成
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}