import { BookOpen, Calendar, NotebookPen } from 'lucide-react';

export default function Header() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          <span className="font-semibold text-slate-800">Study & Activity Planner</span>
        </div>
        <nav className="flex items-center gap-2 text-sm">
          <button onClick={() => scrollTo('dashboard')} className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700">Dashboard</button>
          <button onClick={() => scrollTo('tasks')} className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Tasks
          </button>
          <button onClick={() => scrollTo('notes')} className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 flex items-center gap-1">
            <NotebookPen className="w-4 h-4" /> Notes
          </button>
        </nav>
      </div>
    </header>
  );
}
