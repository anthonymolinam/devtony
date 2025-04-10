import { Cpu, Microchip, Keyboard, Mouse, MonitorSpeaker } from "lucide-react";

export default function Setup() {
  return (
    <div className="col-start-1 row-start-10 col-span-2 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1 bg-[#eb5a35] rounded-xl p-10 h-full w-auto min-h-[190px] md:min-h-[290px] md:min-w-[290px] sm:min-h-[260px] sm:min-w-[260px] text-white">
      {/* Título alineado arriba a la izquierda */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <MonitorSpeaker className="w-6 h-6" />
        <h2 className="text-lg font-semibold">What I use</h2>
      </div>

      {/* Lista centrada horizontalmente */}
      <div className="w-full flex ">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 text-sm justify-items-start">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            <span>Ryzen 5 5600G</span>
          </div>
          <div className="flex items-center gap-2">
            <Microchip className="w-5 h-5" />
            <span>GTX 1660 Super</span>
          </div>
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            <span>GEODMAER Z11</span>
          </div>
          <div className="flex items-center gap-2">
            <Mouse className="w-5 h-5" />
            <span>Prime Mini Wireless</span>
          </div>
        </div>
      </div>
    </div>
  );
}
