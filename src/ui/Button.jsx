export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}