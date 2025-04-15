import DiscordIcon from "@/app/assets/discord.svg";
import Image from "next/image";

export default function DiscordSkeleton() {
  return (
    <div className="col-start-2 row-start-2 md:col-start-4 md:row-start-1 md:col-span-1 md:row-span-1 bg-[#81858e] rounded-xl p-10 flex flex-col items-center justify-center animate-pulse">
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
