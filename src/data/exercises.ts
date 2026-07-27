import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: '深蹲',
    category: '腿部训练',
    targetMuscles: ['股四头肌', '臀大肌', '腘绳肌'],
    difficulty: 'beginner',
    equipment: '无',
    description: '深蹲是最基础也是最有效的腿部训练动作，能够锻炼到大腿、臀部和核心肌群。',
    instructions: [
      '双脚与肩同宽站立，脚尖微微向外',
      '保持背部挺直，核心收紧',
      '慢慢弯曲膝盖，向下蹲直到大腿与地面平行',
      '用力蹬地回到起始位置'
    ],
    sets: 4,
    reps: '12-15',
    restTime: '60秒',
    calories: 80,
    imageUrl: 'https://picsum.photos/seed/squat/400/300',
    gifUrl: 'https://media.giphy.com/media/xT0GqzvBaLRh4N98rG/giphy.gif'
  },
  {
    id: '2',
    name: '俯卧撑',
    category: '胸部训练',
    targetMuscles: ['胸大肌', '三头肌', '肩部'],
    difficulty: 'beginner',
    equipment: '无',
    description: '俯卧撑是经典的上半身训练动作，锻炼胸部、手臂和核心力量。',
    instructions: [
      '双手撑地，与肩同宽',
      '身体呈一条直线，核心收紧',
      '慢慢弯曲肘部，下降身体',
      '用力推起回到起始位置'
    ],
    sets: 4,
    reps: '10-15',
    restTime: '45秒',
    calories: 60,
    imageUrl: 'https://picsum.photos/seed/pushup/400/300',
    gifUrl: 'https://media.giphy.com/media/xT5LMHxhOfWTuaXg9i/giphy.gif'
  },
  {
    id: '3',
    name: '引体向上',
    category: '背部训练',
    targetMuscles: ['背阔肌', '二头肌', '肩部'],
    difficulty: 'advanced',
    equipment: '单杠',
    description: '引体向上是锻炼背部最有效的动作之一，需要较强的上肢力量。',
    instructions: [
      '双手握住单杠，掌心向前',
      '身体自然下垂，核心收紧',
      '用力拉起身体，直到下巴超过单杠',
      '缓慢下降回到起始位置'
    ],
    sets: 3,
    reps: '6-10',
    restTime: '90秒',
    calories: 75,
    imageUrl: 'https://picsum.photos/seed/pullup/400/300',
    gifUrl: 'https://media.giphy.com/media/3ohzdXzYgN0X8Q4G1i/giphy.gif'
  },
  {
    id: '4',
    name: '卧推',
    category: '胸部训练',
    targetMuscles: ['胸大肌', '三头肌', '三角肌'],
    difficulty: 'intermediate',
    equipment: '杠铃/哑铃',
    description: '卧推是健身房经典动作，能够有效锻炼胸部肌肉。',
    instructions: [
      '仰卧在卧推凳上，双手握杠铃',
      '杠铃放在胸部上方，手臂伸直',
      '慢慢放下杠铃到胸部',
      '用力推起杠铃回到起始位置'
    ],
    sets: 4,
    reps: '8-12',
    restTime: '90秒',
    calories: 100,
    imageUrl: 'https://picsum.photos/seed/benchpress/400/300',
    gifUrl: 'https://media.giphy.com/media/3o7TKz3Y5xY005dV3i/giphy.gif'
  },
  {
    id: '5',
    name: '硬拉',
    category: '背部训练',
    targetMuscles: ['臀大肌', '腘绳肌', '下背部'],
    difficulty: 'intermediate',
    equipment: '杠铃',
    description: '硬拉是全身性复合动作，能够锻炼到多个肌群。',
    instructions: [
      '双脚与肩同宽站立，杠铃放在脚前',
      '屈膝俯身，双手握住杠铃',
      '保持背部挺直，用力拉起杠铃',
      '缓慢放下杠铃回到起始位置'
    ],
    sets: 4,
    reps: '6-10',
    restTime: '120秒',
    calories: 120,
    imageUrl: 'https://picsum.photos/seed/deadlift/400/300',
    gifUrl: 'https://media.giphy.com/media/3ohjV2a6sHhKd0Y3fO/giphy.gif'
  },
  {
    id: '6',
    name: '哑铃肩推',
    category: '肩部训练',
    targetMuscles: ['三角肌', '三头肌'],
    difficulty: 'intermediate',
    equipment: '哑铃',
    description: '哑铃肩推是锻炼肩部的经典动作，能够全面发展肩部肌肉。',
    instructions: [
      '坐姿或站姿，双手握哑铃举到肩部',
      '保持核心收紧，缓慢向上推起',
      '到达顶点后缓慢下降',
      '重复动作'
    ],
    sets: 4,
    reps: '10-12',
    restTime: '60秒',
    calories: 55,
    imageUrl: 'https://picsum.photos/seed/shoulderpress/400/300',
    gifUrl: 'https://media.giphy.com/media/l41lI3vW8S7pA5f8I/giphy.gif'
  },
  {
    id: '7',
    name: '箭步蹲',
    category: '腿部训练',
    targetMuscles: ['股四头肌', '臀大肌', '核心'],
    difficulty: 'intermediate',
    equipment: '哑铃/无',
    description: '箭步蹲能够有效锻炼腿部和臀部肌肉，对平衡能力也有帮助。',
    instructions: [
      '站姿，双脚与肩同宽',
      '向前迈出一步，弯曲膝盖',
      '前腿大腿与地面平行，后腿膝盖接近地面',
      '用力蹬地回到起始位置，换腿'
    ],
    sets: 3,
    reps: '10-12/腿',
    restTime: '60秒',
    calories: 70,
    imageUrl: 'https://picsum.photos/seed/lunge/400/300',
    gifUrl: 'https://media.giphy.com/media/xT8qB5Q7gD04mN7YKo/giphy.gif'
  },
  {
    id: '8',
    name: '平板支撑',
    category: '核心训练',
    targetMuscles: ['腹横肌', '核心肌群'],
    difficulty: 'beginner',
    equipment: '无',
    description: '平板支撑是锻炼核心力量的有效动作，无需任何器械。',
    instructions: [
      '双手撑地，与肩同宽',
      '身体呈一条直线，核心收紧',
      '保持姿势，呼吸均匀',
      '达到目标时间后放松'
    ],
    sets: 3,
    reps: '30-60秒',
    restTime: '30秒',
    calories: 30,
    imageUrl: 'https://picsum.photos/seed/plank/400/300',
    gifUrl: 'https://media.giphy.com/media/xT8qB5Q7gD04mN7YKo/giphy.gif'
  },
  {
    id: '9',
    name: '卷腹',
    category: '核心训练',
    targetMuscles: ['腹直肌', '腹斜肌'],
    difficulty: 'beginner',
    equipment: '无',
    description: '卷腹是锻炼腹部肌肉的经典动作，比仰卧起坐更安全。',
    instructions: [
      '仰卧，膝盖弯曲，双脚平放',
      '双手放在脑后，核心收紧',
      '慢慢抬起上半身，直到肩膀离开地面',
      '缓慢放下回到起始位置'
    ],
    sets: 4,
    reps: '15-20',
    restTime: '30秒',
    calories: 40,
    imageUrl: 'https://picsum.photos/seed/crunch/400/300',
    gifUrl: 'https://media.giphy.com/media/3ohjzDZ9y4YbP9bCew/giphy.gif'
  },
  {
    id: '10',
    name: '臀桥',
    category: '臀部训练',
    targetMuscles: ['臀大肌', '腘绳肌'],
    difficulty: 'beginner',
    equipment: '无',
    description: '臀桥是锻炼臀部的基础动作，适合在家中进行。',
    instructions: [
      '仰卧，膝盖弯曲，双脚平放',
      '双臂放在身体两侧，掌心向下',
      '用力收紧臀部，抬起髋部',
      '保持几秒后缓慢放下'
    ],
    sets: 4,
    reps: '15-20',
    restTime: '45秒',
    calories: 45,
    imageUrl: 'https://picsum.photos/seed/glute/400/300',
    gifUrl: 'https://media.giphy.com/media/l41lI3vW8S7pA5f8I/giphy.gif'
  },
  {
    id: '11',
    name: '哑铃弯举',
    category: '手臂训练',
    targetMuscles: ['二头肌'],
    difficulty: 'beginner',
    equipment: '哑铃',
    description: '哑铃弯举是锻炼二头肌的经典动作。',
    instructions: [
      '站姿，双手握哑铃，手臂自然下垂',
      '保持上臂不动，弯曲肘部',
      '将哑铃举到肩膀位置',
      '缓慢放下回到起始位置'
    ],
    sets: 4,
    reps: '12-15',
    restTime: '45秒',
    calories: 35,
    imageUrl: 'https://picsum.photos/seed/bicepcurl/400/300',
    gifUrl: 'https://media.giphy.com/media/xT8qB5Q7gD04mN7YKo/giphy.gif'
  },
  {
    id: '12',
    name: '三头肌下压',
    category: '手臂训练',
    targetMuscles: ['三头肌'],
    difficulty: 'intermediate',
    equipment: '绳索/哑铃',
    description: '三头肌下压是锻炼三头肌的有效动作。',
    instructions: [
      '站立，双手握住绳索把手',
      '手臂伸直，核心收紧',
      '弯曲肘部，将把手向下压',
      '缓慢回到起始位置'
    ],
    sets: 4,
    reps: '12-15',
    restTime: '45秒',
    calories: 40,
    imageUrl: 'https://picsum.photos/seed/tricep/400/300',
    gifUrl: 'https://media.giphy.com/media/l41lI3vW8S7pA5f8I/giphy.gif'
  },
  {
    id: '13',
    name: '侧平举',
    category: '肩部训练',
    targetMuscles: ['三角肌侧束'],
    difficulty: 'beginner',
    equipment: '哑铃',
    description: '侧平举是锻炼肩部侧束的经典动作。',
    instructions: [
      '站姿，双手握哑铃，手臂自然下垂',
      '保持核心收紧，将哑铃向两侧抬起',
      '直到手臂与地面平行',
      '缓慢放下回到起始位置'
    ],
    sets: 4,
    reps: '12-15',
    restTime: '45秒',
    calories: 30,
    imageUrl: 'https://picsum.photos/seed/lateralraise/400/300',
    gifUrl: 'https://media.giphy.com/media/xT8qB5Q7gD04mN7YKo/giphy.gif'
  },
  {
    id: '14',
    name: '坐姿划船',
    category: '背部训练',
    targetMuscles: ['背阔肌', '菱形肌'],
    difficulty: 'intermediate',
    equipment: '划船机/哑铃',
    description: '坐姿划船是锻炼背部的有效动作。',
    instructions: [
      '坐姿，双手握住把手',
      '手臂伸直，身体微微前倾',
      '用力将把手拉向腹部',
      '缓慢回到起始位置'
    ],
    sets: 4,
    reps: '10-12',
    restTime: '60秒',
    calories: 65,
    imageUrl: 'https://picsum.photos/seed/row/400/300',
    gifUrl: 'https://media.giphy.com/media/l41lI3vW8S7pA5f8I/giphy.gif'
  },
  {
    id: '15',
    name: '登山者',
    category: '全身训练',
    targetMuscles: ['核心', '腿部', '肩部'],
    difficulty: 'intermediate',
    equipment: '无',
    description: '登山者是高强度的全身训练动作，能有效燃烧卡路里。',
    instructions: [
      '俯卧撑姿势，身体呈一条直线',
      '交替将膝盖向胸部方向抬起',
      '保持快速节奏，核心收紧',
      '达到目标时间后放松'
    ],
    sets: 3,
    reps: '30-45秒',
    restTime: '45秒',
    calories: 85,
    imageUrl: 'https://picsum.photos/seed/mountainclimber/400/300',
    gifUrl: 'https://media.giphy.com/media/xT8qB5Q7gD04mN7YKo/giphy.gif'
  }
];

export const exerciseCategories = ['全部', '胸部训练', '背部训练', '腿部训练', '肩部训练', '手臂训练', '核心训练', '臀部训练', '全身训练'];