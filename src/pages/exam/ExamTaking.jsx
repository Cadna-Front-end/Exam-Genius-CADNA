import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiFlag } from 'react-icons/fi';
import { MdOutlineVideocam } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext.jsx';
import ExamHeader from '../../components/Layout/ExamHeader.jsx';
import { examService } from '../../services/examService.js';

const ExamTaking = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600);
  const [exam, setExam] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { darkMode, toggleDarkMode } = useTheme();

  // Session recovery function
  const recoverSession = async () => {
    try {
      const response = await examService.getUserSessions(examId);
      const sessions = Array.isArray(response.data) ? response.data : response.data?.sessions || [];
      const activeSession = sessions.find(s => s.status === 'in-progress');
      if (activeSession) {
        setSessionId(activeSession._id);
        localStorage.setItem(`exam_session_${examId}`, activeSession._id);
        return activeSession;
      }
    } catch (error) {
      console.warn('Session recovery failed:', error);
    }
    return null;
  };

  useEffect(() => {
    const initializeExam = async () => {
      try {
        // Start new session first to get session ID
        const startResult = await examService.startExam(examId);
        if (startResult.success) {
          const newSessionId = startResult.data._id || startResult.data.sessionId;
          setSessionId(newSessionId);
          localStorage.setItem(`exam_session_${examId}`, newSessionId);
          
          // Get full exam data from session endpoint
          const sessionResult = await examService.getExamSession(newSessionId);
          if (sessionResult.success) {
            setExam(sessionResult.data.exam || sessionResult.data);
            const examDuration = (sessionResult.data.exam?.timeLimit || sessionResult.data.exam?.duration || 60) * 60;
            
            // Handle timer logic
            const examStartKey = `exam_start_${examId}`;
            const savedStartTime = localStorage.getItem(examStartKey);
            
            if (savedStartTime) {
              const startTime = parseInt(savedStartTime);
              const elapsed = Math.floor((Date.now() - startTime) / 1000);
              const remaining = Math.max(0, examDuration - elapsed);
              setTimeLeft(remaining);
            } else {
              localStorage.setItem(examStartKey, Date.now().toString());
              setTimeLeft(examDuration);
            }
            
            // Load saved answers and flagged questions
            const savedAnswers = localStorage.getItem(`exam_answers_${examId}`);
            const savedFlagged = localStorage.getItem(`exam_flagged_${examId}`);
            
            if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
            if (savedFlagged) setFlagged(JSON.parse(savedFlagged));
          }
        }
      } catch (error) {
        setError('Error loading exam');
        console.error('Exam initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      initializeExam();
    }
  }, [examId]);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examId]);

  // Auto-sync timer
  useEffect(() => {
    const interval = setInterval(async () => {
      if (sessionId && Object.keys(answers).length > 0) {
        try {
          const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
            questionId, 
            answer, 
            timeSpent: 0
          }));
          await examService.syncAnswers(sessionId, answersArray);
        } catch (error) {
          console.warn('Bulk sync failed');
        }
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [sessionId, answers]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const saveAnswer = async (questionId, answer, timeSpent = 0) => {
    // Save locally first
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    localStorage.setItem(`exam_answers_${examId}`, JSON.stringify(newAnswers));
    
    // Sync to backend
    if (sessionId) {
      try {
        await examService.submitAnswer(sessionId, questionId, answer, timeSpent);
      } catch (error) {
        console.warn('Answer sync failed, will retry');
      }
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    saveAnswer(questionId, answer);
  };

  const handleFlagToggle = (questionId) => {
    const newFlagged = { ...flagged, [questionId]: !flagged[questionId] };
    setFlagged(newFlagged);
    localStorage.setItem(`exam_flagged_${examId}`, JSON.stringify(newFlagged));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitExam = async () => {
    try {
      if (!sessionId) {
        console.error('No session ID found for auto-submit');
        return;
      }
      
      const result = await examService.submitExam(sessionId, answers, true);
      if (result.success) {
        // Clear exam data
        localStorage.removeItem(`exam_start_${examId}`);
        localStorage.removeItem(`exam_answers_${examId}`);
        localStorage.removeItem(`exam_flagged_${examId}`);
        localStorage.removeItem(`exam_session_${examId}`);
        
        navigate(`/exam/${examId}/result`);
      } else {
        setError(result.error || 'Failed to submit exam');
      }
    } catch (error) {
      setError('Error submitting exam');
      console.error('Exam submission error:', error);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Exam not found'}</p>
          <button onClick={() => navigate('/student')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const questions = exam.questions || [];
  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  // Show message if no questions available
  if (questions.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="text-center">
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>No questions available for this exam.</p>
          <button onClick={() => navigate('/student')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Show message if current question is not available
  if (!currentQ) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="text-center">
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Question not found.</p>
          <button onClick={() => navigate('/student')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getWordCount = (text) => {
    return text ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
  };

  const getVisibleQuestionNumbers = () => {
    const groupSize = 3;
    const currentGroup = Math.floor(currentQuestion / groupSize);
    const startIndex = currentGroup * groupSize;
    const endIndex = Math.min(startIndex + groupSize, questions.length);
    return questions.slice(startIndex, endIndex).map((_, index) => startIndex + index);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Debug Info */}
      <div className="fixed top-4 right-4 bg-white p-2 rounded shadow text-xs max-w-xs z-50">
        <div>Exam: {exam ? 'Loaded' : 'Not loaded'}</div>
        <div>Questions: {questions.length}</div>
        <div>Current Q: {currentQuestion}</div>
        <div>Has currentQ: {currentQ ? 'Yes' : 'No'}</div>
        <div>Q Text: {currentQ?.text || currentQ?.question || currentQ?.questionText || 'No text'}</div>
        <div>Q Type: {currentQ?.type || 'No type'}</div>
        <div>Q ID: {currentQ?.id || currentQ?._id || 'No ID'}</div>
        <div>Q Keys: {currentQ ? Object.keys(currentQ).join(', ') : 'None'}</div>
      </div>
      <ExamHeader darkMode={darkMode} onDarkModeToggle={toggleDarkMode} />

      {/* Exam Header Section */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-6 mt-16`}>
        <div className="flex items-center justify-between">
          {/* Exam Title - Left */}
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{exam.title || exam.name}</h1>
          
          {/* Icons - Right */}
          <div className="flex items-center space-x-4">
            {/* Red Triangle Warning Icon */}
            <div className="relative">
              <div className="w-6 h-6 bg-red-500 flex items-center justify-center" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
                <span className="text-white text-sm font-bold">!</span>
              </div>
            </div>
            {/* CCTV Camera Icon with Green Dot */}
            <div className="relative">
              <MdOutlineVideocam className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {/* Timer */}
            <div className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} px-6 py-3 rounded-lg`}>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>🕐</div>
              <div className={`text-xl font-mono ${darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Question Navigation Section */}
        <div className="flex items-center justify-start mb-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} disabled:opacity-50 mr-3`}
          >
            <FiChevronLeft className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          
          <div className="flex items-center space-x-2 mr-3">
            {getVisibleQuestionNumbers().map((questionIndex) => (
              <button
                key={questionIndex}
                onClick={() => setCurrentQuestion(questionIndex)}
                className={`w-12 h-12 rounded-lg border font-medium text-lg ${
                  questionIndex === currentQuestion
                    ? 'bg-blue-600 text-white border-blue-600'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {questionIndex + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            className={`p-2 rounded-lg border ${darkMode ? 'bg-blue-800 border-blue-700' : 'bg-blue-100 border-blue-300'} disabled:opacity-50`}
          >
            <FiChevronRight className="w-5 h-5 text-blue-600" />
          </button>
        </div>



        {/* Flag Section */}
        <div className={`flex items-center justify-between mb-6 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
          <div className="flex items-center space-x-4">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
              {currentQuestion + 1} of {questions.length}
            </span>
            <div className={`px-3 py-1 rounded-full border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-700'} text-sm`}>
              {currentQ.type === 'multiple-choice' ? 'Multiple Choice' : 
               currentQ.type === 'true-false' ? 'True/False' :
               currentQ.type === 'short-answer' ? 'Short Answer' :
               currentQ.type === 'essay' ? 'Essay' :
               currentQ.type === 'code' ? 'Code' : 'Question'}
            </div>
          </div>
          
          <button
            onClick={() => handleFlagToggle(currentQ.id || currentQ._id || currentQuestion)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
              flagged[currentQ.id || currentQ._id || currentQuestion]
                ? 'bg-red-100 border-red-300 text-red-700'
                : darkMode
                ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FiFlag className="w-4 h-4" />
            <span>Flag</span>
          </button>
        </div>

        {/* Main Question Panel */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'} p-6 rounded-lg mb-6`}>
          <div className="mb-6">
            <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>{currentQ.text || currentQ.question || currentQ.title || 'Question text not available'}</h2>
            
            {/* Multiple Choice Questions */}
            {(currentQ.type === 'multiple-choice' || currentQ.type === 'true-false') && (
              <div className="space-y-3">
                {(currentQ.options || (currentQ.type === 'true-false' ? ['True', 'False'] : [])).map((option, index) => {
                  const optionText = typeof option === 'string' ? option : option.text;
                  const optionValue = typeof option === 'string' ? option : option.text;
                  return (
                    <label key={index} className={`flex items-center space-x-3 cursor-pointer p-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' : 'bg-white hover:bg-gray-50 border-gray-200'} rounded-lg border`}>
                      <input
                        type="radio"
                        name={`question-${currentQ.id || currentQ._id || currentQuestion}`}
                        value={optionValue}
                        checked={answers[currentQ.id || currentQ._id || currentQuestion] === optionValue}
                        onChange={() => handleAnswerSelect(currentQ.id || currentQ._id || currentQuestion, optionValue)}
                        className="h-5 w-5 text-blue-600"
                      />
                      <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{optionText}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Text-based Questions */}
            {(currentQ.type === 'essay' || currentQ.type === 'short-answer' || currentQ.type === 'code') && (
              <div>
                <textarea
                  value={answers[currentQ.id || currentQ._id || currentQuestion] || ''}
                  onChange={(e) => handleAnswerSelect(currentQ.id || currentQ._id || currentQuestion, e.target.value)}
                  className={`w-full p-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    currentQ.type === 'short-answer' ? 'h-24' : 
                    currentQ.type === 'code' ? 'h-64 font-mono' : 'h-48'
                  }`}
                  placeholder={
                    currentQ.type === 'short-answer' ? 'Type your short answer here' :
                    currentQ.type === 'code' ? 'Write your code here' :
                    'Type your answer here'
                  }
                />
                <div className={`flex justify-end mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentQ.type === 'essay' && (
                    <span>Word count: {getWordCount(answers[currentQ.id || currentQ._id || currentQuestion])} | Min. 250 words | Max. 500 words</span>
                  )}
                  {currentQ.type === 'short-answer' && (
                    <span>Word count: {getWordCount(answers[currentQ.id || currentQ._id || currentQuestion])} | Max. 50 words</span>
                  )}
                  {currentQ.type === 'code' && (
                    <span>Characters: {(answers[currentQ.id || currentQ._id || currentQuestion] || '').length}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          {currentQuestion > 0 && (
            <button
              onClick={handlePrevious}
              className={`px-12 py-3 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
          )}
          
          <button
            onClick={isLastQuestion ? () => navigate(`/exam/${examId}/summary`) : handleNext}
            className="px-12 py-3 rounded-lg font-medium transition-colors ml-auto bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLastQuestion ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamTaking;