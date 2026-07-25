import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Sun, Sunset, Moon, Coffee } from 'lucide-react';
import { Header } from '../components/Header';
import { MealCard } from '../components/MealCard';
import { useAppStore } from '../store/appStore';

const mealTypes = ['全部', '减脂', '增肌', '均衡'];
const mealTimes = ['全部', '早餐', '午餐', '晚餐', '加餐'];

const mealTimeIcons: Record<string, React.ElementType> = {
  '早餐': Sun,
  '午餐': Sun,
  '晚餐': Moon,
  '加餐': Coffee,
};

export const Meals: React.FC = () => {
  const navigate = useNavigate();
  const { meals } = useAppStore();
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [selectedTime, setSelectedTime] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeals = meals.filter(meal => {
    const matchType = selectedType === '全部' || meal.type === selectedType;
    const matchTime = selectedTime === '全部' || meal.mealTime === selectedTime;
    const matchSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchTime && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="饮食推荐" />
      
      <div className="px-4 py-4">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="搜索食谱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-healthy-500"
          />
        </div>

        <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {mealTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedType === type
                  ? 'bg-healthy-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {mealTimes.map((time) => {
            const Icon = mealTimeIcons[time] || Sun;
            return (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedTime === time
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                {time}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800">
            {selectedType === '全部' ? '' : selectedType}{selectedTime === '全部' ? '' : selectedTime}食谱
          </h3>
          <span className="text-sm text-gray-400">{filteredMeals.length}个食谱</span>
        </div>

        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onClick={() => navigate(`/meals/${meal.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Filter className="text-gray-300" size={48} />
            <p className="text-gray-400 mt-4">没有找到匹配的食谱</p>
          </div>
        )}
      </div>

      <div className="px-4 mt-6">
        <div className="bg-gradient-to-r from-healthy-500 to-green-400 rounded-2xl p-4 text-white">
          <h3 className="font-bold text-lg mb-2">营养小贴士</h3>
          <p className="text-sm opacity-90">
            合理搭配蛋白质、碳水和脂肪，每餐保持营养均衡。早餐要吃好，午餐要吃饱，晚餐要吃少。
          </p>
        </div>
      </div>
    </div>
  );
};
