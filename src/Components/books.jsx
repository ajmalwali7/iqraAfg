/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

export function Books() {
  const logged = useSelector((store) => store.isLogged);
  return (
    <>
      {logged && (
        <div className="text-primary card shadow-xl m-11 p-9 bg-accent overflow-x-hidden">
          <h1 className=" card-title text-3xl mb-9">Books:</h1>
          <div className="grid grid-cols-2 gap-3">
            <a href="/books/class7">
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 7</h1>
              </div>
            </a>
            <a href="/books/class8">
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 8</h1>
              </div>
            </a>
            <a href="/books/class9">
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 9</h1>
              </div>
            </a>
            <a href="/books/class10">
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 10</h1>
              </div>
            </a>
            <a href="/books/class11">
              <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-24">
                <h1 className="card-title text-3xl">Class 11</h1>
              </div>
            </a>
            <a href="/books/class12">
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
