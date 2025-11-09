import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition";
import { 
  FiCheckCircle, 
  FiTrendingUp, 
  FiClock, 
  FiPlay, 
  FiCalendar,
  FiAward,
  FiFileText,
  FiEdit3
} from "react-icons/fi";
import { IoBookOutline, IoTrophyOutline, IoTimeOutline, IoCheckmarkCircleOutline, IoShieldCheckmarkOutline, IoShieldOutline } from "react-icons/io5";
import ActiveDashboard from "./ActiveDashboard";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={() => setSidebarOpen(prev => !prev)} title="Dashboard" />
      <Sidebar isOpen={sidebarOpen} userRole="student" onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6">
        <div className="mb-6 sm:mb-8 mt-20">
            <div className="flex items-start">
              <span className="w-12 h-12 bg-white border-8 border-blue-200 rounded-full flex items-center justify-center mr-3 text-2xl">
                👋
              </span>
              <div>
                <h1 className="text-xl xs:text-2xl sm:text-3xl font-Poppins font-bold text-gray-900 mb-1 leading-tight">
                  Hello {(user?.firstName || "Student").charAt(0).toUpperCase() + (user?.firstName || "Student").slice(1)},
                </h1>
                <p className="text-sm text-gray-500 mb-4">Focus on your progress, ready for your next exam</p>
              </div>
            </div>
            
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white text-[#3B82F6] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'active'
                  ? 'bg-white text-[#3B82F6] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Active
            </button>
          </div>
        </div>

        {/* Conditional Content Based on Active Tab */}
        {activeTab === 'overview' ? (
          <>
            {/* Overview Tab - 4 summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4 sm:px-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#FBEBFF] p-3 rounded-lg">
                      <FiClock className="text-[#86249F]" size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Upcoming Exams</p>
                      <p className="text-xl font-bold text-gray-900">-</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#FFF4E6] p-3 rounded-lg">
                      <FiFileText className="text-[#FF8C00]" size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Total Certificates Earned</p>
                      <p className="text-xl font-bold text-gray-900">-</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#E6F3FF] p-3 rounded-lg">
                      <FiEdit3 className="text-[#1E90FF]" size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Completed Exams</p>
                      <p className="text-xl font-bold text-gray-900">-</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <FiTrendingUp className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Performance Score Trend</p>
                      <p className="text-xl font-bold text-gray-900">-%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Integrity Status - Full width */}
              <div className="bg-white rounded-lg p-6 shadow-sm border mb-8 mx-4 sm:mx-8">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <IoShieldOutline className="text-red-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">AI Integrity Status</p>
                    <p className="text-xl font-bold text-gray-900">-</p>
                  </div>
                </div>
              </div>

              {/* Ready to Start Journey Section */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 text-left mb-6">
                  Ready to start your journey, {(user?.firstName || "Student").charAt(0).toUpperCase() + (user?.firstName || "Student").slice(1)}?
                </p>
                
                <div className="flex justify-center mb-6">
                  <img src="/Brazuca Chart.png" alt="Chart" className="w-64 h-64" />
                </div>
                
                <p className="text-sm text-gray-500 text-center max-w-xs mx-auto">
                  Your progress, results, and study recommendations will be tracked right here once you complete your first exam.
                </p>
              </div>


          </>
        ) : (
          /* Active Tab - Shows ActiveDashboard component */
          <ActiveDashboard user={user} />
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;