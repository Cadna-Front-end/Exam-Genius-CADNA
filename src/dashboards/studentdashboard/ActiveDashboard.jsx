import { useState, useEffect } from "react";
import { IoBookOutline, IoTrophyOutline, IoTimeOutline, IoCheckmarkCircleOutline, IoShieldOutline } from "react-icons/io5";
import { FiClock, FiFileText, FiEdit3, FiTrendingUp } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";
import { apiClient, API_ENDPOINTS } from "../../config/api";

const ActiveDashboard = () => {
  const { darkMode } = useTheme();
  const [examStats, setExamStats] = useState({ upcoming: 0, completed: 0 });
  
  useEffect(() => {
    const fetchExamStats = async () => {
      try {
        const response = await apiClient.get(`${API_ENDPOINTS.EXAMS}?enrolled=true`);
        const exams = response?.data || [];
        
        const upcoming = exams.filter(exam => !exam.completed).length;
        const completed = exams.filter(exam => exam.completed).length;
        
        setExamStats({ upcoming, completed });
      } catch (error) {
        console.error('Failed to fetch exam stats:', error);
      }
    };
    
    fetchExamStats();
  }, []);
  
  const summaryCards = [
    { title: "Upcoming Exams", value: examStats.upcoming.toString(), type: "number", icon: FiClock, color: "bg-[#FBEBFF]", iconColor: "text-[#86249F]" },
    { title: "Total Certificates Earned", value: "3", type: "number", icon: FiFileText, color: "bg-[#FFF4E6]", iconColor: "text-[#FF8C00]" },
    { title: "Completed Exams", value: examStats.completed.toString(), type: "number", icon: FiEdit3, color: "bg-[#E6F3FF]", iconColor: "text-[#1E90FF]" },
    { title: "Performance Score Trend", value: "85%", type: "percentage", icon: FiTrendingUp, color: "bg-green-100", iconColor: "text-green-600" }
  ];

  return (
    <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
      {/* Top Summary Cards - 4 equal cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4 sm:px-8">
        {summaryCards.map((card, index) => (
          <div key={index} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-sm border`}>
            <div className="flex items-center gap-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className={card.iconColor} size={20} />
              </div>
              <div>
                <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{card.title}</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Integrity Status - Full width */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-sm border mb-8 mx-4 sm:mx-8`}>
        <div className="flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-lg">
            <IoShieldOutline className="text-red-600" size={20} />
          </div>
          <div>
            <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>AI Integrity Status</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>98%</p>
          </div>
        </div>
      </div>



      <div className="w-3/5">
        {/* Recent Results */}
        <div className="p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Results</h2>
          {/* Table Headers */}
          <div className="flex py-3 border-b border-gray-200 mb-4">
            <div className="flex-1 text-sm font-semibold text-gray-700">Subject</div>
            <div className="flex-1 text-sm font-semibold text-gray-700 text-center">Score</div>
            <div className="flex-1 text-sm font-semibold text-gray-700 text-center">Status</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            <div className="flex py-2">
              <div className="flex-1 font-medium text-gray-900">Chemistry Lab</div>
              <div className="flex-1 text-center font-bold text-gray-900">92%</div>
              <div className="flex-1 text-center">
                <span className="text-xs font-medium text-green-600">Pass</span>
              </div>
            </div>
            <div className="flex py-2">
              <div className="flex-1 font-medium text-gray-900">Biology Test</div>
              <div className="flex-1 text-center font-bold text-gray-900">88%</div>
              <div className="flex-1 text-center">
                <span className="text-xs font-medium text-green-600">Pass</span>
              </div>
            </div>
            <div className="flex py-2">
              <div className="flex-1 font-medium text-gray-900">History Quiz</div>
              <div className="flex-1 text-center font-bold text-gray-900">58%</div>
              <div className="flex-1 text-center">
                <span className="text-xs font-medium text-red-600">Fail</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress by Subject */}
        <div className="p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Progress by Subject</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="font-medium text-gray-900">Mathematics</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-600">85%</span>
                  <p className="text-xs text-gray-500">4 out of 5 exams taken</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span className="font-medium text-gray-900">Physics</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-600">92%</span>
                  <p className="text-xs text-gray-500">3 out of 4 exams taken</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  <span className="font-medium text-gray-900">History</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-600">58%</span>
                  <p className="text-xs text-gray-500">2 out of 3 exams taken</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Study Resources */}
      <div className="p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Study Resources</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Mathematics</p>
              <h3 className="font-medium text-[#3B82F6] mb-1">Calculus Guide</h3>
              <p className="text-xs text-gray-500">PDF</p>
            </div>

          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Physics</p>
              <h3 className="font-medium text-[#3B82F6] mb-1">Mechanics Lab</h3>
              <p className="text-xs text-gray-500">Video</p>
            </div>

          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Chemistry</p>
              <h3 className="font-medium text-[#3B82F6] mb-1">Organic Basics</h3>
              <p className="text-xs text-gray-500">Quiz</p>
            </div>

          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">History</p>
              <h3 className="font-medium text-[#3B82F6] mb-1">WWII Timeline</h3>
              <p className="text-xs text-gray-500">PDF</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default ActiveDashboard;