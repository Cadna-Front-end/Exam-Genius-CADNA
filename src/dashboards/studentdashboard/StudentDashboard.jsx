import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition.js";
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
import EmptyDashboard from "./EmptyDashboard";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  
  // Automatically detect if user has activity
  const hasActivity = false; // Set to true to see ActiveDashboard

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
              <p className="text-sm text-gray-500 mb-4">
                {hasActivity ? "Focus on your progress, ready for your next exam" : "Ready to start your journey?"}
              </p>
            </div>
          </div>
          

        </div>

        {hasActivity ? (
          /* User has activity - Show ActiveDashboard */
          <ActiveDashboard user={user} />
        ) : (
          /* New user with no activity - Show EmptyDashboard */
          <EmptyDashboard user={user} />
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;