import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 py-4 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/Logo icon.png" alt="Exam Genius" className="h-10" />
            <h1 className="text-xl font-Poppins font-bold text-[#302711]">Exam Genius</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/signin")}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate("/register/account")}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9]"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <section className="px-6 py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-Poppins font-bold text-gray-900 mb-6">
            AI-Powered Assessment Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Secure, transparent, and intelligent examination system for modern education.
          </p>
          <button 
            onClick={() => navigate("/register/account")}
            className="px-8 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] text-lg"
          >
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;