import { BriefcaseBusiness, Globe } from "lucide-react";
import GithubIcon from "@/app/assets/github.svg";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <div className="col-start-1 row-start-4 col-span-2 md:col-start-2 md:row-start-2 md:col-span-3 md:row-span-1 bg-[#daa6f2] rounded-xl p-10 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-6 sm:mb-4">
        <BriefcaseBusiness className="text-[#4b3c5d] w-6 h-6" />
        <h1 className="text-[#4b3c5d] font-semibold text-lg">Projects</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Proyecto 1 */}
        <div className="bg-white rounded-xl shadow-md p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-[#4b3c5d] font-semibold mb-2">CoeCaribe</h2>
            <p className="text-gray-600 text-sm mb-4">
              Website for Coecaribe, a clinic that helps people with obesity.
            </p>
          </div>
          <div className="flex gap-2 text-[#4b3c5d]">
            <Link href="">
              <Image
                src={GithubIcon}
                className="w-5 h-5 cursor-pointer"
                alt="Github Icon"
              />
            </Link>
            <Globe className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Proyecto 2 */}
        <div className="bg-white rounded-xl shadow-md p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-[#4b3c5d] font-semibold mb-2">Projecto Dos</h2>
            <p className="text-gray-600 text-sm mb-4">
              Descripción concisa del segundo proyecto. Incluye información
              relevante.
            </p>
          </div>
          <div className="flex gap-2 text-[#4b3c5d]">
            <Link href="">
              <Image
                src={GithubIcon}
                className="w-5 h-5 cursor-pointer"
                alt="Github Icon"
              />
            </Link>
            <Globe className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Proyecto 3 */}
        <div className="bg-white rounded-md shadow-md p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-[#4b3c5d] font-semibold mb-2">Projecto Tres</h2>
            <p className="text-gray-600 text-sm mb-4">
              Pequeño resumen del tercer proyecto. Destaca sus características
              principales.
            </p>
          </div>
          <div className="flex gap-2 text-[#4b3c5d]">
            <Link href="">
              <Image
                src={GithubIcon}
                className="w-5 h-5 cursor-pointer"
                alt="Github Icon"
              />
            </Link>
            <Globe className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
