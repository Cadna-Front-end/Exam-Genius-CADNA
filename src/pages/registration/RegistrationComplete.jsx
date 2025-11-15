import { useNavigate } from "react-router-dom";

const RegistrationComplete = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-md p-8">
        {/* Logo */}
        <div className="mb-12">
          <img src="/Logo icon.png" alt="Exam Genius" className="w-24 h-auto" />
        </div>

        {/* Success Message */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Registration Complete!
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            Your account has been created successfully.
          </p>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-[#3B82F6] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2D6AC9] transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComplete;