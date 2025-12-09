import { useNavigate } from "react-router-dom";
import { IoTimeOutline, IoBookOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext.jsx";

const ActiveExams = ({ user, exams }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  
  const startExam = (exam) => {
    const examId = exam.id || exam._id || exam.examId;
    navigate(`/exam/${examId}/overview`);
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {exams.map((exam, index) => (
          <div key={exam.id || exam._id || index} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-sm flex flex-col h-full`}>
            <div className="flex-1">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{exam.title || exam.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{exam.description || exam.subject}</p>

              <div className="space-y-4">
                <div className={`flex items-center justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="flex items-center">
                    <IoTimeOutline className="mr-2" size={14} />
                    <span>Due Date</span>
                  </div>
                  <div className="flex items-center">
                    <IoTimeOutline className="mr-2" size={14} />
                    <span>{exam.timeLimit || exam.duration}m</span>
                  </div>
                </div>
                <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
      

    </>
  );
};

export default ActiveExams;