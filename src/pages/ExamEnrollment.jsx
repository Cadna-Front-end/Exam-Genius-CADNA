import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient, API_ENDPOINTS } from "../config/api";
import Loading from "../components/UI/Loading";

const ExamEnrollment = () => {
  const { examLink } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const handleEnrollment = async () => {
      try {
        if (!examLink) {
          throw new Error('No exam link provided');
        }

        const response = await apiClient.get(API_ENDPOINTS.EXAM_BY_LINK(examLink));
        
        if (response.success && response.data) {
          // Check if authentication is required
          if (response.data.requiresAuth) {
            // Store exam link and redirect to login
            localStorage.setItem('pendingExamLink', examLink);
            navigate('/signin');
            return;
          }
          
          // Check if auto-enrolled
          if (response.data.autoEnrolled) {
            setSuccessMessage(response.message || 'Successfully enrolled in exam!');
            setShowSuccessPopup(true);
          }
        } else {
          throw new Error(response.message || 'Failed to enroll in exam');
        }
      } catch (error) {
        console.error('Enrollment failed:', error);
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          // Store exam link and redirect to login
          localStorage.setItem('pendingExamLink', examLink);
          navigate('/signin');
          return;
        }
        setSuccessMessage('Enrollment failed. Please try again.');
        setShowSuccessPopup(true);
      } finally {
        setLoading(false);
      }
    };

    handleEnrollment();
  }, [examLink, navigate]);

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    navigate('/student/exams');
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      {/* Show content when not loading and no popup */}
      {!showSuccessPopup && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Processing Exam Link...</h2>
          <p className="text-gray-600 mb-4">Exam ID: {examLink}</p>
          <button 
            onClick={() => navigate('/signin')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Sign In to Continue
          </button>
        </div>
      )}
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrollment Successful!</h3>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <button
                onClick={handleSuccessClose}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 font-medium"
              >
                Go to My Exams
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamEnrollment;