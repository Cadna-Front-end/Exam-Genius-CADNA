import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  IoHomeOutline, 
  IoDocumentTextOutline, 
  IoStatsChartOutline, 
  IoSettingsOutline,
  IoPeopleOutline,
  IoCreateOutline,
  IoLibraryOutline,
  IoChatbubbleOutline,
  IoLogOutOutline
} from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextDefinition";

const Sidebar = ({ isOpen, userRole = "student", onClose }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const studentLinks = [
    { to: "/student", icon: IoHomeOutline, label: "Dashboard" },
    { to: "/student/exams", icon: IoDocumentTextOutline, label: "Exams" },
    { to: "/student/results", icon: IoStatsChartOutline, label: "Results" },
    { to: "/student/resources", icon: IoLibraryOutline, label: "Study Resources" },
    { to: "/student/settings", icon: IoSettingsOutline, label: "Settings" }
  ];

  const adminLinks = [
    { to: "/admin", icon: IoHomeOutline, label: "Dashboard" },
    { to: "/admin/exams", icon: IoCreateOutline, label: "Manage Exams" },
    { to: "/admin/students", icon: IoPeopleOutline, label: "Students" },
    { to: "/admin/analytics", icon: IoStatsChartOutline, label: "Analytics" },
    { to: "/admin/settings", icon: IoSettingsOutline, label: "Settings" }
  ];

  const links = userRole === "admin" ? adminLinks : studentLinks;

  return (
    <>

      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50
          bg-blue-500 shadow-lg border-r border-blue-600
          transition-transform duration-300 ease-in-out
          w-64
          ${
            isOpen 
              ? "translate-x-0" 
              : "-translate-x-full lg:translate-x-0"
          }
        `}>
        <div className="p-4 border-b hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/Logo icon.png" alt="Exam Genius" className="h-6" />
              <h3 className="font-Poppins font-bold text-[#302711]">Exam Genius</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* Logo */}
        <div className="p-4 border-b border-blue-500 hidden">
          <div className="flex items-center space-x-2">
            <img src="/Logo icon.png" alt="Exam Genius" className="h-6" />
            <h3 className="font-Poppins font-bold text-white">Exam Genius</h3>
          </div>
        </div>
        
        <nav className="space-y-2 flex-1 overflow-y-auto h-full flex flex-col pt-16">
          <div className="flex-1">
            {links.map(({ to, icon: Icon, label }) => {
              const isActive = location.pathname === to || (to !== `/${userRole}` && location.pathname.startsWith(to));
              return (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => window.innerWidth < 1024 && onClose && onClose()}
                  className={`flex items-center space-x-3 px-6 py-3 transition-colors ${
                    isActive
                      ? "bg-black bg-opacity-30 text-white"
                      : "text-white text-opacity-80 hover:bg-black hover:bg-opacity-20 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </NavLink>
              );
            })}
          </div>
          
          {/* Logout at bottom */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-6 py-3 transition-colors text-white text-opacity-80 hover:bg-black hover:bg-opacity-20 hover:text-white mt-auto"
          >
            <IoLogOutOutline size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;