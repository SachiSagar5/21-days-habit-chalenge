export interface Habit {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  progress: boolean[];
  isCompleted: boolean;
}

export type HabitContextType = {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'progress' | 'isCompleted'>) => void;
  deleteHabit: (id: string) => void;
  toggleProgress: (habitId: string, dayIndex: number) => void;
};