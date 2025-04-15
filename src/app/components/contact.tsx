import Link from "next/link";
import Image from "next/image";
import send from "@/app/assets/send.svg";

export default function Contact() {
  return (
    <div className="relative col-start-1 row-start-7 col-span-2 md:col-start-5 md:row-start-3 md:col-span-1 md:row-span-1 bg-[#2b27e3] rounded-xl p-10">
      {/* Contenedor del texto con padding-top */}
      <div className="flex flex-col justify-center items-start h-full pt-0 md:pt-0">
        <h2 className="uppercase font-bold text-white text-lg md:text-3xl mb-4 ">
          Wanna talk? <br /> Send me a message.
        </h2>

        {/* Correo */}
        <Link
          href="mailto:admm1225@gmail.com"
          className="relative text-white text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          admm1225@gmail.com
        </Link>
      </div>
      <div className="absolute top-20 right-0">
        <Image
          src={send}
          alt="Send Icon"
          className="w-[110px] h-auto hidden md:block transform scale-x-[-1] scale-y-[-1]"
        />
      </div>
    </div>
  );
}
