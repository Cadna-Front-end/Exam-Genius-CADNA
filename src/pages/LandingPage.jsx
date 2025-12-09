import { useNavigate } from "react-router-dom";
import { IoShieldCheckmarkOutline, IoBookOutline, IoStatsChartOutline, IoGlobeOutline } from "react-icons/io5";
import LogoLink from "../components/LogoLink.jsx";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: IoShieldCheckmarkOutline,
      title: "AI-Powered Security",
      description: "Advanced fraud detection and integrity monitoring"
    },
    {
      icon: IoBookOutline,
      title: "Smart Question Generation",
      description: "AI generates questions across 4 subject areas"
    },
    {
      icon: IoStatsChartOutline,
      title: "Instant Analytics",
      description: "Real-time results and performance insights"
    },
    {
      icon: IoGlobeOutline,
      title: "Accessible Testing",
      description: "Online and offline exam capabilities"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-4 border-b bg-white border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <LogoLink src="/Logo icon.png" className="h-8 sm:h-10" />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => {
                try {
                  navigate("/signin");
                } catch (error) {
                  console.error('Navigation error:', error);
                }
              }}
              className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm sm:text-base transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                try {
                  navigate("/register");
                } catch (error) {
                  console.error('Navigation error:', error);
                }
              }}
              className="px-3 sm:px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] text-sm sm:text-base transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              🚀 Next-Generation Assessment Platform
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-Poppins font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered Assessment
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Platform
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Secure, transparent, and intelligent examination system that addresses integrity,
              efficiency, and accessibility gaps in education and professional testing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                try {
                  navigate("/register");
                } catch (error) {
                  console.error('Navigation error:', error);
                }
              }}
              className="w-full sm:w-auto px-8 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2D6AC9] text-lg font-medium transition-colors"
            >
              Get Started Now
            </button>
            <button
              onClick={() => {
                try {
                  console.info('Learn More clicked');
                } catch (error) {
                  console.error('Learn More error:', error);
                }
              }}
              className="w-full sm:w-auto px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-lg font-medium transition-colors"
            >
              Learn More
            </button>
          </div>
          <div className="mt-12 sm:mt-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl h-48 sm:h-64 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl sm:text-6xl mb-4">📊</div>
                    <p className="text-lg sm:text-xl font-semibold">Interactive Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-Poppins font-bold text-gray-900 mb-4">
              Why Choose Exam Genius?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Built for modern education with cutting-edge AI technology and advanced security features
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-blue-600" size={28} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Areas */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-Poppins font-bold text-gray-900 mb-4">
            Comprehensive Subject Coverage
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">
            AI-generated questions across core academic areas with adaptive difficulty levels
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: "English", icon: "📚", type: "Core Subject" },
              { name: "Mathematics", icon: "🔢", type: "Core Subject" },
              { name: "Science", icon: "🔬", type: "Laboratory" },
              { name: "Social Studies", icon: "🌍", type: "Research" }
            ].map((subject, index) => (
              <div key={index} className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {subject.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{subject.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">{subject.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-Poppins font-bold text-white mb-4 leading-tight">
              Ready to Transform Your Assessment Process?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of educators and institutions worldwide who trust Exam Genius for secure, intelligent assessments
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                try {
                  navigate("/register");
                } catch (error) {
                  console.error('Navigation error:', error);
                }
              }}
              className="w-full sm:w-auto px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => {
                try {
                  console.info('Contact Us clicked');
                } catch (error) {
                  console.error('Contact Us error:', error);
                }
              }}
              className="w-full sm:w-auto px-8 py-3 border border-white text-white hover:bg-white hover:text-blue-600 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </button>
          </div>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-white">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/Logo icon.png" alt="Exam Genius" className="h-8" />
                <h3 className="text-lg font-Poppins font-bold text-white">Exam Genius</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionizing education through AI-powered assessment solutions. Secure, intelligent, and accessible for all.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Exam Genius — Built for smarter learning and assessment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;