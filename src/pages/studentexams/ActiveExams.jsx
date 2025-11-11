import { IoTimeOutline, IoBookOutline } from "react-icons/io5";

const ActiveExams = ({ user }) => {
  const exams = [
    {
      id: 1,
      title: "Calculus Final Exam",
      subject: "Mathematics",
      date: "Jan 20, 2024",
      duration: "2h 30m",
      questions: 50,
      status: "available"
    },
    {
      id: 2,
      title: "Physics Quiz",
      subject: "Physics", 
      date: "Jan 22, 2024",
      duration: "1h 15m",
      questions: 25,
      status: "available"
    },
    {
      id: 3,
      title: "Chemistry Test",
      subject: "Chemistry",
      date: "Jan 25, 2024", 
      duration: "2h 00m",
      questions: 40,
      status: "upcoming"
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white border rounded-lg p-6 shadow-sm flex flex-col h-full">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{exam.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{exam.subject}</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <IoTimeOutline className="mr-2" size={14} />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center">
                    <IoTimeOutline className="mr-2" size={14} />
                    <span>{exam.duration}</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <IoBookOutline className="mr-2" size={14} />
                  <span>{exam.questions} Questions</span>
                </div>
              </div>
            </div>
            
            <button 
              className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors mt-6 ${
                exam.status === 'available' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={exam.status !== 'available'}
            >
              {exam.status === 'available' ? 'Take Exam' : 'Coming Soon'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActiveExams;