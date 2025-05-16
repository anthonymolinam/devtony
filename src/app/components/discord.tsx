"use client";

import DiscordSkeleton from "@/app/components/Skeletons/DiscordSkeleton";
import useLanyard from "@/hooks/useLanyard";
import Image from "next/image";
import DiscordIcon from "@/app/assets/discord.svg";

// Colores según estado de Discord
const statusColors: Record<string, string> = {
  online: "bg-[#29a55d]",
  idle: "bg-[#fdbf45]",
  dnd: "bg-[#ED4245]",
  offline: "bg-[#81858e]",
};

// Función para obtener la URL de la imagen de actividad
const getImageUrl = (image?: string, appId?: string) => {
  if (!image) return null;

  if (image.startsWith("mp:external/")) {
    const extractedUrl = image.split("https/")[1]?.replace(/\\/g, "/");
    return extractedUrl ? `https://${extractedUrl}` : null;
  }

  return appId
    ? `https://cdn.discordapp.com/app-assets/${appId}/${image}.webp`
    : null;
};

// Función para obtener el mensaje según la actividad
interface Activity {
  name: string;
  details?: string;
  state?: string;
}

const getActivityMessage = (activity?: Activity) => {
  if (!activity) return null;

  if (activity.name === "Spotify") {
    return "Listening to Spotify"; // Detalles de Spotify
  }

  if (activity.name.toLowerCase().includes("visual studio code")) {
    return "Developing in Visual Studio Code";
  }

  return `Playing ${activity.name}`;
};

export default function Discord() {
  const { data, loading } = useLanyard();

  if (loading) return <DiscordSkeleton />;
  if (!data?.discord_status) return <DiscordSkeleton />;

  // Estado de Discord
  const discordStatus = data.discord_status;
  const activity = data.activities?.find(
    (act) => act.type === 0 || act.name === "Spotify"
  );

  const activityImage = getImageUrl(
    activity?.assets?.large_image,
    activity?.application_id
  );
  const activityMessage = getActivityMessage(activity);

  // Si hay imagen de fondo, quitar color de estado
  const bgColor = activityImage
    ? "bg-transparent"
    : statusColors[discordStatus] ?? "bg-[#81858e]";

  return (
    <div
      className={`relative col-start-2 row-start-2 md:col-start-4 md:row-start-1 md:col-span-1 md:row-span-1 ${bgColor} rounded-xl p-6 md:p-10 flex flex-col items-center justify-center text-white border border-white/10 transition-all duration-300 ease-in-out`}
    >
      {/* Imagen de fondo */}
      {activityImage && (
        <Image
          src={activityImage}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-xl opacity-30"
          alt="Activity Background"
          unoptimized
        />
      )}

      {/* Contenido */}
      <div className="relative flex flex-col items-center">
        {/* Icono de Discord y Estado */}
        <div className="flex items-center gap-2">
          <DiscordIcon
            alt="Discord"
            width={28}
            height={28}
            quality={100}
            className="w-7 sm:w-8"
          />
          <p className="text-lg font-semibold">
            {discordStatus.charAt(0).toUpperCase() + discordStatus.slice(1)}
          </p>
        </div>

        {/* Mostrar actividad si existe */}
        {discordStatus !== "offline" && activity && activityMessage && (
          <div className="mt-4 text-center">
            <p className="font-medium text-sm bg-black/50 px-2 py-1 rounded-lg">
              {activityMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
