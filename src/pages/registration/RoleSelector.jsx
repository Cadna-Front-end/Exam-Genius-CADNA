import { useNavigate } from 'react-router-dom';
import { FaUser, FaChalkboardTeacher } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem('accountType', role);
    navigate('/register/account');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-100 px-6 py-4">
        <img
          src="/bigger%20logo.png"
          alt="Exam Genius"
          className="h-16"
        />
      </div>

      {/* Back Button Section */}
      <div className="w-full px-6 py-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-8">
        {/* Title Section */}
        <div className="text-center mb-12 max-w-md">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Select Account Type
          </h1>
          <p className="text-gray-600">
            Select your role to continue with registration
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div
            onClick={() => handleRoleSelect('student')}
            className="bg-white border-2 border-gray-200 rounded-2xl p-8 cursor-pointer transition-all duration-200 hover:border-[#2563EB] hover:shadow-xl group"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <FaUser className="w-10 h-10 text-[#2563EB]" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Student
                </h3>
                <p className="text-gray-600 text-base mb-6">
                  Take exams and view your results
                </p>
              </div>

              <button className="w-full py-3 px-6 border-2 border-[#2563EB] text-[#2563EB] rounded-xl font-semibold hover:bg-[#2563EB] hover:text-white transition-colors">
                Select Student
              </button>
            </div>
          </div>

          <div
            onClick={() => handleRoleSelect('instructor')}
            className="bg-white border-2 border-gray-200 rounded-2xl p-8 cursor-pointer transition-all duration-200 hover:border-[#2563EB] hover:shadow-xl group"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <FaChalkboardTeacher className="w-10 h-10 text-[#2563EB]" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Instructor
                </h3>
                <p className="text-gray-600 text-base mb-6">
                  Create and manage exams for students
                </p>
              </div>

              <button className="w-full py-3 px-6 border-2 border-[#2563EB] text-[#2563EB] rounded-xl font-semibold hover:bg-[#2563EB] hover:text-white transition-colors">
                Select Instructor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;