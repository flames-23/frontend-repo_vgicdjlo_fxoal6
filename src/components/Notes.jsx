import { useEffect, useState } from 'react';
import { StickyNote, Trash2, Save, Tag } from 'lucide-react';

function NoteCard({ note, onDelete }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <Tag className="w-4 h-4" /> {note.title || 'Untitled'}
        </div>
        <button onClick={() => onDelete(note.id)} className="text-slate-400 hover:text-red-600">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-slate-700 whitespace-pre-wrap">{note.content}</p>
    </div>
  );
}

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('sb_notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    localStorage.setItem('sb_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!content.trim() && !title.trim()) return;
    setNotes((prev) => [
      { id: crypto.randomUUID(), title: title.trim(), content: content.trim(), createdAt: Date.now() },
      ...prev,
    ]);
    setTitle('');
    setContent('');
  };

  const deleteNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <section id="notes" className="max-w-6xl mx-auto px-4">
      <h2 className="text-xl font-semibold text-slate-800 mb-3">Notes</h2>

      <form onSubmit={addNote} className="rounded-lg border border-slate-200 p-4 bg-white mb-4">
        <div className="flex items-center gap-2 mb-2 text-slate-600">
          <StickyNote className="w-5 h-5" />
          <span className="text-sm">Quick jot</span>
        </div>
        <div className="grid sm:grid-cols-5 gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="sm:col-span-2 rounded-md border border-slate-300 px-3 py-2"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            className="sm:col-span-3 rounded-md border border-slate-300 px-3 py-2 h-24"
          />
        </div>
        <div className="mt-3 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            <Save className="w-4 h-4" /> Save Note
          </button>
        </div>
      </form>

      {notes.length === 0 ? (
        <div className="text-sm text-slate-500 border border-dashed border-slate-300 rounded-md p-6 text-center">
          No notes yet — capture study pointers or activity ideas.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {notes.map((n) => (
            <NoteCard key={n.id} note={n} onDelete={deleteNote} />)
          )}
        </div>
      )}
    </section>
  );
}
