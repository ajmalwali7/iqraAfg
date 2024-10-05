/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";

export function Class() {
  const handle = useParams();
  const c = handle.class;
  return (
    <>
      <div className="flex justify-center mt-10 mb-20">
        <div className="flex flex-col card bg-accent shadow-xl py-7 w-10/12 px-5 gap-3">
          <span className="text-3xl block text-primary-focus font-semibold px-3">
            {`Class ${c}`}
          </span>
          <div className="grid grid-cols-2 m-4 lg:m-11 gap-3 lg:gap-5 lg:max-w-3xl">
            <a href={`/class/${c}/Holy-Quran`}>
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">Holy Quran</h1>
              </div>
            </a>
            <a href={`/class/${c}/Islamic-Education`}>
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">Islamic Education</h1>
              </div>
            </a>
            <a href={`/class/${c}/Mathematics`}>
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className="text-xl font-medium">Mathematics</h1>
              </div>
            </a>
            <a href={`/class/${c}/Physics`}>
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">Physics</h1>
              </div>
            </a>
            <a href={`/class/${c}/Biology`}>
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">Biology</h1>
              </div>
            </a>
            <a href={`/class/${c}/Chemistry`}>
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">Chemistry</h1>
              </div>
            </a>
            <a href={`/class/${c}/Pashto`}>
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">Pashto</h1>
              </div>
            </a>
            <a href={`/class/${c}/Dari`}>
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">Dari</h1>
              </div>
            </a>
            <a href={`/class/${c}/English`}>
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">English</h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
