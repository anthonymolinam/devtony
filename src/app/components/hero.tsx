import { AtSign } from "lucide-react";

export default function Hero() {
  return (
    <div className="flex flex-col items-start py-10 left">
      <div className="flex items-center mb-6">
        <AtSign />
        <a href="#" className="text-white no-underline text-sm">
          admm1225@gmail.com
        </a>
      </div>
      {/* Main Heading */}
      <h1 className="text-6xl font-bold mb-2 leading-tight">
        Hi, I&#39;m <span className="text-[#DF2935]">Anthony</span>
        <span className="inline-block transform -rotate-12 origin-bottom-left text-5xl">
          👋
        </span>
      </h1>
      {/* Sub-heading and "Open to work" badge */}
      <div className="flex items-center mb-8">
        <p className="text-3xl font-bold mr-4">I&#39;m a Computer Engineer.</p>
        {/* Open to work badge - AÑADIDO: flex-shrink-0 */}
        <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm font-medium">Open to work</span>
        </div>
      </div>
      {/* Call to Action and Additional Message - CAMBIOS APLICADOS AQUÍ */}
      <div className="flex flex-col md:flex-row items-start md:items-center mt-2">
        {/* Párrafo del mensaje - AÑADIDO: order-1, md:order-2, mb-4, md:mb-0, md:mr-6 */}
        <p className="text-base order-1 md:order-2 mb-4 md:mb-0 md:ml-4">
          Hello and welcome to my digital space! Take a look around; I&apos;ve
          meticulously coded everything here to work perfectly... probably!
        </p>
        {/* Botón Get in touch - AÑADIDO: order-2, md:order-1, flex-shrink-0 */}
        <button className="bg-[#7D80DA] text-white border-none py-3 px-8 rounded-full cursor-pointer text-base font-semibold order-2 md:order-1 flex-shrink-0">
          Get in touch
        </button>
      </div>
    </div>
  );
}
