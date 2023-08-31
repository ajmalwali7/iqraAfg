/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function Courses() {
  const logged = useSelector((store) => store.isLogged);
  useEffect(() => (document.title = "Courses: Iqra Afghanistan"), []);
  return (
    <>
      {logged && (
        <div className="text-primary card shadow-xl mt-2 m-3 p-9 bg-accent overflow-x-hidden h-fit lg:mt-9 lg:m-11">
          <h1 className="card-title text-3xl mb-9">Courses:</h1>
          <div className="grid grid-cols-2 gap-3">
            <a href="/courses/class7">
              <div className="card bg-secondary text-accent cursor-pointer p-4 shadow-xl hover:shadow-none hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 7</h1>
              </div>
            </a>
            <a href="/courses/class8">
              <div className="card bg-secondary text-accent cursor-pointer p-4 shadow-xl hover:shadow-none hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 8</h1>
              </div>
            </a>
            <a href="/courses/class9">
              <div className="card bg-secondary text-accent cursor-pointer p-4 shadow-xl hover:shadow-none hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 9</h1>
              </div>
            </a>
            <a href="/courses/class10">
              <div className="card bg-secondary text-accent cursor-pointer p-4 shadow-xl hover:shadow-none hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 10</h1>
              </div>
            </a>
            <a href="/courses/class11">
              <div className="card bg-secondary text-accent cursor-pointer p-4 shadow-xl hover:shadow-none hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 11</h1>
              </div>
            </a>
            <a href="/courses/class12">
              <div className="card bg-secondary text-accent cursor-pointer p-4 shadow-xl hover:shadow-none hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 12</h1>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
