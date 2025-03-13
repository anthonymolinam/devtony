"use client";
// import Image from "next/image";

import About from "./components/about";
import Contact from "./components/contact";
import Discord from "./components/discord";
import Photo from "./components/photo";
import SpotifyNowListening from "./components/spotifyNowListening";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-11 md:grid-rows-4 gap-4 md:gap-4 m-4 max-w-[1200px]">
        <About />
        <Photo />
        <Contact />
        <Discord />
        <div className="col-start-1 row-start-5 col-span-2 row-span-3 md:col-start-2 md:row-start-2 md:col-span-2 md:row-span-2 bg-[#d3c3d9] rounded-xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] text-black">
          4
        </div>
        <div className="col-start-1 row-start-10 col-span-2 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1 bg-[#eb5a35] rounded-xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px]">
          5
        </div>
        <div className="col-start-1 row-start-8 col-span-2 md:col-start-4 md:row-start-3 md:col-span-1 md:row-span-2 bg-(--box) rounded-xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px]">
          6
        </div>
        <SpotifyNowListening />
        <div className="col-start-1 row-start-11 col-span-2 md:col-start-3 md:row-start-4 md:col-span-1 md:row-span-1 bg-(--box) rounded-xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px]">
          8
        </div>
      </div>
    </div>
  );
}
