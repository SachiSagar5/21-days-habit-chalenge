import React from 'react';
import { Target } from 'lucide-react';
import { HabitProvider } from './context/HabitContext';
import { HabitForm } from './components/HabitForm';
import { HabitList } from './components/HabitList';

function App() {
  return (
    <HabitProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Target size={32} className="text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">21-Day Habit Tracker</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Your Journey!</h2>
            <p className="text-gray-600">
              Track your habits for 21 days to make them stick. Research shows it takes about 21 days
              to form a new habit. Stay consistent and watch your progress grow day by day!
            </p>
          </div>

          <HabitForm />
          <HabitList />
        </div>
      </div>
    </HabitProvider>
  );
}

export default App;