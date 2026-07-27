import { useState } from 'react';
import { ArrowLeft, Check, User, Ruler, Weight, Calendar, Target, Activity } from 'lucide-react';
import { useAppStore } from '../store/appStore';

interface EditProfileProps {
  onBack: () => void;
}

export function EditProfile({ onBack }: EditProfileProps) {
  const { user, updateUser } = useAppStore();
  const [form, setForm] = useState({
    name: user.name,
    height: user.height,
    weight: user.weight,
    age: user.age,
    gender: user.gender,
    activityLevel: user.activityLevel,
    goal: user.goal,
    targetCalories: user.targetCalories,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUser(form);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onBack();
    }, 1000);
  };

  const activityOptions = [
    { value: 'sedentary', label: '久坐不动' },
    { value: 'light', label: '轻度活动' },
    { value: 'moderate', label: '中度活动' },
    { value: 'active', label: '高度活动' },
    { value: 'very_active', label: '极度活动' },
  ];

  const goalOptions = [
    { value: 'lose_weight', label: '减脂瘦身' },
    { value: 'gain_muscle', label: '增肌健体' },
    { value: 'maintain', label: '保持健康' },
    { value: 'improve_fitness', label: '提升体能' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <span className="font-bold text-gray-800">编辑个人信息</span>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-primary-500 text-white rounded-full text-sm font-medium"
          >
            {saved ? '已保存' : '保存'}
          </button>
        </div>
      </div>

      <div className="pt-16 px-4 space-y-4">
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary-500" />
            <h3 className="font-bold text-gray-800">基本信息</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">昵称</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Ruler className="w-4 h-4" /> 身高(cm)
                </label>
                <input
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: Number(e.target.value) })}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Weight className="w-4 h-4" /> 体重(kg)
                </label>
                <input
                  type="number"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> 年龄
                </label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">性别</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setForm({ ...form, gender: 'male' })}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium ${
                      form.gender === 'male' ? 'bg-primary-500 text-white' : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    男
                  </button>
                  <button
                    onClick={() => setForm({ ...form, gender: 'female' })}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium ${
                      form.gender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    女
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-healthy-500" />
            <h3 className="font-bold text-gray-800">活动水平</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {activityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setForm({ ...form, activityLevel: option.value as typeof form.activityLevel })}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  form.activityLevel === option.value
                    ? 'bg-healthy-50 text-healthy-600 border-2 border-healthy-200'
                    : 'bg-gray-50 text-gray-600 border-2 border-transparent'
                }`}
              >
                <span>{option.label}</span>
                {form.activityLevel === option.value && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-800">健身目标</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {goalOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setForm({ ...form, goal: option.value as typeof form.goal })}
                className={`px-4 py-3 rounded-xl text-sm font-medium ${
                  form.goal === option.value
                    ? 'bg-orange-50 text-orange-600 border-2 border-orange-200'
                    : 'bg-gray-50 text-gray-600 border-2 border-transparent'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary-500" />
            <h3 className="font-bold text-gray-800">每日卡路里目标</h3>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1200"
              max="3500"
              step="100"
              value={form.targetCalories}
              onChange={(e) => setForm({ ...form, targetCalories: Number(e.target.value) })}
              className="flex-1 accent-primary-500"
            />
            <span className="text-lg font-bold text-primary-600 whitespace-nowrap">
              {form.targetCalories}卡
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            根据你的活动水平和目标，建议每日摄入 {form.targetCalories} 卡路里
          </p>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl py-3.5 font-bold shadow-soft flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          {saved ? '保存成功！' : '保存修改'}
        </button>
      </div>

      {saved && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2">
          <Check className="w-5 h-5 text-healthy-400" />
          <span>个人信息已更新</span>
        </div>
      )}
    </div>
  );
}