import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Circle, Plus, Clock, Trophy } from 'lucide-react';

function TaskItem({ task, onToggle }) {
  return (
    <button
      onClick={() => onToggle(task.id)}
      className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors ${
        task.done ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      {task.done ? (
        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
      ) : (
        <Circle className="w-5 h-5 text-slate-400 mt-0.5" />
      )}
      <div className="flex-1">
        <div className="font-medium text-slate-800">{task.title}</div>
        {task.category && (
          <div className="text-xs text-slate-500 mt-0.5">{task.category}</div>
        )}
      </div>
      {task.due && (
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Clock className="w-4 h-4" />
          <span>{new Date(task.due).toLocaleDateString()}</span>
        </div>
      )}
    </button>
  );
}

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('sb_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Study');
  const [due, setDue] = useState('');

  useEffect(() => {
    localStorage.setItem('sb_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks((prev) => [
      { id: crypto.randomUUID(), title: title.trim(), category, due: due || null, done: false },
      ...prev,
    ]);
    setTitle('');
    setDue('');
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const study = tasks.filter((t) => t.category === 'Study').length;
    const activity = tasks.filter((t) => t.category === 'Activity').length;
    return { total, done, study, activity };
  }, [tasks]);

  return (
    <section id="tasks" className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Your Tasks</h2>

          <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a study task or an activity..."
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2"
            >
              <option>Study</option>
              <option>Activity</option>
            </select>
            <input
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2"
            />
            <button type="submit" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              <Plus className="w-4 h-4" /> Add
            </button>
          </form>

          <div className="space-y-2">
            {tasks.length === 0 ? (
              <div className="text-sm text-slate-500 border border-dashed border-slate-300 rounded-md p-6 text-center">
                No tasks yet — add your first study task or extracurricular activity.
              </div>
            ) : (
              tasks.map((t) => <TaskItem key={t.id} task={t} onToggle={toggleTask} />)
            )}
          </div>
        </div>

        <aside className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">At a Glance</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-slate-500 text-xs">Completed</div>
              <div className="text-2xl font-semibold text-green-600 flex items-center gap-2">
                <Trophy className="w-5 h-5" /> {stats.done}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-slate-500 text-xs">Total</div>
              <div className="text-2xl font-semibold text-slate-800">{stats.total}</div>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-slate-500 text-xs">Study</div>
              <div className="text-xl font-semibold text-indigo-600">{stats.study}</div>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-slate-500 text-xs">Activity</div>
              <div className="text-xl font-semibold text-amber-600">{stats.activity}</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
