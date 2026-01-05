import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import Header from '../../components/Layout/Header.jsx';
import { examService } from '../../services/examService.js';

const ExamResult = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const { darkMode, toggleDarkMode } = useTheme();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await examService.getResultByExam(examId);
        if (result.success && result.data) {
          setResultData(result.data);
        } else {
          setError('Results not available');
        }
      } catch (error) {
        setError('Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      fetchResults();
    }
  }, [examId]);

  const handleDownloadResult = () => {
    const content = `
EXAM RESULT CERTIFICATE

Exam: ${resultData.examTitle || 'Assessment'}
Score: ${Math.round(resultData.score || 0)}%
Status: ${(resultData.passed || (resultData.score || 0) >= 70) ? 'PASSED' : 'FAILED'}
Correct Answers: ${resultData.correctAnswers || 0} of ${resultData.totalQuestions || 0}
Date: ${new Date(resultData.submittedAt).toLocaleDateString()}
Time: ${new Date(resultData.submittedAt).toLocaleTimeString()}
`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resultData.examTitle || 'exam'}_result.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDashboard = () => {
    navigate('/student');
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Results not found'}</p>
          <button onClick={handleDashboard} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header title="Exam Results" darkMode={darkMode} onDarkModeToggle={toggleDarkMode} />
      
      <div className="max-w-2xl mx-auto px-6 pt-24 pb-12">
        {/* Yellow Trophy with Congratulations */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{(resultData.score?.passed || (resultData.score?.percentage || 0) >= 70) ? '🏆' : '❌'}</div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{(resultData.score?.passed || (resultData.score?.percentage || 0) >= 70) ? 'Congratulations!' : 'Exam Failed'}</h1>
        </div>

        {/* Exam Title */}
        <div className="text-center mb-2">
          <h2 className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{resultData.examTitle || resultData.exam?.title}</h2>
        </div>

        {/* Submitted Date and Time */}
        <div className="text-center mb-12">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Submitted on {new Date(resultData.submittedAt || resultData.completedAt).toLocaleDateString()} at {new Date(resultData.submittedAt || resultData.completedAt).toLocaleTimeString()}
          </p>
        </div>

        {/* Result Section */}
        <div className="text-center mb-8">
          {/* Percentage Score */}
          <div className={`text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{Math.round(resultData.score?.percentage || 0)}%</div>
          
          {/* Questions Correct */}
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            {resultData.score?.earnedPoints || 0} out of {resultData.score?.totalPoints || 0} points
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${Math.round(resultData.score?.percentage || 0)}%` }}
            ></div>
          </div>
          
          {/* Statistics Row */}
          <div className="max-w-sm mx-auto flex justify-between items-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{resultData.correctAnswers || resultData.correct || 0}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Correct</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{resultData.incorrectAnswers || resultData.incorrect || 0}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Incorrect</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{resultData.timeSpent || resultData.duration || '0:00'}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time Spent</div>
            </div>
          </div>
        </div>

        {/* Exam Status Card */}
        <div className={`max-w-sm mx-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 mb-8`}>
          <div className="text-center">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Exam Status</h3>
            
            <div className="flex items-center justify-center mb-4">
              {(resultData.score?.passed || (resultData.score?.percentage || 0) >= 70) ? (
                <>
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-green-600">Passed</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-red-600">Failed</span>
                </>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Score:</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{Math.round(resultData.score || resultData.percentage || 0)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Passing Score:</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{resultData.passingScore || 70}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Questions:</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{resultData.totalQuestions || resultData.total || 0}</span>
              </div>
            </div>

            <button 
              onClick={handleDownloadResult}
              className={`mt-4 px-3 py-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-blue-50'} text-blue-600 border border-blue-600 rounded text-sm font-medium transition-colors`}
            >
              Download Result
            </button>
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <div className="text-center">
          <button
            onClick={handleDashboard}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;