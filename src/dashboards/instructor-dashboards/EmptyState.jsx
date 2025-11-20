import { useDarkMode } from "../../contexts/DarkModeContext.jsx";

export default function EmptyState({ darkMode = false }) {
  // CHANGED: Added darkMode prop
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="text-6xl mb-5">
        <img src="Brazuca Chart.png" alt="" className="w-[208px] h-[210px]" />
      </div>

      {/* CHANGED: Added dark mode text colors */}
      <div
        className={`text-[16px] font-Inter font-normal ${
          darkMode ? "text-gray-300" : "text-[#171212]"
        }`}
      >
        <p className={`mb-1 ${darkMode ? "text-gray-200" : "text-black"}`}>
          To populate your dashboard and track student
        </p>
        <p className={darkMode ? "text-gray-300" : ""}>
          performance, you need to set up your first assessment.
        </p>
      </div>
    </div>
  );
}
