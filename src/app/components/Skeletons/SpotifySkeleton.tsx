export default function SpotifySkeleton() {
  return (
    <div className="relative col-start-1 row-start-9 col-span-2 md:col-start-1 md:row-start-4 md:col-span-2 md:row-span-1 bg-(--box) rounded-4xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] flex flex-col items-center justify-center text-center overflow-hidden animate-pulse">
      <div className="absolute top-3 left-3 z-10 flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
        <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
        <span className="text-xs text-gray-400 font-semibold">Loading...</span>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-24 h-6 bg-gray-500 rounded-md mb-2"></div>
        <div className="w-16 h-4 bg-gray-600 rounded-md"></div>
      </div>
    </div>
  );
}
