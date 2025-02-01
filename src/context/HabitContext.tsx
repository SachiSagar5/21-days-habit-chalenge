import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, HabitContextType } from '../types';

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'progress' | 'isCompleted'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: crypto.randomUUID(),
      progress: Array(21).fill(false),
      isCompleted: false,
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const toggleProgress = (habitId: string, dayIndex: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newProgress = [...habit.progress];
        newProgress[dayIndex] = !newProgress[dayIndex];
        const isCompleted = newProgress.filter(Boolean).length === 21;
        return { ...habit, progress: newProgress, isCompleted };
      }
      return habit;
    }));
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, deleteHabit, toggleProgress }}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}