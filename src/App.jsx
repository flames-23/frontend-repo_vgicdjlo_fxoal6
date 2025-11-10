import { useEffect, useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import Notes from './components/Notes';

function useLocal(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

export default function App() {
  const [tasks] = useLocal('sb_tasks', []);
  const [notes] = useLocal('sb_notes', []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      <main className="py-8 space-y-10">
        <Dashboard tasks={tasks} notes={notes} />
        <TaskManager />
        <Notes />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Built for balancing studies and extracurriculars — stay consistent and curious.
      </footer>
    </div>
  );
}
