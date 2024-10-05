/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import chaps from "../assets/docs/chapters.json";

export function Chapters() {
  const handle = useParams();
  const c = handle.class;
  const subj = handle.subject;
  return (
    <>
      <div className="flex justify-center mt-10 mb-20">
        <div className="flex flex-col card bg-accent shadow-xl py-7 w-10/12 px-5 gap-3">
          <span className="text-3xl block text-primary-focus font-semibold px-3">
            {`Class ${c} ${subj}`}
          </span>
          {chaps[`class${c}`][subj].map((chap) => (
            <a
              key={chap}
              href={`/class/${c}/${subj}/${chaps[`class${c}`][subj].indexOf(
                chap
              )}`}
            >
              <div className="text-primary transition-all card p-5 shadow-xl flex justify-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-secondary bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">{chap}</h1>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
