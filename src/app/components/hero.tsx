import { AtSign } from "lucide-react";

export default function Hero() {
  return (
    <div className="flex flex-col items-start py-10 left">
      <div className="flex items-center mb-6">
        <AtSign />
        <div className="w-2 h-2 rounded-full bg-[#CC2936] mr-2"></div>
        <a href="#" className="text-white no-underline text-sm">
          admm1225@gmail.com
        </a>
      </div>
      {/* Main Heading */}
      <h1 className="text-6xl font-extrabold mb-2 leading-tight">
        Hi, I&#39;m <span className="text-[#DF2935]">Anthony</span>
        <span className="inline-block transform -rotate-12 origin-bottom-left text-5xl">
          👋
        </span>
      </h1>
      {/* Sub-heading and "Open to work" badge */}
      <div className="flex items-center mb-8">
        <p className="text-3xl font-medium mr-4">
          I&#39;m a Software Engineer.
        </p>
        {/* Open to work badge */}
        <div className="flex items-center border border-gray-300 rounded-full py-2 px-4">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm font-medium">Open to work</span>
        </div>
      </div>
      {/* Call to Action and Additional Message */}
      <div className="flex items-center mt-2">
        <button className="bg-[#7D80DA] text-white border-none py-3 px-8 rounded-full cursor-pointer text-base font-semibold mr-6">
          Book a call
        </button>
        <p className="text-base">
          Welcome to my portfolio, where everything works… probably.
        </p>
      </div>
    </div>
  );
}
