import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatingAccount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate account creation process
    const timer = setTimeout(() => {
      navigate("/registration/complete");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-md p-8">
        {/* Logo */}
        <div className="mb-12">
          <img src="/Logo icon.png" alt="Exam Genius" className="w-24 h-auto" />
        </div>

        {/* Loading Animation */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>

          {/* Status Text */}
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Creating your account…
          </h2>
          <p className="text-gray-600 text-sm">
            Please wait while we set things up
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatingAccount;