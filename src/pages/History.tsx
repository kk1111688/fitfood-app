import { ArrowLeft, Calendar, Flame, Clock, Dumbbell, ChevronRight, Trash2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';

interface HistoryProps {
  onNavigate: (page: string) => void;
}

export function History({ onNavigate }: HistoryProps) {
  const { workoutHistory } = useAppStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);
    
    if (date.toDateString() === today.toDateString()) {
      return '今天';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨天';
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  };

  const groupByDate = () => {
    const groups: Record<string, typeof workoutHistory> = {};
    workoutHistory.forEach(record => {
      const dateKey = formatDate(record.date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(record);
    });
    return groups;
  };

  const groupedHistory = groupByDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-20">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 pt-16 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('profile')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">训练记录</h1>
          </div>
        </div>
      </div>

      {workoutHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">还没有训练记录</h3>
          <p className="text-gray-500 text-center mb-6">开始你的第一次训练吧！</p>
          <button
            onClick={() => onNavigate('plans')}
            className="bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-xl px-6 py-3 font-medium"
          >
            选择训练计划
          </button>
        </div>
      ) : (
        <div className="px-4 py-4 space-y-6">
          {Object.entries(groupedHistory).map(([date, records]) => {
            const totalCalories = records.reduce((sum, r) => sum + r.caloriesBurned, 0);
            const totalDuration = records.reduce((sum, r) => sum + r.duration, 0);
            const totalExercises = records.reduce((sum, r) => sum + r.exercisesCompleted, 0);

            return (
              <div key={date}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800">{date}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      {totalCalories}卡
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary-500" />
                      {totalDuration}分钟
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  {records.map((record, index) => (
                    <div
                      key={record.id}
                      className={`p-4 ${index > 0 ? 'border-t border-gray-50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="w-6 h-6 text-primary-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-800">{record.planName}</h4>
                            <span className="text-xs text-gray-400">
                              {new Date(record.date).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1 text-sm text-orange-500">
                              <Flame className="w-4 h-4" />
                              {record.caloriesBurned}卡
                            </span>
                            <span className="flex items-center gap-1 text-sm text-primary-500">
                              <Clock className="w-4 h-4" />
                              {record.duration}分钟
                            </span>
                            <span className="flex items-center gap-1 text-sm text-healthy-500">
                              <Dumbbell className="w-4 h-4" />
                              {record.exercisesCompleted}个动作
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}