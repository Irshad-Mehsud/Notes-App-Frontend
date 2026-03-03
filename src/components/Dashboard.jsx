import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import NoteCard from "./NoteCard";
import Navbar from "./Navbar";
import { createNote, deleteNote, getAllNotes, updateNote } from "../api/notesApi";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = { name: "Rohan Khan", avatar: "https://i.pravatar.cc/100?img=12" };

  // Fetch Notes on Load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getAllNotes();
        // Backend returns notes with 'tittle' and 'description'
        const formattedNotes = response.data.map(n => ({
          id: n._id,
          title: n.tittle || "Untitled",
          content: n.description || "No content",
          date: new Date(n.createdAt).toLocaleDateString()
        }));
        setNotes(formattedNotes);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchNotes();
  }, []);

  // Remove duplicate useEffect and unnecessary console logs
  console.log("Notes State in Dashboard:", notes);
  // Add Note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);
    try {
      const response = await createNote({ tittle: title, description: content });
      const newNote = {
        id: response.data._id,
        title: response.data.tittle || "Untitled",
        content: response.data.description || "No content",
        date: "Just now"
      };
      setNotes((prev) => [newNote, ...prev]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Creation failed:", err);
      alert("Check Console: Backend validation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async (id, ut, uc) => {
    try {
      const response = await updateNote(id, { tittle: ut, description: uc });
      setNotes(notes.map(n => n.id === id ? {
        ...n,
        title: response.data.tittle || "Untitled",
        content: response.data.description || "No content"
      } : n));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <Navbar user={user} />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-center mb-12">
          <Card className="w-full max-w-lg shadow-xl border-none ring-1 ring-gray-100 bg-white/80 backdrop-blur-md">
            <CardHeader><CardTitle className="text-gray-800">New Note</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleAddNote} className="space-y-4">
                <input
                  className="w-full p-2 font-bold text-lg outline-none bg-transparent"
                  placeholder="Note Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <textarea
                  className="w-full h-28 p-2 text-gray-600 outline-none bg-gray-50/50 rounded-xl resize-none"
                  placeholder="Content..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isLoading || !title || !content}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:bg-gray-300"
                >
                  {isLoading ? "Saving..." : "Save Note"}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length === 0 ? (
            <p className="text-gray-500">No notes available.</p>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}