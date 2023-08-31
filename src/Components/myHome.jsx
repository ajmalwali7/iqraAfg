/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setNav } from "../actions";

export function MyHome() {
  const dispatch = useDispatch();
  const logged = useSelector((store) => store.isLogged);
  const user = useSelector((store) => store.user);

  dispatch(setNav());
  return (
    <div className="bg-base-100 absolute w-full lg:w-[70vw]">
      {!logged ? (
        <div
          className="hero w-screen lg:min-h-[90vh] min-h-[93vh] lg:mt-[10vh] mt-[7vh]"
          style={{
            backgroundImage:
              "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 m-4 lg:m-11 gap-3 lg:gap-5 lg:max-w-3xl">
          <a href="/courses">
            <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-white bg-accent overflow-x-hidden">
              <h1 className=" text-xl font-medium">Courses</h1>
            </div>
          </a>
          <a href="/books">
            <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-white bg-accent overflow-x-hidden">
              <h1 className=" text-xl font-medium">Books</h1>
            </div>
          </a>
          <a href="/teachers">
            <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-white bg-accent overflow-x-hidden">
              <h1 className="text-xl font-medium">Teachers</h1>
            </div>
          </a>
          <a href="/my-settings">
            <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-white bg-accent overflow-x-hidden">
              <h1 className=" text-xl font-medium">Settings</h1>
            </div>
          </a>
          {(user.role === "teacher" || user.role === "admin") && (
            <a href="/create-course">
              <div className="text-primary transition-all card shadow-xl h-28 flex justify-center items-center hover:shadow-none hover:bg-primary hover:opacity-70 hover:text-white bg-accent overflow-x-hidden">
                <h1 className=" text-xl font-medium">Create Course</h1>
              </div>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
