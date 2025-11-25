import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient, API_ENDPOINTS } from "../config/api";
import ExamTokenManager from "../utils/examTokenManager";
import Loading from "../components/UI/Loading";

const ExamTaking = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const tokenManager = useRef(new ExamTokenManager(apiClient));

  useEffect(() => {
    const initializeExam = async () => {
      try {
        // Use real exam ID from localStorage if available, otherwise use URL param
        const realExamId = localStorage.getItem('currentExamId') || examId;
        
        // Validate examId
        if (!realExamId || typeof realExamId !== 'string') {
          throw new Error('Invalid exam ID');
        }
        
        // Get exam details first
        const examResponse = await apiClient.get(API_ENDPOINTS.EXAM_DETAILS(realExamId));
        if (!examResponse.success || !examResponse.data) {
          throw new Error(examResponse.message || 'Failed to load exam');
        }
        
        // Start exam session
        const sessionResponse = await apiClient.post(API_ENDPOINTS.START_EXAM(realExamId), {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        
        if (!sessionResponse.success || !sessionResponse.data) {
          throw new Error(sessionResponse.message || 'Failed to start exam session');
        }
        
        setExam(examResponse.data);
        setTimeLeft(examResponse.data.timeLimit * 60);
        
      } catch (error) {
        console.error('Exam initialization error:', error);
        setError(error.message || "Error loading exam");
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      initializeExam();
    } else {
      setError('No exam ID provided');
      setLoading(false);
    }
    
    // Cleanup on unmount
    return () => {
      if (tokenManager.current) {
        tokenManager.current.endExamSession();
      }
    };
  }, [examId]);

  useEffect(() => {
    if (timeLeft > 0 && !submitting) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && exam && !submitting) {
      handleSubmit();
    }
  }, [timeLeft, exam, submitting]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (submitting) return; // Prevent double submission
    
    setSubmitting(true);
    try {
      if (!examId || !answers) {
        throw new Error('Missing exam data for submission');
      }
      
      const response = await apiClient.post(API_ENDPOINTS.SUBMIT_EXAM(examId), {
        answers,
        submittedAt: new Date().toISOString()
      });
      
      if (response.success) {
        await tokenManager.current.endExamSession();
        navigate("/student", { state: { examSubmitted: true } });
      } else {
        throw new Error(response.message || 'Failed to submit exam');
      }
    } catch (error) {
      console.error('Exam submission error:', error);
      setError(error.message || "Error submitting exam");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <Loading />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!exam) return <div className="p-4">Exam not found</div>;

  const question = exam.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
            <div className="text-xl font-mono text-red-600">
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="mt-2 text-gray-600">
            Question {currentQuestion + 1} of {exam.questions.length}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">{question.text}</h2>
          
          {question.type === 'multiple-choice' && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'essay' && (
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your answer here..."
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[exam.questions[index].id]
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === exam.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Exam"}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(Math.min(exam.questions.length - 1, currentQuestion + 1))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamTaking;