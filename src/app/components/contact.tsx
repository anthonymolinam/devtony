import Link from "next/link";
import Image from "next/image";
import send from "@/app/assets/send.svg";

export default function Contact() {
  return (
    <div className="relative col-start-1 row-start-4 col-span-2 md:col-start-4 md:row-start-1 md:col-span-1 md:row-span-2 bg-[#2b27e3] rounded-xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px]">
      {/* Ícono del avión saliendo de la pared */}
      <div className="absolute left-0">
        <Image
          src={send}
          alt="Send Icon"
          className="w-[210px] h-auto hidden md:block"
        />
      </div>

      {/* Contenedor del texto con padding-top */}
      <div className="pt-0 md:pt-24">
        <h2 className="uppercase font-bold text-white text-lg md:text-4xl mb-4">
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
    </div>
  );
}
