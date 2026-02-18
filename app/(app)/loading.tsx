export default function AppLoading() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-7 w-40 bg-gray-200 rounded-lg" />
          <div className="h-4 w-28 bg-gray-100 rounded-md" />
        </div>
        <div className="h-9 w-28 bg-gray-200 rounded-lg hidden sm:block" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl border border-gray-100 p-4 ${
              i === 0 ? "col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="h-3.5 w-24 bg-gray-100 rounded mb-3" />
            <div className="h-7 w-32 bg-gray-200 rounded-lg" />
            <div className="h-3 w-16 bg-gray-100 rounded mt-2" />
          </div>
        ))}
      </div>

      {/* Chart / content area skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="h-4 w-36 bg-gray-200 rounded mb-4" />
        <div className="h-48 bg-gray-100 rounded-xl" />
      </div>

      {/* List skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
        <div className="h-4 w-28 bg-gray-200 rounded mb-4" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="space-y-1.5 text-right">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-3 w-10 bg-gray-100 rounded ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
