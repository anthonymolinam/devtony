import Image from "next/image";
import playlist1 from "@/app/assets/playlist1.jpg";
import playlist2 from "@/app/assets/playlist2.jpg";
import playlist3 from "@/app/assets/playlist3.jpg";
import Link from "next/link";

export default function Music() {
  return (
    <div className="relative bg-[#202120] border-3 border-[#2d2c2d] rounded-2xl p-6 h-[245px] w-[265px] md:w-[245px] flex flex-col justify-center items-center">
      {/* Texto esquinado */}
      <p className="absolute top-5 left-6 text-sm text-gray-300">
        My music playlist
      </p>

      {/* Contenido central */}
      <div className="mt-10 flex flex-col items-center justify-center">
        {/* Carrusel */}
        <div className="relative flex justify-center items-center mb-4">
          {/* Imagen izquierda */}
          <div className="absolute -left-4 -rotate-6 z-0">
            <Image
              src={playlist2}
              alt="Left Cover"
              width={70}
              height={70}
              className="rounded-lg border-2 border-white object-cover"
            />
          </div>

          {/* Imagen central */}
          <div className="z-10">
            <Image
              src={playlist1}
              alt="Center Cover"
              width={90}
              height={90}
              className="rounded-xl border-2 border-white object-cover"
            />
          </div>

          {/* Imagen derecha */}
          <div className="absolute -right-4 rotate-6 z-0">
            <Image
              src={playlist3}
              alt="Right Cover"
              width={70}
              height={70}
              className="rounded-lg border-2 border-white object-cover"
            />
          </div>
        </div>

        {/* Texto inferior */}
        <Link
          href="https://music.apple.com/profile/anthonymolina"
          className="text-center"
        >
          <h2 className="font-semibold text-lg text-white">Anthony Playlist</h2>
          <p className="text-sm text-[#FF4E6B]">▶ Play on Apple Music</p>
        </Link>
      </div>
    </div>
  );
}
