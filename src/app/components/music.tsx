import Image from "next/image";
import playlist1 from "@/app/assets/playlist1.jpg";
import playlist2 from "@/app/assets/playlist2.jpg";
import playlist3 from "@/app/assets/playlist3.jpg";
import Link from "next/link";

export default function Music() {
  return (
    <div className="col-start-1 row-start-2 md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-1 bg-[#202120] border-3 border-[#2d2c2d] rounded-2xl p-10 flex items-center justify-center h-[245px] w-[265px] md:w-[245px]">
      <div className="w-[260px] text-white text-center">
        {/* Texto superior */}
        <p className="text-sm text-gray-300 mb-3">My music playlist</p>

        {/* Carrusel de portadas */}
        <div className="relative flex justify-center items-center h-[140px] mb-4">
          {/* Imagen izquierda */}
          <div className="absolute -left-6 transform -rotate-6 scale-100 z-0">
            <Image
              src={playlist2}
              alt="Left Cover"
              width={90}
              height={90}
              className="w-[90px] h-[90px] rounded-lg border-2 border-white object-cover"
            />
          </div>

          {/* Imagen central */}
          <div className="z-10">
            <Image
              src={playlist1}
              alt="Center Cover"
              width={112}
              height={112}
              className="w-28 h-28 rounded-xl border-2 border-white object-cover"
            />
          </div>

          {/* Imagen derecha */}
          <div className="absolute -right-6 transform rotate-6 scale-100 z-0">
            <Image
              src={playlist3}
              alt="Right Cover"
              width={90}
              height={90}
              className="w-[90px] h-[90px] rounded-lg border-2 border-white object-cover"
            />
          </div>
        </div>

        {/* Nombre del playlist */}
        <Link href="https://music.apple.com/profile/anthonymolina">
          <h2 className="font-semibold text-lg">Anthony Playlist</h2>
          <p className="text-sm text-[#FF4E6B]">▶ Play on Apple Music</p>
        </Link>
      </div>
    </div>
  );
}
