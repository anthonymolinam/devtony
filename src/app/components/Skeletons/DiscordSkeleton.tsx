import DiscordIcon from "@/app/assets/discord.svg";
import Image from "next/image";

export default function DiscordSkeleton() {
  return (
    <div className="col-start-2 row-start-3 md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-1 bg-[#81858e] rounded-4xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] flex flex-col items-center justify-center animate-pulse">
      <Image
        src={DiscordIcon}
        alt="Discord"
        width={50}
        height={50}
        className="opacity-50"
        quality={100}
      />
      <div className="mt-4 w-24 h-6 bg-[#747880] rounded-md"></div>
    </div>
  );
}
