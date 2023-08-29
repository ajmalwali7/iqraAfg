/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

export function ClassBooks() {
  const logged = useSelector((store) => store.isLogged);
  return (
    <>
      {logged && (
        <div className="text-primary card card-bordered border-secondary m-11 p-9 bg-accent overflow-x-hidden">
          <h1 className=" card-title text-3xl mb-9">Courses:</h1>
          <div className="grid grid-cols-2 gap-3">
            <a>
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 7</h1>
              </div>
            </a>
            <a>
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 8</h1>
              </div>
            </a>
            <a>
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 9</h1>
              </div>
            </a>
            <a>
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 10</h1>
              </div>
            </a>
            <a>
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 11</h1>
              </div>
            </a>
            <a>
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 12</h1>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
