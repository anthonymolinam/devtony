"use client";

import DiscordSkeleton from "@/app/components/Skeletons/DiscordSkeleton";
import useLanyard from "@/hooks/useLanyard";
import Image from "next/image";
import DiscordIcon from "@/app/assets/discord.svg";

export default function Discord() {
  const { data, loading } = useLanyard();

  if (loading || !data || !data.discord_status) {
    return <DiscordSkeleton />;
  }

  const statusColors: Record<string, string> = {
    online: "bg-[#29a55d]",
    idle: "bg-[#FEE75C]",
    dnd: "bg-[#ED4245]",
    offline: "bg-[#81858e]",
  };

  const discordStatus = data.discord_status;
  const bgColor = statusColors[discordStatus] || "bg-[#81858e]";

  return (
    <div
      className={`col-start-2 row-start-3 md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-1 ${bgColor} rounded-4xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] flex flex-col items-center justify-center text-white`}
    >
      <Image
        src={DiscordIcon}
        alt="Discord"
        width={50}
        height={50}
        quality={100}
      />
      <p className="mt-4 text-base">{discordStatus}</p>
    </div>
  );
}
