export function Card({ children, className = "" }) {
  return (
    <div
      className={`w-full max-w-lg mx-auto border border-gray-200 
      bg-white dark:bg-gray-950 shadow-xl rounded-2xl p-10 
      transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return (
    <div className="mb-8 pb-3 border-b border-gray-100 dark:border-gray-800">
      {children}
    </div>
  );
}

export function CardTitle({ children }) {
  return (
    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 tracking-tight">
      {children}
    </h2>
  );
}

export function CardContent({ children }) {
  return <div className="space-y-6 pt-3">{children}</div>;
}

export default Card;