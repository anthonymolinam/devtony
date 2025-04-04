import { Cat } from "lucide-react";

export default function About() {
  return (
    <div className="col-start-1 row-start-1 col-span-2 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-1 bg-[#015e43] rounded-xl p-10 min-h-[180px] min-w-[180px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] text-[#48a48b]">
      <div className="flex items-center space-x-2">
        <Cat className="text-[#48a48b]" />
        <h2 className="text-xl font-bold uppercase tracking-[3px]">About</h2>
      </div>
      <p className="text-xl font-normal mt-4 text-white">
        Hey! I’m DevTony, a Frontend Developer and Computer Engineer who turns
        caffeine into sleek interfaces. Welcome to my portfolio, where
        everything works… probably.
      </p>
    </div>
  );
}
