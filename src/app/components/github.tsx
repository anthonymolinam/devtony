import Link from "next/link";
import { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import GithubIcon from "@/app/assets/github.svg";
import Image from "next/image";

export default function Github() {
  const [daysToShow, setDaysToShow] = useState(85);
  const [loading, setLoading] = useState(true);

  // Ajustar el número de días a mostrar según el tamaño de la pantalla
  useEffect(() => {
    const updateDays = () => {
      if (window.innerWidth < 640) {
        setDaysToShow(120); // Mostrar más días en pantallas pequeñas
      } else {
        setDaysToShow(90); // Mostrar menos días en pantallas grandes
      }
    };

    updateDays(); // Inicializa el valor cuando se monta el componente
    window.addEventListener("resize", updateDays); // Escucha cambios de tamaño de ventana
    return () => window.removeEventListener("resize", updateDays); // Limpia el listener
  }, []);

  // Simular el fin de carga cuando el calendario se ha renderizado completamente
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Esconde el mensaje "Cargando..." después de un breve tiempo
    }, 1000); // Tiempo de espera de 1 segundo para mostrar la animación de carga

    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
  }, []);

  const explicitTheme = {
    light: ["#f7f7f5", "#ffd54f", "#0288d1", "#81c784", "#8d6e63"], // Colores suaves para el modo claro
    dark: ["#787878", "#d32f2f", "#fbc02d", "#7e57c2", "#66bb6a"], // Colores más distintivos para el modo oscuro
  };

  return (
    <div className="relative col-start-1 row-start-11 col-span-2 md:col-start-3 md:row-start-4 md:col-span-1 md:row-span-1 rounded-xl p-4 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] overflow-hidden bg-[#e6e5dc] text-black flex flex-col">
      {/* Encabezado fijo arriba a la izquierda */}
      <div className="flex items-center space-x-2 mb-2">
        <Image src={GithubIcon} alt="GitHub logo" />
        <span className="text-md font-semibold">GitHub</span>
      </div>

      {/* Este contenedor llena el espacio restante y centra el contenido */}
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
