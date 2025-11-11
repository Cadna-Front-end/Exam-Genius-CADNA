import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextDefinition.js";

const TwoFactorAuth = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { verifyTwoFA } = useContext(AuthContext);

  // Check if we have a temp token for 2FA
  const tempToken = localStorage.getItem('tempToken');
  
  // Redirect to signin if no temp token
  if (!tempToken) {
    console.warn('No temp token found for 2FA verification');
    navigate('/signin');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);

    try {
      const result = await verifyTwoFA(code);
      
      if (result.success) {
        // Get user data from localStorage after successful verification
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const redirectPath = userData?.role === 'instructor' ? '/instructor' : '/student';
        navigate(redirectPath);
      } else {
        setError(result.error || "Invalid verification code");
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      setError(error.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    alert("Verification code sent to your registered email/phone");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="absolute top-5 left-5">
        <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
          <img src="/Logo icon.png" alt="Exam Genius" className="w-32 h-auto cursor-pointer" />
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Two-Factor Authentication
          </h1>
          
          <p className="text-gray-600 mb-6">
            Enter the 6-digit verification code sent to your registered email or phone.
          </p>
        </div>

        <div className="bg-[#D9F5FF] rounded-[30px] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full h-12 px-4 text-center text-2xl tracking-widest bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] disabled:opacity-50 font-medium"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[#3B82F6] font-medium hover:underline"
                >
                  Resend Code
                </button>
              </p>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;