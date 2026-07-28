import { CommunityUser, Post, Topic } from '../types';

export const communityUsers: CommunityUser[] = [
  {
    id: 'u1',
    name: '健身达人小明',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    bio: '坚持健身3年，从120斤减到90斤',
    followers: 1280,
    following: 156
  },
  {
    id: 'u2',
    name: '营养师小红',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    bio: '专业营养师，分享健康饮食',
    followers: 3560,
    following: 89
  },
  {
    id: 'u3',
    name: '跑步爱好者',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    bio: '每天5公里，坚持第365天',
    followers: 890,
    following: 234
  },
  {
    id: 'u4',
    name: '瑜伽教练',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    bio: '让身体柔软起来',
    followers: 2100,
    following: 345
  },
  {
    id: 'u5',
    name: '增肌狂魔',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    bio: '卧推150kg，目标200kg',
    followers: 1850,
    following: 120
  }
];

export const topics: Topic[] = [
  { id: 't1', title: '减脂打卡', posts: 12580, icon: '🔥' },
  { id: 't2', title: '增肌日常', posts: 8960, icon: '💪' },
  { id: 't3', title: '健康食谱', posts: 15230, icon: '🥗' },
  { id: 't4', title: '运动装备', posts: 6780, icon: '👟' },
  { id: 't5', title: '健身心得', posts: 9450, icon: '📝' },
  { id: 't6', title: '身材对比', posts: 11200, icon: '📸' }
];

export const initialPosts: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    content: '今天完成了5公里晨跑！配速6分钟，比昨天快了10秒。坚持就是胜利，每天进步一点点！💪',
    images: ['https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop'],
    likes: 156,
    comments: [
      { id: 'c1', userId: 'u3', content: '太棒了！我今天也跑了5公里，一起加油！', createdAt: '2026-07-28T06:30:00Z', likes: 5 },
      { id: 'c2', userId: 'u5', content: '配速很不错，继续保持！', createdAt: '2026-07-28T07:00:00Z', likes: 2 }
    ],
    createdAt: '2026-07-28T05:45:00Z',
    tags: ['减脂打卡', '晨跑'],
    type: 'workout'
  },
  {
    id: 'p2',
    userId: 'u2',
    content: '分享一份超简单的减脂早餐！燕麦粥加鸡蛋和牛油果，营养均衡还好吃。蛋白充足，碳水适中，脂肪健康， perfect！',
    images: ['https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop'],
    likes: 289,
    comments: [
      { id: 'c3', userId: 'u4', content: '看起来好好吃，明天试试！', createdAt: '2026-07-28T08:00:00Z', likes: 3 }
    ],
    createdAt: '2026-07-28T07:30:00Z',
    tags: ['健康食谱', '减脂餐'],
    type: 'meal'
  },
  {
    id: 'p3',
    userId: 'u5',
    content: '本周训练总结：深蹲从100kg进步到120kg，硬拉突破150kg！坚持了3个月终于有回报了。兄弟们，训练一定要循序渐进，不要急于求成！',
    images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'],
    likes: 412,
    comments: [
      { id: 'c4', userId: 'u1', content: '进步好大！恭喜恭喜！', createdAt: '2026-07-28T09:00:00Z', likes: 8 },
      { id: 'c5', userId: 'u3', content: '请问训练频率是怎样的？', createdAt: '2026-07-28T09:15:00Z', likes: 4 },
      { id: 'c6', userId: 'u5', content: '每周4练，腿推拉各一次，加一次辅助训练', createdAt: '2026-07-28T09:30:00Z', likes: 6 }
    ],
    createdAt: '2026-07-28T08:45:00Z',
    tags: ['增肌日常', '训练分享'],
    type: 'workout'
  },
  {
    id: 'p4',
    userId: 'u4',
    content: '今天给大家分享一个5分钟晨间瑜伽序列，帮助激活身体，让一天充满能量！适合所有水平，没有任何基础也能做哦～',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'],
    likes: 198,
    comments: [],
    createdAt: '2026-07-28T10:00:00Z',
    tags: ['健身心得', '瑜伽'],
    type: 'tip'
  },
  {
    id: 'p5',
    userId: 'u1',
    content: '3个月身材对比！从肚子明显到现在有了初步的马甲线，体重减了15斤。感谢坚持的自己，也感谢大家的鼓励！继续加油！💪💪💪',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
    ],
    likes: 892,
    comments: [
      { id: 'c7', userId: 'u2', content: '变化太大了！太激励人了！', createdAt: '2026-07-28T11:00:00Z', likes: 15 },
      { id: 'c8', userId: 'u3', content: '请问饮食是怎么控制的？', createdAt: '2026-07-28T11:15:00Z', likes: 9 },
      { id: 'c9', userId: 'u1', content: '主要是控制碳水摄入，多吃蛋白质和蔬菜', createdAt: '2026-07-28T11:30:00Z', likes: 12 }
    ],
    createdAt: '2026-07-28T10:30:00Z',
    tags: ['身材对比', '减脂打卡'],
    type: 'progress'
  },
  {
    id: 'p6',
    userId: 'u2',
    content: '科普时间：很多健身的朋友会忽视蛋白质的摄入。一般来说，每公斤体重需要1.6-2克蛋白质。分享一张常见食物的蛋白质含量表，记得保存哦！',
    images: ['https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop'],
    likes: 356,
    comments: [
      { id: 'c10', userId: 'u5', content: '干货满满！收藏了', createdAt: '2026-07-28T12:00:00Z', likes: 7 }
    ],
    createdAt: '2026-07-28T11:45:00Z',
    tags: ['健身心得', '营养知识'],
    type: 'tip'
  },
  {
    id: 'p7',
    userId: 'u3',
    content: '今天跑完步之后做了30分钟的拉伸放松。很多人跑完就走，其实拉伸很重要，可以减少肌肉酸痛，预防受伤。大家一定要重视起来！',
    images: ['https://images.unsplash.com/photo-1552286450-4a669f880062?w=400&h=300&fit=crop'],
    likes: 123,
    comments: [],
    createdAt: '2026-07-28T13:00:00Z',
    tags: ['健身心得', '跑步'],
    type: 'tip'
  },
  {
    id: 'p8',
    userId: 'u5',
    content: '分享我的训练装备：运动袜、护膝、弹力带。这些小东西虽然不贵，但对保护身体和提高训练效果很有帮助。大家都用什么装备？',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop'],
    likes: 234,
    comments: [
      { id: 'c11', userId: 'u4', content: '我也推荐弹力带，居家训练神器', createdAt: '2026-07-28T14:00:00Z', likes: 5 }
    ],
    createdAt: '2026-07-28T13:30:00Z',
    tags: ['运动装备'],
    type: 'tip'
  }
];