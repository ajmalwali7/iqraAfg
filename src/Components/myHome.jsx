/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setNav } from "../actions";
import { useNavigate } from "react-router-dom";

export function MyHome() {
  const dispatch = useDispatch();
  const logged = useSelector((store) => store.isLogged);
  const user = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme);
  const navigate = useNavigate();

  dispatch(setNav());
  return (
    <div className="bg-base-100 absolute w-full lg:w-[70vw]">
      {!logged ? (
        <div>
          <section>
            <div
              className="hero w-screen min-h-screen"
              style={{
                backgroundImage:
                  "url(https://drive.google.com/uc?id=1tyrWLBDIuytCoSt87NtrCLd7rmyEEdJg&export=view)",
              }}
            >
              <div className="hero-overlay bg-opacity-30"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md bg-accent text-primary opacity-90 p-7 rounded-3xl mb-28">
                  <div className="avatar">
                    <div className=" w-36 h-36 rounded">
                      <img
                        src={`/imgs/logo/${
                          theme === "light" ? "light-logo.png" : "dark-logo.png"
                        }`}
                      />
                    </div>
                  </div>
                  <h1 className="mb-5 text-4xl font-bold">IQRA AFGHANISTAN</h1>
                  <p className="mb-5">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <button
                    onClick={() => navigate("/sign-up")}
                    className="btn btn-primary"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="hero w-screen min-h-screen">
              <div className="hero-content w-10/12 text-neutral-content">
                <div className="text-primary w-full rounded-3xl shadow-xl mt-2 m-3 p-14 bg-accent overflow-x-hidden h-fit">
                  <h1 className="text-3xl font-medium text-center">
                    Our Partners
                  </h1>
                  <card className="mt-12 flex items-center justify-center">
                    <a
                      href="https://omid.edu.af/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        alt="Omid Afghanistan"
                        className="rounded-full w-36 h-36"
                        src="/imgs/partners/omid-logo.png"
                      />
                    </a>
                  </card>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div
              className="hero w-screen min-h-screen"
              style={{
                backgroundImage:
                  "url(https://drive.google.com/uc?id=1tyrWLBDIuytCoSt87NtrCLd7rmyEEdJg&export=view)",
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                  <p className="mb-5">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="hero w-screen min-h-screen">
              <div className="hero-content w-10/12 text-neutral-content">
                <div className="text-primary w-full rounded-3xl shadow-xl mt-2 m-3 p-14 bg-accent overflow-x-hidden h-fit">
                  <h1 className="text-3xl font-medium text-center">
                    Our Partners
                  </h1>
                  <card className="mt-12 flex items-center justify-center">
                    <a
                      href="https://omid.edu.af/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        alt="Omid Afghanistan"
                        className="rounded-full w-36 h-36"
                        src="/imgs/partners/omid-logo.png"
                      />
                    </a>
                  </card>
                </div>
              </div>
            </div>
          </section>
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
