import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    localStorage.setItem('registrationData', JSON.stringify({
      email: formData.email,
      password: formData.password,
      userType: formData.userType
    }));
    
    setLoading(false);
    navigate("/register/personal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-white">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Account Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: "student" })}
                  className={`p-4 border rounded-lg text-center ${
                    formData.userType === "student"
                      ? "border-[#3B82F6] bg-blue-50 text-[#3B82F6]"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">Student</div>
                  <div className="text-sm text-gray-500">Take exams and view results</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: "instructor" })}
                  className={`p-4 border rounded-lg text-center ${
                    formData.userType === "instructor"
                      ? "border-[#3B82F6] bg-blue-50 text-[#3B82F6]"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">Instructor</div>
                  <div className="text-sm text-gray-500">Create and manage exams</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full h-12 px-3 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#3B82F6]"
                }`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full h-12 px-3 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#3B82F6]"
                }`}
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full h-12 px-3 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#3B82F6]"
                }`}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg bg-white">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 text-[#3B82F6] border-gray-300 rounded focus:ring-[#3B82F6]"
              />
              <p className="text-sm text-gray-600">
                Agree to Terms & Privacy
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] disabled:opacity-50 font-medium"
              >
                {loading ? "Processing..." : "Next"}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
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
      </div>
    </div>
  );
};

export default AccountDetails;