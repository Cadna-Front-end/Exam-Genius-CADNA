import { useState } from 'react';
import { IoPersonOutline, IoTrashOutline } from 'react-icons/io5';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';

const StudentSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    examReminder: true,
    resultAlerts: true,
    systemUpdates: false,
    webcamAccess: true,
    microphoneAccess: true
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onMenuToggle={() => setSidebarOpen(true)}
        title="Settings"
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
      />
      
      <div className="flex pt-16">
        <Sidebar
          isOpen={sidebarOpen}
          userRole="student"
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 lg:ml-64 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Account Settings Title */}
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            
            {/* Profile Image Section */}
            <div className="w-full flex justify-center items-center space-x-6 py-8">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <IoPersonOutline className="w-12 h-12 text-blue-600" />
              </div>
              <button className="text-blue-600 hover:underline">Edit Profile</button>
            </div>
            
            {/* User Profile Section */}
            <div className="w-1/2">
              <h2 className="text-lg font-semibold mb-4">User Profile</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">First Name</label>
                    <div className="text-gray-900">John</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Last Name</label>
                    <div className="text-gray-900">Doe</div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Email</label>
                  <div className="text-gray-900">john.doe@university.edu</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                  <div className="text-gray-900">+1 (555) 123-4567</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Purpose of Use</label>
                  <div className="text-gray-900">Academic Studies</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Institution</label>
                  <div className="text-gray-900">University of Technology</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Department</label>
                  <div className="text-gray-900">Computer Science</div>
                </div>
              </div>
            </div>
            
            {/* Account Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Account</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Change Password</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Change</button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Enable 2FA</span>
                  <button
                    onClick={() => handleToggle('twoFactorAuth')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Notifications Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-4">
                {[
                  { key: 'examReminder', label: 'Exam Reminder' },
                  { key: 'resultAlerts', label: 'Result Alerts' },
                  { key: 'systemUpdates', label: 'System Updates' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span>{label}</span>
                    <button
                      onClick={() => handleToggle(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[key] ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[key] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Display Preferences Section */}
            <div className="w-1/2">
              <h2 className="text-lg font-semibold mb-4">Display Preferences</h2>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`flex-1 px-4 py-2 ${
                    !darkMode ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  Light Mode
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  className={`flex-1 px-4 py-2 ${
                    darkMode ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  Dark Mode
                </button>
              </div>
            </div>
            
            {/* Privacy and Permissions Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Privacy and Permissions</h2>
              <div className="space-y-4">
                {[
                  { key: 'webcamAccess', label: 'Webcam Access' },
                  { key: 'microphoneAccess', label: 'Microphone Access' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span>{label}</span>
                    <button
                      onClick={() => handleToggle(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[key] ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[key] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Support and Help Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Support and Help</h2>
              <div className="flex space-x-4">
                <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Visit Help Center
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Contact Support
                </button>
              </div>
            </div>
            
            {/* Delete Account Section */}
            <div>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <IoTrashOutline size={16} />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex space-x-4 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSettings;