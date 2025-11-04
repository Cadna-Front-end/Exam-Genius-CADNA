import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SecurityAndFinalize = () => {
  const [formData, setFormData] = useState({
    enableTwoFA: false,
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms and Conditions to continue");
      return;
    }
    
    setLoading(true);
    
    try {
      const registrationData = JSON.parse(localStorage.getItem('registrationData') || '{}');
      
      const completeData = {
        email: registrationData.email,
        password: registrationData.password,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        phone: registrationData.phoneNumber,
        role: registrationData.userType === 'instructor' ? 'admin' : 'student',
        enableTwoFA: formData.enableTwoFA,
        agreeToTerms: formData.agreeToTerms
      };
      
      const result = await register(completeData);
      
      if (result.success) {
        localStorage.removeItem('registrationData');
        navigate("/register/success");
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 bg-white">
      <div className="absolute top-5 left-5">
        <img src="/Logo icon.png" alt="Exam Genius" className="w-32 h-auto" />
      </div>

      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#302711] mb-2">
            Create New Account
          </h1>
          <p className="text-gray-600 mb-6">Join the future of AI-powered assessment.</p>
        </div>

        <div className="bg-[#D9F5FF] rounded-[30px] p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Security & Finalize</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg bg-white">
              <input
                type="checkbox"
                name="enableTwoFA"
                checked={formData.enableTwoFA}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-[#3B82F6] border-gray-300 rounded focus:ring-[#3B82F6]"
              />
              <div>
                <label className="font-medium text-gray-900">
                  Enable Two-Factor Authentication (2FA)
                </label>
                <p className="text-sm text-gray-600">
                  Add an extra layer of security to your account with 2FA verification.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg bg-white">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-[#3B82F6] border-gray-300 rounded focus:ring-[#3B82F6]"
                required
              />
              <div>
                <label className="font-medium text-gray-900">
                  Agree to Terms and Conditions
                </label>
                <p className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-[#3B82F6] hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#3B82F6] hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] disabled:opacity-50 font-medium"
              >
                {loading ? "Creating Account..." : "Create My Account"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="text-[#3B82F6] font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecurityAndFinalize;