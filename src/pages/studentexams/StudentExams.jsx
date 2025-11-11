import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition.js";
import { apiClient, API_ENDPOINTS } from "../../config/api";
import ActiveExams from "./ActiveExams";
import EmptyExams from "./EmptyExams";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import Loading from "../../components/UI/Loading";

const StudentExams = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.EXAMS);
        if (response.success) {
          setExams(Array.isArray(response.data) ? response.data : []);
        } else {
          setError("Failed to load exams");
        }
      } catch (error) {
        setError("Error loading exams");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);
  
  // Automatically detect if user has exams
  const hasExams = Array.isArray(exams) && exams.length > 0;
  
  if (loading) return <Loading />;

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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {hasExams ? (
          <ActiveExams user={user} exams={exams} />
        ) : (
          <EmptyExams user={user} />
        )}
      </main>
    </div>
  );
};

export default StudentExams;