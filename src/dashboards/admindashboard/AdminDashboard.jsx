import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  
  const stats = [
    { label: "Total Students", value: "1,247", color: "bg-blue-500" },
    { label: "Active Exams", value: "23", color: "bg-green-500" },
    { label: "Completed Today", value: "156", color: "bg-yellow-500" },
    { label: "Success Rate", value: "87%", color: "bg-purple-500" }
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
            <span className="text-sm font-medium">{user?.firstName || "Admin"}</span>
          </div>
        </div>
      </header>
      
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-Poppins font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Monitor and manage your examination platform</p>
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
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-500">No recent activity.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;