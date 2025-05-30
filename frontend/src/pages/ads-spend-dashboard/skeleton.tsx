export const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="w-24 h-6 bg-gray-300 rounded"></div>
        <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-300 rounded">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <div className="w-20 h-4 bg-gray-400 rounded"></div>
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <div className="w-20 h-4 bg-gray-400 rounded"></div>
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
        </div>
      </div>

      <DashboardPageSkeleton />
    </div>
  );
};

export const DashboardPageSkeleton = () => {
  return (
    <div className="mt-8">
      <div className="w-24 h-6 bg-gray-300 rounded"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-2.5 sm:gap-4 mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-24 p-4 bg-gray-300 shadow-sm sm:h-32 rounded-xl"
          >
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-400 rounded-full sm:h-8 sm:w-8"></div>
                <div className="w-16 h-4 bg-gray-400 rounded sm:w-20"></div>
              </div>
              <div className="w-12 h-6 ml-1 bg-gray-400 rounded sm:h-8 sm:w-16"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="w-32 h-6 bg-gray-300 rounded"></div>
        <div className="w-20 h-6 bg-gray-300 rounded md:hidden"></div>
      </div>

      <div className="hidden md:block">
        <div className="w-full h-10 bg-gray-300 rounded-t-lg"></div>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-full h-16 bg-white border-b border-gray-200"
          >
            <div className="grid items-center h-full grid-cols-7 px-4">
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-6 mx-auto bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 md:hidden">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between mb-3">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between mb-3">
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
        <div className="w-full h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};
