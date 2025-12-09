import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition.js";
import { useTheme } from "../../context/ThemeContext.jsx";

import ActiveDashboard from "./ActiveDashboard";
import EmptyDashboard from "./EmptyDashboard";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const { user } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useTheme();
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          setError('Network error. Please check your internet connection.');
        } else if (error.message.includes('No authentication token')) {
          setError('Please sign in again.');
        } else {
          setError('Failed to load dashboard data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);
  
  const hasActivity = dashboardData?.hasActivity || false;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header onMenuToggle={() => setSidebarOpen(prev => !prev)} title="Dashboard" darkMode={darkMode} onDarkModeToggle={toggleDarkMode} />
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

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your dashboard...</p>
            </div>
          </div>
        ) : error && !dashboardData ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-700 text-sm">{error}</p>
              </div>
            )}
            {hasActivity ? (
              <ActiveDashboard user={user} dashboardData={dashboardData} />
            ) : (
              <EmptyDashboard user={user} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;