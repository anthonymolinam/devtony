import Hero from "./components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-start min-h-screen p-4 max-w-[800px] mx-auto ">
      <Hero />
      {/* Añadida la clase w-full al div del grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-6 md:grid-rows-2 gap-4 md:gap-4 my-4 w-full ">
        <div className="col-start-1 row-start-1 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-1 bg-gray-300 rounded-xl p-10 flex items-center justify-center h-[245px]">
          0
        </div>
        <div className="col-start-1 row-start-2 md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-1 bg-gray-300 rounded-xl p-10 flex items-center justify-center">
          1
        </div>
        <div className="col-start-1 row-start-3 md:col-start-3 md:row-start-1 md:col-span-1 md::row-span-1 bg-gray-300 rounded-xl p-10 flex items-center justify-center">
          2
        </div>
        <div className="col-start-1 row-start-4 md:col-start-1 md:row-start-2 md::col-span-1 md::row-span-1 bg-gray-300 rounded-xl p-10 flex items-center justify-center">
          3
        </div>
        <div className="col-start-1 row-start-5 row-span-2 md:col-start-2 md:row-start-2 md:col-span-2 md:row-span-1 bg-gray-300 rounded-xl p-10 flex items-center justify-center">
          Projects
        </div>
      </div>
    </div>
  );
}
