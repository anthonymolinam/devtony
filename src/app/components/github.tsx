import Link from "next/link";
import { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import GithubIcon from "@/app/assets/github.svg";
import Image from "next/image";

export default function Github() {
  const [daysToShow, setDaysToShow] = useState(85);
  const [hideMonthLabels, setHideMonthLabels] = useState(true); // Estado para controlar las etiquetas
  const [loading, setLoading] = useState(true);

  // Ajustar el número de días y las etiquetas según el tamaño de la pantalla
  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth < 640) {
        setDaysToShow(120);
        setHideMonthLabels(true); // Mostrar etiquetas en móvil
      } else {
        setDaysToShow(90);
        setHideMonthLabels(false); // Ocultar etiquetas en desktop
      }
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  // Simular carga (opcional)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const explicitTheme = {
    light: ["#f7f7f5", "#ffd54f", "#0288d1", "#81c784", "#8d6e63"],
    dark: ["#787878", "#d32f2f", "#fbc02d", "#7e57c2", "#66bb6a"],
  };

  return (
    <div className="relative col-start-1 row-start-11 col-span-2 md:col-start-3 md:row-start-4 md:col-span-1 md:row-span-1 rounded-xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] overflow-hidden bg-[#e6e5dc] text-black flex flex-col">
      {/* Encabezado alineado como "What I use" */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <Image src={GithubIcon} alt="GitHub logo" className="w-6 h-6" />
        <span className="text-base font-semibold">GitHub</span>
      </div>

      {/* Calendario centrado */}
      <div className="flex-1 flex items-center justify-center relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            Cargando...
          </div>
        )}

        <Link
          href="https://github.com/anthonymolinam"
          target="_blank"
          className={`w-full flex justify-center ${
            loading ? "invisible" : "visible"
          }`}
        >
          <div className="max-w-max">
            <GitHubCalendar
              username="anthonymolinam"
              transformData={(data) => data.slice(-daysToShow)}
              hideTotalCount
              hideMonthLabels={hideMonthLabels}
              blockRadius={4}
              blockMargin={2}
              theme={explicitTheme}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
