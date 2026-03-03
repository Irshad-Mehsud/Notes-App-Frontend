export default function Navbar({ user }) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100 dark:bg-gray-950 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">N</span>
        </div>
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          NotesApp
        </div>
      </div>
      
      <div className="flex items-center gap-4 bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-100">
        <img 
          src={user.avatar} 
          alt="Profile" 
          className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
        />
        <span className="font-semibold text-sm text-gray-700">{user.name}</span>
      </div>
    </nav>
  );
}