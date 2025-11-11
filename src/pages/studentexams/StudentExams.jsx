import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition";
import ActiveExams from "./ActiveExams";
import EmptyExams from "./EmptyExams";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";

const StudentExams = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  
  // Automatically detect if user has exams
  const hasExams = user?.availableExams > 0 || user?.upcomingExams > 0 || false;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={() => setSidebarOpen(prev => !prev)} title="Exams" />
      <Sidebar isOpen={sidebarOpen} userRole="student" onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6">
        <div className="mb-6 sm:mb-8 mt-20">
          <div className="flex items-start">
            <span className="w-12 h-12 bg-white border-8 border-blue-200 rounded-full flex items-center justify-center mr-3 text-2xl">
              📝
            </span>
            <div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-Poppins font-bold text-gray-900 mb-1 leading-tight">
                Your Exams
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                {hasExams ? "Manage and take your available exams" : "No exams available at the moment"}
              </p>
            </div>
          </div>
        </div>

        {hasExams ? (
          <ActiveExams user={user} />
        ) : (
          <EmptyExams user={user} />
        )}
      </main>
    </div>
  );
};

export default StudentExams;