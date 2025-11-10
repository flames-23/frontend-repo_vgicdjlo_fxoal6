import { useMemo } from 'react';
import { Clock, ListChecks, NotebookPen, Activity } from 'lucide-react';

export default function Dashboard({ tasks = [], notes = [] }) {
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    const study = tasks.filter((t) => t.category === 'Study').length;
    const extracurricular = tasks.filter((t) => t.category === 'Activity').length;
    const recentNotes = notes.slice(0, 3);
    return { totalTasks, completed, study, extracurricular, recentNotes };
  }, [tasks, notes]);

  return (
    <section id="dashboard" className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 p-4 bg-white">
          <div className="text-xs text-slate-500">All Tasks</div>
          <div className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-800">
            <ListChecks className="w-5 h-5 text-indigo-600" /> {stats.totalTasks}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-4 bg-white">
          <div className="text-xs text-slate-500">Completed</div>
          <div className="mt-1 flex items-center gap-2 text-2xl font-semibold text-green-600">
            <Activity className="w-5 h-5" /> {stats.completed}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-4 bg-white">
          <div className="text-xs text-slate-500">Study</div>
          <div className="mt-1 flex items-center gap-2 text-2xl font-semibold text-indigo-600">
            <Clock className="w-5 h-5" /> {stats.study}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-4 bg-white">
          <div className="text-xs text-slate-500">Activities</div>
          <div className="mt-1 flex items-center gap-2 text-2xl font-semibold text-amber-600">
            <NotebookPen className="w-5 h-5" /> {stats.extracurricular}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Tips</h3>
        <ul className="grid md:grid-cols-3 gap-3 text-sm">
          <li className="rounded-lg border border-slate-200 p-3 bg-white">Batch similar tasks together to reduce context switching.</li>
          <li className="rounded-lg border border-slate-200 p-3 bg-white">Plan activities after study blocks to recharge and reward yourself.</li>
          <li className="rounded-lg border border-slate-200 p-3 bg-white">Keep brief notes right after studying or events while details are fresh.</li>
        </ul>
      </div>
    </section>
  );
}
