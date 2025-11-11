import { IoBookOutline, IoTrophyOutline, IoCheckmarkCircleOutline, IoTrendingUpOutline, IoShieldCheckmarkOutline, IoRibbonOutline } from "react-icons/io5";

const EmptyDashboard = ({ user }) => {
  const emptyStats = [
    { label: "Upcoming Exams", value: "0", icon: IoBookOutline, color: "bg-gray-400" },
    { label: "Total Certificates Earned", value: "0", icon: IoRibbonOutline, color: "bg-gray-400" },
    { label: "Completed Exams", value: "0", icon: IoCheckmarkCircleOutline, color: "bg-gray-400" },
    { label: "Performance Score Trend", value: "0%", icon: IoTrendingUpOutline, color: "bg-gray-400" }
  ];

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl xs:text-2xl sm:text-3xl font-Poppins font-bold text-gray-900 mb-2">
          Hello, {user?.firstName || user?.name || 'Student'}
        </h1>
        <p className="text-gray-600 text-sm xs:text-base">
          Ready to start your journey, {user?.firstName || user?.name || 'Student'}?
        </p>
      </div>

      {/* Empty Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8">
        {emptyStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm border h-24 sm:h-28">
            <div className="flex items-start h-full">
              <div className={`${stat.color} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
                <stat.icon className="text-white" size={18} />
              </div>
              <div className="ml-3 min-w-0 flex-1 flex flex-col justify-center h-full">
                <p className="text-xs sm:text-sm font-medium text-gray-500 leading-tight mb-1">{stat.label}</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-400">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Integrity Status - Full Width */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-gray-400 p-3 rounded-lg flex-shrink-0">
            <IoShieldCheckmarkOutline className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-600 mb-1">AI Integrity Status</p>
            <p className="text-xl font-bold text-gray-900">Not Active</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 ml-16">No exams taken yet - integrity monitoring will begin with your first exam</p>
      </div>

      {/* Illustration and Message */}
      <div className="text-center py-12">
        <div className="mb-6">
          <svg className="mx-auto h-32 w-32 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your progress will appear here</h3>
        <p className="text-gray-600 mb-6">Start taking exams to see your performance and progress.</p>
        // amazonq-ignore-next-line
        // amazonq-ignore-next-line
        // amazonq-ignore-next-line
        <button className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg hover:bg-[#2D6AC9] font-medium">
          Go to Exams
        </button>
      </div>
    </main>
  );
};

export default EmptyDashboard;