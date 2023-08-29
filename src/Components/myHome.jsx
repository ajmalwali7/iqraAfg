/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setNav } from "../actions";

export function MyHome() {
  const dispatch = useDispatch();
  const logged = useSelector((store) => store.isLogged);

  dispatch(setNav());
  return (
    <div className=" bg-base-100 absolute">
      {!logged ? (
        <div
          className="hero w-screen min-h-[90vh] mt-[10vh]"
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
        <div className="text-primary card card-bordered border-secondary m-11 p-9 bg-accent overflow-x-hidden">
          <div className="grid grid-cols-3 gap-2 overflow-x-hidden">
            HOME TAB
          </div>
        </div>
      )}
    </div>
  );
}
