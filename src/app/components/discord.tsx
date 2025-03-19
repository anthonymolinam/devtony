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
    // Extraer la URL después de "https/"
    const extractedUrl = image.split("https/")[1]?.replace(/\\/g, "/");
    return `https://${extractedUrl}`;
  }

  // Imagen de Discord App Assets
  return appId
    ? `https://cdn.discordapp.com/app-assets/${appId}/${image}.webp`
    : null;
};

// Función para obtener el mensaje según la actividad
const getActivityMessage = (activityName?: string) => {
  if (!activityName) return "Playing ";
  if (activityName.toLowerCase().includes("spotify"))
    return "Listening to Spotify";
  if (activityName.toLowerCase().includes("visual studio code"))
    return "Developing in VsCode";
  return "Playing ";
};

export default function Discord() {
  const { data, loading } = useLanyard();

  if (loading) return <DiscordSkeleton />;
  if (!data?.discord_status) return <DiscordSkeleton />;

  // Estado de Discord
  const discordStatus = data.discord_status;
  const bgColor = statusColors[discordStatus] ?? "bg-[#81858e]";
  const statusText =
    discordStatus.charAt(0).toUpperCase() + discordStatus.slice(1); // Capitaliza la primera letra

  // Filtrar actividades
  const activity = data.activities?.find(
    (act) => act.name !== "Spotify" && act.type === 0
  );
  const activityImage = getImageUrl(
    activity?.assets?.large_image,
    activity?.application_id
  );
  const activityMessage = getActivityMessage(activity?.name);

  return (
    <div
      className={`col-start-2 row-start-3 md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-1 ${bgColor} rounded-xl p-6 md:p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] flex flex-col items-center justify-center text-white border border-white/10 shadow-lg transition-all duration-300 ease-in-out`}
    >
      {/* Icono de Discord y Estado en la misma línea */}
      <div className="flex items-center gap-2">
        <Image
          src={DiscordIcon}
          alt="Discord"
          width={28}
          height={28}
          quality={100}
          className="w-7 sm:w-8"
        />
        <p className="text-lg font-semibold">{statusText}</p>
      </div>

      {/* Mostrar actividad si existe */}
      {discordStatus !== "offline" && activity && (
        <div className="mt-4 flex items-center gap-2 text-center">
          {activityImage && (
            <Image
              className="rounded-md w-8 h-8 sm:w-10 sm:h-10"
              src={activityImage}
              width={40}
              height={40}
              alt={activity.name}
              unoptimized
            />
          )}
          <p className="font-medium text-sm">{activityMessage}</p>
        </div>
      )}
    </div>
  );
}
