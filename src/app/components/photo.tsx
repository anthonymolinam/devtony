import Image from "next/image";
import img from "@/app/assets/profile.webp";

export default function Photo() {
  return (
    <div className="col-start-1 row-start-3 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 bg-[#f090ae] rounded-xl p-10 min-h-[180px] min-w-[180px] md:max-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] text-[#c14f7c] flex items-center justify-center">
      <div className="">
        <Image src={img} alt="Profile Photo" quality={100} />
      </div>
    </div>
  );
}
