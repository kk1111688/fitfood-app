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
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    gifUrl: ''
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
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '12',
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
    imageUrl: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '13',
    name: '坐姿划船',
    category: '背部训练',
    targetMuscles: ['背阔肌', '菱形肌'],
    difficulty: 'intermediate',
    equipment: '划船机',
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
    imageUrl: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '14',
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
    imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '15',
    name: '开合跳',
    category: '全身训练',
    targetMuscles: ['全身', '心肺'],
    difficulty: 'beginner',
    equipment: '无',
    description: '开合跳是经典的有氧热身动作，能够快速提升心率。',
    instructions: [
      '双脚并拢站立，手臂放在身体两侧',
      '跳起时双脚分开，手臂向上举起',
      '落地时双脚并拢，手臂回到两侧',
      '保持节奏，连续跳跃'
    ],
    sets: 3,
    reps: '30-60秒',
    restTime: '30秒',
    calories: 50,
    imageUrl: 'https://images.unsplash.com/photo-1609899537878-88d5ba490bd0?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '16',
    name: '波比跳',
    category: '全身训练',
    targetMuscles: ['全身', '心肺', '核心'],
    difficulty: 'advanced',
    equipment: '无',
    description: '波比跳是高强度全身训练动作，燃脂效果显著。',
    instructions: [
      '站姿，向下深蹲，双手撑地',
      '双脚向后踢出，做俯卧撑姿势',
      '俯卧撑一次，然后收腿',
      '向上跳起回到起始位置'
    ],
    sets: 4,
    reps: '10-15',
    restTime: '45秒',
    calories: 95,
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '17',
    name: '箭步蹲跳',
    category: '腿部训练',
    targetMuscles: ['股四头肌', '臀大肌', '核心'],
    difficulty: 'advanced',
    equipment: '无',
    description: '箭步蹲跳是箭步蹲的进阶版，增加了爆发力训练。',
    instructions: [
      '箭步蹲姿势，前腿弯曲',
      '用力蹬地跳起，在空中交换腿',
      '落地时另一条腿在前',
      '保持节奏，连续跳跃'
    ],
    sets: 3,
    reps: '12-15/腿',
    restTime: '60秒',
    calories: 80,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '18',
    name: '侧弓步',
    category: '腿部训练',
    targetMuscles: ['股内侧肌', '臀大肌', '大腿内侧'],
    difficulty: 'intermediate',
    equipment: '无',
    description: '侧弓步能够有效锻炼大腿内侧和臀部肌肉。',
    instructions: [
      '站姿，双脚并拢',
      '向侧面迈出一大步，弯曲膝盖',
      '保持身体正直，重心下沉',
      '用力蹬地回到起始位置'
    ],
    sets: 3,
    reps: '10-12/侧',
    restTime: '45秒',
    calories: 60,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '19',
    name: '臀推',
    category: '臀部训练',
    targetMuscles: ['臀大肌', '腘绳肌'],
    difficulty: 'intermediate',
    equipment: '杠铃',
    description: '臀推是锻炼臀部最有效的动作之一，能够大重量训练。',
    instructions: [
      '坐姿，上背靠在长凳上',
      '杠铃放在髋部位置',
      '用力收紧臀部，抬起髋部',
      '保持几秒后缓慢放下'
    ],
    sets: 4,
    reps: '8-12',
    restTime: '90秒',
    calories: 90,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '20',
    name: '哑铃飞鸟',
    category: '胸部训练',
    targetMuscles: ['胸大肌'],
    difficulty: 'beginner',
    equipment: '哑铃',
    description: '哑铃飞鸟是锻炼胸部的孤立动作，能够拉伸胸肌。',
    instructions: [
      '仰卧在长凳上，双手握哑铃',
      '手臂伸直，掌心相对',
      '慢慢向两侧打开，直到胸部有拉伸感',
      '用力合拢回到起始位置'
    ],
    sets: 4,
    reps: '12-15',
    restTime: '60秒',
    calories: 50,
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '21',
    name: '面拉',
    category: '背部训练',
    targetMuscles: ['菱形肌', '后三角肌'],
    difficulty: 'beginner',
    equipment: '绳索',
    description: '面拉是锻炼背部和后肩的有效动作，改善圆肩体态。',
    instructions: [
      '面对绳索站立，双手握住绳索末端',
      '拉绳索到面部位置，手肘向外',
      '收紧肩胛骨，保持几秒',
      '缓慢回到起始位置'
    ],
    sets: 4,
    reps: '12-15',
    restTime: '45秒',
    calories: 45,
    imageUrl: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '22',
    name: '反向卷腹',
    category: '核心训练',
    targetMuscles: ['腹直肌', '下腹部'],
    difficulty: 'intermediate',
    equipment: '无',
    description: '反向卷腹重点锻炼下腹部肌肉，比普通卷腹更有效。',
    instructions: [
      '仰卧，手臂放在身体两侧',
      '膝盖弯曲，双脚抬起',
      '将髋部抬起，膝盖向胸部靠近',
      '缓慢放下回到起始位置'
    ],
    sets: 4,
    reps: '15-20',
    restTime: '30秒',
    calories: 45,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '23',
    name: '俄罗斯转体',
    category: '核心训练',
    targetMuscles: ['腹斜肌', '腹直肌'],
    difficulty: 'intermediate',
    equipment: '哑铃/无',
    description: '俄罗斯转体是锻炼腹斜肌的有效动作。',
    instructions: [
      '坐姿，膝盖弯曲，脚平放',
      '身体微微后仰，核心收紧',
      '双手握住哑铃，向两侧交替转动',
      '保持节奏，连续转动'
    ],
    sets: 3,
    reps: '20次',
    restTime: '45秒',
    calories: 55,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '24',
    name: '超人式',
    category: '背部训练',
    targetMuscles: ['下背部', '后三角肌'],
    difficulty: 'beginner',
    equipment: '无',
    description: '超人式是锻炼下背部的经典动作，改善体态。',
    instructions: [
      '俯卧在地上，手臂向前伸直',
      '同时抬起手臂和双腿',
      '保持几秒，感受下背部收紧',
      '缓慢回到起始位置'
    ],
    sets: 3,
    reps: '10-12',
    restTime: '45秒',
    calories: 40,
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '25',
    name: '深蹲跳',
    category: '腿部训练',
    targetMuscles: ['股四头肌', '臀大肌', '爆发力'],
    difficulty: 'intermediate',
    equipment: '无',
    description: '深蹲跳是提高下肢爆发力的有效训练。',
    instructions: [
      '深蹲姿势，双手放在身后',
      '用力蹬地向上跳起',
      '落地时回到深蹲姿势',
      '保持节奏，连续跳跃'
    ],
    sets: 3,
    reps: '10-15',
    restTime: '60秒',
    calories: 75,
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '26',
    name: '哑铃划船',
    category: '背部训练',
    targetMuscles: ['背阔肌', '菱形肌'],
    difficulty: 'intermediate',
    equipment: '哑铃',
    description: '哑铃划船是单侧训练背部的有效动作。',
    instructions: [
      '单膝跪在长凳上，一手支撑',
      '另一手握哑铃，手臂下垂',
      '将哑铃拉向腰部位置',
      '缓慢回到起始位置'
    ],
    sets: 4,
    reps: '10-12/侧',
    restTime: '60秒',
    calories: 60,
    imageUrl: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '27',
    name: '蜘蛛俯卧撑',
    category: '核心训练',
    targetMuscles: ['核心', '胸部', '肩部'],
    difficulty: 'advanced',
    equipment: '无',
    description: '蜘蛛俯卧撑是结合俯卧撑和登山者的复合动作。',
    instructions: [
      '俯卧撑姿势，身体呈一条直线',
      '弯曲肘部做一次俯卧撑',
      '同时将一条腿向侧面抬起',
      '回到俯卧撑姿势，换腿'
    ],
    sets: 3,
    reps: '10-12',
    restTime: '60秒',
    calories: 70,
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '28',
    name: '原地高抬腿',
    category: '全身训练',
    targetMuscles: ['腿部', '核心', '心肺'],
    difficulty: 'beginner',
    equipment: '无',
    description: '原地高抬腿是简单有效的热身和燃脂动作。',
    instructions: [
      '站姿，双脚与肩同宽',
      '快速交替抬起膝盖到腰部高度',
      '手臂配合摆动',
      '保持快速节奏'
    ],
    sets: 3,
    reps: '30-60秒',
    restTime: '30秒',
    calories: 60,
    imageUrl: 'https://images.unsplash.com/photo-1609899537878-88d5ba490bd0?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '29',
    name: '侧平板支撑',
    category: '核心训练',
    targetMuscles: ['腹斜肌', '核心'],
    difficulty: 'intermediate',
    equipment: '无',
    description: '侧平板支撑是锻炼腹斜肌和侧核心的有效动作。',
    instructions: [
      '侧卧，用一只手支撑身体',
      '身体呈一条直线',
      '核心收紧，保持姿势',
      '达到目标时间后换侧'
    ],
    sets: 3,
    reps: '20-45秒/侧',
    restTime: '30秒',
    calories: 35,
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=300&fit=crop',
    gifUrl: ''
  },
  {
    id: '30',
    name: '壶铃摆荡',
    category: '臀部训练',
    targetMuscles: ['臀大肌', '腘绳肌', '后链'],
    difficulty: 'intermediate',
    equipment: '壶铃',
    description: '壶铃摆荡是锻炼后链和臀部的动态动作。',
    instructions: [
      '站姿，双脚与肩同宽',
      '双手握住壶铃，放在身前',
      '臀部后推，壶铃摆到身后',
      '用臀部发力将壶铃摆到身前'
    ],
    sets: 4,
    reps: '15-20',
    restTime: '60秒',
    calories: 85,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    gifUrl: ''
  }
];

export const exerciseCategories = ['全部', '胸部训练', '背部训练', '腿部训练', '肩部训练', '手臂训练', '核心训练', '臀部训练', '全身训练'];