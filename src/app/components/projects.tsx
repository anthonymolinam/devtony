import Image from "next/image";
import Prueba from "@/app/assets/prueba.png";
import { FolderKanban } from "lucide-react"; // Un ícono de carpeta para Projects, ¡solo una sugerencia!

export default function Projects() {
  return (
    <div className="col-start-1 row-start-5 row-span-2 md:col-start-2 md:row-start-2 md:col-span-2 md:row-span-1 bg-[#202120] border-3 border-[#2d2c2d] rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden h-[245px]">
      {/* Título de Projects (similar a "What I use" con su propio fondo) */}
      <div className="flex items-center gap-2 z-20">
        {/* Este div es el que ahora tiene el fondo y el padding */}
        <div className="flex items-center gap-2 px-4 py-1 bg-black text-white rounded-full ">
          <FolderKanban className="w-5 h-5" /> {/* Ícono de ejemplo */}
          <h2 className="text-base font-base">Projects</h2>
        </div>
      </div>

      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={Prueba}
          alt="CoeCaribe Project"
          fill
          className="object-cover w-full h-full [mask-image:linear-gradient(to_bottom,white,white,transparent)]"
          priority
        />
      </div>

      {/* Gradiente de desvanecimiento fuerte */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#202120] via-[#202120cc] to-transparent z-10" />

      {/* Texto centrado encima */}
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="text-2xl font-semibold tracking-wide">CoeCaribe</h2>
        <p className="text-xs uppercase text-white/80">Colombia</p>
        <p className="text-xs text-white/70">Ubicación del proyecto</p>
      </div>
    </div>
  );
}
