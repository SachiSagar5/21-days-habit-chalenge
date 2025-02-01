import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

export function HabitList() {
  const { habits, deleteHabit, toggleProgress } = useHabits();

  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No habits added yet. Start by adding a new habit!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className={`bg-white rounded-lg shadow-md p-6 ${
            habit.isCompleted ? 'border-2 border-green-500' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {habit.title}
                {habit.isCompleted && (
                  <span className="text-green-500 text-sm font-normal">
                    Challenge Completed! 🎉
                  </span>
                )}
              </h3>
              {habit.description && (
                <p className="text-gray-600 mt-1">{habit.description}</p>
              )}
            </div>
            <button
              onClick={() => deleteHabit(habit.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mt-4">
            {habit.progress.map((completed, index) => (
              <button
                key={index}
                onClick={() => toggleProgress(habit.id, index)}
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span className="text-xs text-gray-500 mb-1">Day {index + 1}</span>
                {completed ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <Circle className="text-gray-300" size={24} />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}