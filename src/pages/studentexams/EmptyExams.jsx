const EmptyExams = ({ user }) => {
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <svg className="mx-auto h-32 w-32 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Exams Available</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        There are currently no exams scheduled for you. Check back later or contact your instructor for more information.
      </p>
      
      <div className="space-y-4">
        <button className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg hover:bg-[#2D6AC9] font-medium">
          Refresh Page
        </button>
        <div>
          <button className="text-[#3B82F6] hover:underline font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyExams;