import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return '早上好';
  if (hour < 18) return '下午好';
  return '晚上好';
}

export function calculateBMI(weight: number, height: number): number {
  return weight / Math.pow(height / 100, 2);
}

export function getBMIStatus(bmi: number): string {
  if (bmi < 18.5) return '偏瘦';
  if (bmi < 24) return '正常';
  if (bmi < 28) return '超重';
  return '肥胖';
}

export function calculateBMR(user: { weight: number; height: number; age: number; gender: 'male' | 'female' }): number {
  if (user.gender === 'male') {
    return Math.round(10 * user.weight + 6.25 * user.height - 5 * user.age + 5);
  }
  return Math.round(10 * user.weight + 6.25 * user.height - 5 * user.age - 161);
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.2));
}