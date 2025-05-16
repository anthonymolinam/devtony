import { BriefcaseBusiness, Globe } from "lucide-react";
import GithubIcon from "@/app/assets/github.svg";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const textColor = "#282828";
  const cardBackgroundColor = "#f0f0f0";

  const projectsData = [
    {
      title: "CoeCaribe",
      description:
        "Website for Coecaribe, a clinic that helps people with obesity.",
      githubUrl: "",
      liveDemoUrl: "",
    },
    {
      title: "Projecto Dos",
      description:
        "Descripción concisa del segundo proyecto. Incluye información relevante.",
      githubUrl: "",
      liveDemoUrl: "",
    },
    {
      title: "Projecto Tres",
      description:
        "Pequeño resumen del tercer proyecto. Destaca sus características principales.",
      githubUrl: "",
      liveDemoUrl: "",
    },
  ];

  return (
    <div className="col-start-1 row-start-4 col-span-2 md:col-start-2 md:row-start-2 md:col-span-3 md:row-span-1 bg-[#daa6f2] rounded-xl p-10 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-6 sm:mb-4">
        <BriefcaseBusiness className={`[color:${textColor}] w-6 h-6`} />
        <h1 className={`[color:${textColor}] font-semibold text-lg`}>
          Projects
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className={`${cardBackgroundColor} rounded-xl shadow-md p-4 flex-1 flex flex-col justify-between`}
          >
            <div>
              <h2 className={`[color:${textColor}] font-semibold mb-2`}>
                {project.title}
              </h2>
              <p className={`[color:${textColor}] text-sm mb-4`}>
                {project.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={project.githubUrl || ""}
                className={`[color:${textColor}] ${
                  project.githubUrl ? "cursor-pointer" : ""
                }`}
              >
                <Image src={GithubIcon} className="w-5 h-5" alt="Github Icon" />
              </Link>
              <Link
                href={project.liveDemoUrl || ""}
                className={`[color:${textColor}] ${
                  project.liveDemoUrl ? "cursor-pointer" : ""
                }`}
              >
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
