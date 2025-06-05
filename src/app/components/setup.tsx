import { Cpu, Keyboard, Microchip, MonitorSpeaker, Mouse } from "lucide-react";

export default function Setup() {
  return (
    <div className="col-start-1 row-start-4 md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-1 bg-[#202120] border-3 border-[#2d2c2d] rounded-2xl p-8 flex flex-col gap-6">
      {/* Título */}
      <div className="flex items-center gap-2">
        <MonitorSpeaker className="w-5 h-5" />
        <h2 className="text-base">What I use</h2>
      </div>

      {/* Lista de especificaciones */}
      <div className="flex flex-col gap-4 text-sm">
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
          <span>AJAZZ AK820 Pro</span>
        </div>
        <div className="flex items-center gap-2">
          <Mouse className="w-5 h-5" />
          <span>Prime Mini Wireless</span>
        </div>
      </div>
    </div>
  );
}
