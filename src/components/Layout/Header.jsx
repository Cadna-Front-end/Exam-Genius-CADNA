import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoNotificationsOutline, IoPersonOutline, IoMenuOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition";

const Header = ({ onMenuToggle, title }) => {
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogoClick = () => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/student');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0 flex-1">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 flex-shrink-0 mr-3"
          >
            <IoMenuOutline size={20} />
          </button>
          <div className="hidden lg:flex items-center">
            <button onClick={handleLogoClick} className="flex items-center">
              <img src="/Logo icon.png" alt="Exam Genius" className="h-8 flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer" />
            </button>
          </div>
          <div className="lg:hidden">
            <h1 className="text-lg font-Poppins font-semibold text-[#302711]">
              {title || "Dashboard"}
            </h1>
          </div>
          <div className="hidden lg:block" style={{paddingLeft: '10rem'}}>
            <h1 className="text-lg font-Poppins font-semibold text-[#302711]">
              {title || "Dashboard"}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 relative">
            <IoNotificationsOutline size={20} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1 -translate-y-1">
              3
            </span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              <IoPersonOutline size={20} />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;