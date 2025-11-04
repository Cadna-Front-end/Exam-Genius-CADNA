import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  
  const stats = [
    { label: "Available Exams", value: "12", color: "bg-blue-500" },
    { label: "Completed", value: "8", color: "bg-green-500" },
    { label: "Average Score", value: "85%", color: "bg-yellow-500" },
    { label: "Time Spent", value: "24h", color: "bg-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/Logo icon.png" alt="Exam Genius" className="h-8" />
            <h1 className="text-xl font-Poppins font-semibold text-[#302711]">Exam Genius</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">{user?.firstName || "User"}</span>
          </div>
        </div>
      </header>
      
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-Poppins font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">Ready to take your next exam?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <div className="w-6 h-6 bg-white rounded"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Exams</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-500">No exams available at the moment.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;