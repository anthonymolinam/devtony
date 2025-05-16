"use client";
import Unkwon from "./components/3";
// import Image from "next/image";

import About from "./components/about";
import Contact from "./components/contact";
import Discord from "./components/discord";
import Github from "./components/github";
import Photo from "./components/photo";
import Projects from "./components/projects";
import Setup from "./components/setup";
import Spotify from "./components/spotify";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid w-full md:h-[calc(100vh-64px)] h-auto grid-cols-2 md:grid-cols-5 grid-rows-7 md:grid-rows-3 gap-4 mx-4 md:mx-50 my-4">
        <About />
        <Photo />
        <Discord />
        <Unkwon />
        <Setup />
        <Projects />
        <Github />
        <Spotify />
        <Contact />
      </div>
    </div>
  );
}
