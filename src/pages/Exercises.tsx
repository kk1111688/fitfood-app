import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Header } from '../components/Header';
import { ExerciseCard } from '../components/ExerciseCard';
import { useAppStore } from '../store/appStore';
import { categories } from '../data/mockData';

export const Exercises: React.FC = () => {
  const navigate = useNavigate();
  const { exercises } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExercises = exercises.filter(exercise => {
    const matchCategory = selectedCategory === '全部' || exercise.category === selectedCategory;
    const matchSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const allCategories = ['全部', ...categories];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="动作库" />
      
      <div className="px-4 py-4">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="搜索动作..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800">
            {selectedCategory === '全部' ? '全部动作' : `${selectedCategory}训练`}
          </h3>
          <span className="text-sm text-gray-400">{filteredExercises.length}个动作</span>
        </div>

        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onClick={() => navigate(`/exercises/${exercise.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Filter className="text-gray-300" size={48} />
            <p className="text-gray-400 mt-4">没有找到匹配的动作</p>
          </div>
        )}
      </div>
    </div>
  );
};
