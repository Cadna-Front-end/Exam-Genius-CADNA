import { useDarkMode } from "../../contexts/DarkModeContext.jsx";

export default function StatCard({
  title,
  value,
  icon,
  color,
  darkMode = false,
  loading = false, // Added loading state
  trend, // Optional: for showing trends (↑/↓)
  onClick, // Optional: make card clickable
}) {
  // If loading, show skeleton
  if (loading) {
    return (
      <div
        className={`rounded-lg shadow-sm p-4 flex items-center gap-4 animate-pulse ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`w-12 h-12 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
        <div className="space-y-2 flex-1">
          <div
            className={`h-3 rounded ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-5 rounded ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg shadow-sm p-4 flex items-center gap-4 transition-all duration-200 ${
        darkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-100"
      } ${
        onClick
          ? "cursor-pointer hover:shadow-md hover:scale-[1.02] " +
            (darkMode ? "hover:bg-gray-750" : "hover:bg-gray-50")
          : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors duration-200 ${color} ${
          darkMode ? "text-black" : ""
        }`}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs font-medium ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <p
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {value}
          </p>
          {trend && (
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                trend.direction === "up"
                  ? darkMode
                    ? "bg-green-900 text-green-300"
                    : "bg-green-100 text-green-800"
                  : darkMode
                  ? "bg-red-900 text-red-300"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {trend.direction === "up" ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
        {/* Optional: Add description or progress bar */}
        {title === "Ongoing Exams" && value > 0 && (
          <div className="mt-1">
            <div
              className={`w-full h-1 rounded-full ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <div
                className="h-1 rounded-full bg-blue-500 transition-all duration-1000"
                style={{ width: `${Math.min(value * 10, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
