import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { ExerciseCard } from '../components/ExerciseCard';
import { exercises, exerciseCategories } from '../data/exercises';

interface ExercisesProps {
  onNavigate: (page: string) => void;
}

export function Exercises({ onNavigate }: ExercisesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-20">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 pt-16 pb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-4">动作库</h1>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索动作..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {exerciseCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">共 {filteredExercises.length} 个动作</span>
          <button className="flex items-center gap-1 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            筛选
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} onClick={() => onNavigate(`exercise/${exercise.id}`)} />
          ))}
        </div>
        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">没有找到相关动作</p>
          </div>
        )}
      </div>
    </div>
  );
}