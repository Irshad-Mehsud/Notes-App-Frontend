import { useState } from "react";

export default function NoteCard({ note, onDelete, onUpdate}) {
  if (!note) return null;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title || "Untitled");
  const [editContent, setEditContent] = useState(note.content || "No content");
  // console.log("NoteCard Rendered with Note:", tittle);
  const handleUpdate = () => {
    onUpdate(note.id, editTitle, editContent);
    setIsEditing(false);
  };

  return (
    <div className={`group bg-white p-6 rounded-2xl border transition-all duration-200 flex flex-col h-full ${isEditing ? 'border-indigo-400 ring-2 ring-indigo-50 shadow-lg' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>
      
      {isEditing ? (
        <div className="flex flex-col gap-2 h-full">
          <input 
            className="font-bold text-lg outline-none border-b border-gray-100 pb-1"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea 
            className="text-sm text-gray-600 leading-relaxed flex-grow resize-none outline-none pt-2"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsEditing(false)} className="text-xs font-semibold text-gray-400 hover:text-gray-600">Cancel</button>
            <button onClick={handleUpdate} className="text-xs font-bold text-indigo-600 hover:text-indigo-800">Save Changes</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 text-lg leading-tight truncate pr-4">
              {note.title || "Untitled"}
            </h3>
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-50 px-2 py-1 rounded uppercase tracking-tighter">
              {note.date}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow whitespace-pre-wrap">
            {note.content || "No content"}
          </p>
          
          <div className="flex items-center justify-end gap-2 border-t border-gray-50 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Edit Button */}
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Edit Note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            {/* Delete Button */}
            <button 
              onClick={() => onDelete(note.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}