"use client";
import React, { useState, useRef } from "react";
import { BriefcaseBusiness, Globe } from "lucide-react";
import GithubIcon from "@/app/assets/github.svg";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";

export default function Projects() {
  const projectsData = [
    {
      title: "CoeCaribe",
      description:
        "Website for Coecaribe, a clinic that helps people with obesity.",
      githubUrl: "https://github.com/anthonymolinam/coe",
      liveDemoUrl: "https://coecaribe.com/",
    },
    {
      title: "Projecto Dos",
      description:
        "Descripción concisa del segundo proyecto. Incluye información relevante.",
      githubUrl: "https://github.com/anthonymolinam/coe",
      liveDemoUrl: "https://coecaribe.com/",
    },
    {
      title: "Projecto Tres",
      description:
        "Pequeño resumen del tercer proyecto. Destaca sus características principales.",
      githubUrl: "https://github.com/anthonymolinam/coe",
      liveDemoUrl: "https://coecaribe.com/",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePaginationClick = (index: number) => {
    if (swiperRef.current && typeof swiperRef.current.slideTo === "function") {
      swiperRef.current.slideTo(index);
      setActiveIndex(index);
    }
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="col-start-1 row-start-4 col-span-2 md:col-start-2 md:row-start-2 md:col-span-3 md:row-span-1 bg-[#daa6f2] text-[#6f3989] rounded-xl p-10 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-6 sm:mb-4">
        <BriefcaseBusiness className="w-6 h-6" />
        <h1 className="font-semibold text-lg">Projects</h1>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        style={{ width: "100%" }}
      >
        {projectsData.map((project, index) => (
          <SwiperSlide key={index}>
            <div className=" flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold mb-2">{project.title}</h2>
                <p className="text-sm mb-4">{project.description}</p>
              </div>
              <div className="flex gap-2">
                {project.githubUrl && (
                  <Link href={project.githubUrl}>
                    <GithubIcon />
                  </Link>
                )}
                {project.liveDemoUrl && (
                  <Link href={project.liveDemoUrl}>
                    <Globe />
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-custom-pagination">
        {projectsData.map((project, index) => (
          <button
            key={index}
            className={`step-button ${index === activeIndex ? "active" : ""}`}
            onClick={() => handlePaginationClick(index)}
          >
            {project.title}
          </button>
        ))}
      </div>
    </div>
  );
}
