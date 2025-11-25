import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoTimeOutline, IoBookOutline } from "react-icons/io5";

const ActiveExams = ({ user, exams }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const navigate = useNavigate();
  
  const startExam = (exam) => {
    setSelectedExam(exam);
    setShowConfirm(true);
  };

  const confirmStart = () => {
    navigate(`/exam-details/${selectedExam.id}`);
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {exams.map((exam, index) => (
          <div key={exam.id || exam._id || index} className="bg-white border rounded-lg p-6 shadow-sm flex flex-col h-full">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{exam.title || exam.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{exam.description || exam.subject}</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <IoTimeOutline className="mr-2" size={14} />
                    <span>Due Date</span>
                  </div>
                  <div className="flex items-center">
                    <IoTimeOutline className="mr-2" size={14} />
                    <span>{exam.timeLimit || exam.duration}m</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <IoBookOutline className="mr-2" size={14} />
                  <span>{exam.questionCount || exam.questions?.length || 0} Questions</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => startExam(exam)}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors mt-6"
            >
              Start Exam
            </button>
          </div>
        ))}
      </div>
      
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
    </>
  );
};

export default ActiveExams;