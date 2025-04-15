import Image from "next/image";
import img from "@/app/assets/profile.webp";

export default function Photo() {
  return (
    <div className="col-start-1 row-start-2 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 rounded-xl p-10 bg-[#f090ae] text-[#c14f7c] flex items-center ">
      <div className="">
        <Image src={img} alt="Profile Photo" />
      </div>
    </div>
  );
}
