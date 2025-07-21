import React from "react";

type ExperienceItem = {
  role: string;
  year: string;
  location: string;
};

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      role: "Freelance Developer",
      year: "2023 - 2024",
      location: "Remote",
    },
    {
      role: "SEO Support Specialist",
      year: "2025 - Present",
      location: "On Site",
    },
  ];

  return (
    <div className="relative col-start-1 row-start-1 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-1 bg-[#202120] border-3 border-[#2d2c2d] rounded-2xl p-6 flex flex-col justify-center h-[245px] w-[265px] md:w-[245px] overflow-hidden">
      <h2 className="absolute text-sm font-semibold top-5 left-6 text-gray-300">
        My experience
      </h2>

      <div className="relative mt-6 ml-2">
        {/* Línea que se adapta a la altura de los ítems */}
        <div className="absolute left-[3px] top-3 bottom-3 w-0.5 bg-gray-700"></div>

        {/* Ítems de experiencia */}
        <div className="relative space-y-5">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-6 text-gray-300">
              {/* Punto en la línea */}
              <div className="absolute -left-0 top-3 w-2 h-2 rounded-full bg-gray-400"></div>

              {/* Texto del rol */}
              <p className="text-xs font-medium text-white">{exp.role}</p>

              {/* Detalles adicionales */}
              <p className="text-[11px] text-gray-400">
                {exp.year} ・ {exp.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
