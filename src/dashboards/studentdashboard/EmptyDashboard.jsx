import { 
  FiClock, 
  FiFileText,
  FiEdit3,
  FiTrendingUp
} from "react-icons/fi";
import { IoShieldOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext.jsx";

const EmptyDashboard = ({ user }) => {
  const { darkMode } = useTheme();
  return (
    <>
      {/* Overview Tab - 4 summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4 sm:px-8">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-sm border`}>
          <div className="flex items-center gap-4">
            <div className="bg-[#FBEBFF] p-3 rounded-lg">
              <FiClock className="text-[#86249F]" size={20} />
            </div>
            <div>
              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Upcoming Exams</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>-</p>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-sm border`}>
          <div className="flex items-center gap-4">
            <div className="bg-[#FFF4E6] p-3 rounded-lg">
              <FiFileText className="text-[#FF8C00]" size={20} />
            </div>
            <div>
              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Certificates Earned</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>-</p>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-sm border`}>
          <div className="flex items-center gap-4">
            <div className="bg-[#E6F3FF] p-3 rounded-lg">
              <FiEdit3 className="text-[#1E90FF]" size={20} />
            </div>
            <div>
              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Completed Exams</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>-</p>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-sm border`}>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <FiTrendingUp className="text-green-600" size={20} />
            </div>
            <div>
              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Performance Score Trend</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>-%</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Integrity Status - Full width */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-sm border mb-8 mx-4 sm:mx-8`}>
        <div className="flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-lg">
            <IoShieldOutline className="text-red-600" size={20} />
          </div>
          <div>
            <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>AI Integrity Status</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>-</p>
          </div>
        </div>
      </div>

      {/* Ready to Start Journey Section */}
      <div className="mb-8">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-left mb-6`}>
          Ready to start your journey, {(user?.firstName || "Student").charAt(0).toUpperCase() + (user?.firstName || "Student").slice(1)}?
        </p>
        
        <div className="flex justify-center mb-6">
          <img src="/Brazuca Chart.png" alt="Chart" className="w-64 h-64" />
        </div>
        
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center max-w-xs mx-auto`}>
          Your progress, results, and study recommendations will be tracked right here once you complete your first exam.
        </p>
      </div>
    </>
  );
};

export default EmptyDashboard;