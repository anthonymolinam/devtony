export default function SpotifySkeleton() {
  return (
    <div className=" relative col-start-1 row-start-6 col-span-2 md:col-start-3 md:row-start-3 md:col-span-2 md:row-span-1 rounded-xl p-10 flex flex-col items-center justify-center text-center overflow-hidden animate-pulse">
      <div className="absolute top-6 left-5 z-10 flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
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
