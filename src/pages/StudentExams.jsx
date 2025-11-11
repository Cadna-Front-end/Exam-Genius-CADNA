import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient, API_ENDPOINTS } from "../config/api";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import Loading from "../components/UI/Loading";

const StudentExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const navigate = useNavigate();

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

  const startExam = (exam) => {
    setSelectedExam(exam);
    setShowConfirm(true);
  };

  const confirmStart = () => {
    navigate(`/exam/${selectedExam.id}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Available Exams"
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userRole="student"
      />
      
      <main className="lg:ml-64 pt-16 p-6">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(exams) && exams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {exam.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {exam.description}
                </p>
                
                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{exam.timeLimit} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span>{exam.questionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      exam.status === 'available' 
                        ? 'bg-green-100 text-green-800'
                        : exam.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {exam.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => startExam(exam)}
                  disabled={exam.status !== 'available'}
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    exam.status === 'available'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {exam.status === 'available' ? 'Start Exam' : 
                   exam.status === 'completed' ? 'Completed' : 'Not Available'}
                </button>
              </div>
            ))}
          </div>

          {exams.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exams available</h3>
              <p className="text-gray-500">Check back later for new exams.</p>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirm && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Start Exam Confirmation</h3>
            <p className="text-gray-600 mb-4">
              You are about to start <strong>{selectedExam.title}</strong>. 
              Once started, you will have {selectedExam.timeLimit} minutes to complete the exam.
            </p>
            <p className="text-sm text-red-600 mb-6">
              Warning: You cannot pause or restart the exam once it begins.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmStart}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentExams;