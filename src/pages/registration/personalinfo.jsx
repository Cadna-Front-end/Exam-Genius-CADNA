import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser, CiPhone } from "react-icons/ci";
import { isValidPhone, isValidName } from "../../utils/validation";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName || !isValidName(formData.firstName)) {
      newErrors.firstName = "First name is required (at least 2 characters)";
    }
    
    if (!formData.lastName || !isValidName(formData.lastName)) {
      newErrors.lastName = "Last name is required (at least 2 characters)";
    }
    
    if (!formData.phoneNumber || !isValidPhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const existingData = JSON.parse(localStorage.getItem('registrationData') || '{}');
      localStorage.setItem('registrationData', JSON.stringify({
        ...existingData,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber
      }));
    } catch (error) {
      console.error('Error saving registration data:', error);
      alert('Error saving data. Please try again.');
      setLoading(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/register/security");
    }, 1000);
    
    return () => clearTimeout(timer);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-8 py-6 sm:py-10 bg-white">
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
        <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
          <img src="/Logo icon.png" alt="Exam Genius" className="w-20 xs:w-24 sm:w-32 h-auto cursor-pointer" />
        </button>
      </div>

      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl mt-16 xs:mt-20 sm:mt-24">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-Poppins font-bold text-[#302711] mb-2 leading-tight">
            Create New Account
          </h1>
          <p className="text-sm xs:text-base text-gray-600 mb-4 sm:mb-6">Join the future of AI-powered assessment.</p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-2 xs:space-x-4 sm:space-x-8 mb-6 sm:mb-8 overflow-x-auto">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                ✓
              </div>
              <span className="text-xs sm:text-sm text-green-600 whitespace-nowrap">Account Details</span>
            </div>
            <div className="w-8 xs:w-12 sm:w-16 h-0.5 bg-green-500"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3B82F6] text-white rounded-full flex items-center justify-center font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                2
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#3B82F6] whitespace-nowrap">Personal Info</span>
            </div>
            <div className="w-8 xs:w-12 sm:w-16 h-0.5 bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                3
              </div>
              <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">Security</span>
            </div>
          </div>
        </div>

        <div className="bg-[#D9F5FF] rounded-2xl sm:rounded-[30px] p-4 xs:p-6 sm:p-8">
          <h2 className="text-lg xs:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">Personal Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* First Name */}
            <div className="relative">
              <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                First Name
              </label>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" style={{top: 'calc(50% + 12px)'}}>
                <CiUser size={18} />
              </div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full h-10 xs:h-12 pl-8 xs:pl-10 pr-3 text-sm xs:text-base bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3B82F6]'
                }`}
                placeholder="Enter your first name"
                required
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="relative">
              <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Last Name
              </label>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" style={{top: 'calc(50% + 12px)'}}>
                <CiUser size={18} />
              </div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full h-10 xs:h-12 pl-8 xs:pl-10 pr-3 text-sm xs:text-base bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3B82F6]'
                }`}
                placeholder="Enter your last name"
                required
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>

            {/* Phone Number */}
            <div className="relative">
              <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Phone Number
              </label>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" style={{top: 'calc(50% + 12px)'}}>
                <CiPhone size={18} />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full h-10 xs:h-12 pl-8 xs:pl-10 pr-3 text-sm xs:text-base bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3B82F6]'
                }`}
                placeholder="Enter your phone number (e.g., +1234567890)"
                required
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full xs:w-auto px-8 xs:px-12 py-2.5 xs:py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] disabled:opacity-50 font-medium text-sm xs:text-base transition-colors"
              >
                {loading ? "Processing..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;