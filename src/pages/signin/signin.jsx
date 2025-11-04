import { useState, useEffect } from "react";
import { CiMail, CiLock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoIosCheckboxOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const result = await login({ email, password });
      
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        // Check if 2FA is required
        if (result.requiresTwoFA) {
          navigate('/2fa', { state: { userData: result.userData } });
        } else {
          // Get user data to determine role and redirect
          const userData = JSON.parse(localStorage.getItem('userData'));
          const redirectPath = userData?.role === 'admin' ? '/admin' : '/student';
          navigate(redirectPath);
        }
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch (error) {
      console.error('Signin error:', error);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-white">
      {/*  Company Logo (Fixed top-left, spaced properly) */}
      <div className="absolute top-5 left-5">
        <img
          src="Logo icon.png"
          alt="Company Logo"
          className="w-[130px] sm:w-[160px] md:w-[200px] lg:w-[230px]"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8 mt-20 sm:mt-28 md:mt-32">
        {/* ↑ Added margin-top to avoid overlap with logo */}
        <h1 className="font-Poppins text-3xl md:text-4xl lg:text-5xl font-bold text-[#302711]">
          Welcome Back
        </h1>
        <p className="font-Inter text-base md:text-lg text-[#666666]">
          Please log in to your account.
        </p>
      </div>

      {/* Form Container */}
      <div
        className="
          w-full max-w-md sm:max-w-lg md:max-w-2xl 
          p-6 sm:p-8 
          rounded-[50px] 
          md:bg-[#D9F5FF] 
          md:border 
          md:shadow-sm
        "
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* Email Field */}
          <div className="relative">
            <label className="block font-Inter text-sm md:text-base text-[#4B5563] mb-1">
              Email Address
            </label>
            {/* Centered icon vertically inside input */}
            <div className="absolute left-3 top-8 transform -translate-y-[2px] translate-y-1/2 mt-[2px] text-gray-500">
              <CiMail size={20} />
            </div>
            <input
              type="email"
              placeholder="stevejeremy@yahoo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[48px] pl-10 pr-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block font-Inter text-sm md:text-base text-[#4B5563] mb-1">
              Password
            </label>
            {/* Left lock icon */}
            <div className="absolute left-3 top-1/2 transform translate-y-[5px] text-gray-500">
              <CiLock size={20} />
            </div>
            {/* Right eye icon */}
            <div
              className="absolute right-3 top-1/2 transform translate-y-[5px] text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[48px] pl-10 pr-10 border border-[#FFFFFF] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              required
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setRememberMe((prev) => !prev)}
            >
              <IoIosCheckboxOutline
                className={`text-lg ${
                  rememberMe ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <p className="font-Inter text-[#2E2E30]">Remember Me</p>
            </div>
            <p className="text-[#3B82F6] font-Inter cursor-pointer">
              Forgot Password?
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-[48px] rounded-[10px] text-white font-Inter transition ${
              loading
                ? "bg-[#24559F]/70 cursor-not-allowed"
                : "bg-[#3B82F6] hover:bg-[#2D6AC9]"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-3">
            <p className="font-Inter text-sm text-[#000000E5]">
              Don't have an account?{" "}
              <span 
                onClick={() => navigate("/register/account")}
                className="text-[#3B82F6] font-medium cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
