/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setNav } from "../actions";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";

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
                <div className="max-w-md bg-accent text-primary opacity-90 p-7 rounded-3xl mb-24">
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
                    {`A pioneering initiative dedicated to transforming the lives of students in Afghanistan through accessible online education.`}
                    <br />
                    {`At the heart of our mission lies a commitment to breaking down barriers and ensuring that every student, regardless of their circumstances, has the opportunity to receive a quality education.`}
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
                <div
                  className="text-primary bg-cover w-full rounded-3xl shadow-xl mt-2 m-3 p-14 bg-accent overflow-x-hidden h-fit"
                  style={{
                    backgroundImage: `url(${
                      theme === "light"
                        ? `https://drive.google.com/uc?id=192apgQQWQSLy60x-gUMzLWs4b7h_ch2n&export=view`
                        : `https://drive.google.com/uc?id=1gqE3g5HtYTrBlrMuY5k6uu1dfxFQqur3&export=view`
                    })`,
                  }}
                >
                  <div className="flex items-center justify-center">
                    <p>
                      <strong>
                        <em>IQRA AFGHANISTAN,</em>
                      </strong>{" "}
                      a pioneering initiative dedicated to transforming the
                      lives of students in Afghanistan through accessible online
                      education{" "}
                      <a
                        className="hover:cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => navigate("/about-us")}
                      >
                        <em>read more about us...</em>
                      </a>
                      <br />
                      <br />
                      <strong>
                        <em>Our Vision</em>
                      </strong>{" "}
                      is simple yet profound: to empower Afghan students with
                      the knowledge and skills they need to shape their own
                      futures. We believe that education is not just a right but
                      a fundamental tool for personal growth, community
                      development, and societal progress. We are driven by the
                      belief that when students are educated, they become agents
                      of change, capable of overcoming obstacles and achieving
                      their dreams,{" "}
                      <a
                        className="hover:cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => navigate("/about-us")}
                      >
                        <em>read more about us...</em>
                      </a>
                      <br />
                      <br />
                      <strong>
                        <em>Our Mission</em>
                      </strong>{" "}
                      is to provide a safe, inclusive, and accessible online
                      learning environment where students can thrive
                      academically and personally. We strive to bridge the
                      education gap that has left many Afghan students without
                      access to formal schooling,{" "}
                      <a
                        className="hover:cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => navigate("/about-us")}
                      >
                        <em>read more about us...</em>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div
              className="hero w-screen min-h-screen"
              style={{
                backgroundImage:
                  "url(https://drive.google.com/uc?id=1BHD_hchT_odHa0fHjcg1f52HKcbO31vF&export=view)",
              }}
            >
              <div className="hero-overlay bg-opacity-40"></div>
              <div className="hero-content w-10/12 text-neutral-content">
                <div className="text-primary w-full rounded-3xl shadow-xl mt-2 m-3 p-14 bg-accent opacity-90 overflow-x-hidden h-fit">
                  <h1 className="text-3xl font-medium text-center">
                    Our Partners
                  </h1>
                  <div className="mt-12 flex items-center justify-center">
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
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="hero w-screen">
              <div className="hero-content w-10/12 text-neutral-content">
                <div className="text-primary bg-cover w-full rounded-3xl shadow-xl mt-2 m-3 p-14 bg-accent overflow-x-hidden h-fit">
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-medium text-center">
                      Contact Us
                    </h1>
                    <br />
                    <p>
                      <strong>
                        <em>Email:</em>
                      </strong>{" "}
                      contact@iqraafg.com{" "}
                    </p>
                    <br />
                    <div className="flex flex-row gap-8 justify-center items-center">
                      <a className="opacity-60 hover:opacity-100 hover:cursor-pointer">
                        <FontAwesomeIcon
                          icon={faXTwitter}
                          className="text-3xl"
                        />
                      </a>
                      <a className="opacity-60 hover:opacity-100 hover:cursor-pointer">
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className="text-3xl"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div className="hero w-screen min-h-[40vh] bg-accent shadow-inner flex flex-col">
              <div className="px-10 grid grid-cols-3 w-screen min-h-[40vh]">
                <div className="flex flex-col gap-4 p-7">
                  <div className="avatar">
                    <div className="w-24 h-24 rounded">
                      <img
                        src={`/imgs/logo/${
                          theme === "light" ? "light-logo.png" : "dark-logo.png"
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-primary opacity-70">
                    A pioneering initiative dedicated to transforming the lives
                    of students in Afghanistan through accessible online
                    education. At the heart of our mission lies a commitment to
                    breaking down barriers and ensuring that every student,
                    regardless of their circumstances, has the opportunity to
                    receive a quality education,{" "}
                    <span className="hover:cursor-pointer font-medium">
                      <a onClick={() => navigate("/about-us")}>
                        <em>read more...</em>
                      </a>
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-3 p-7 text-primary">
                  <a className="p-0" href="/">
                    <span>Home</span>
                  </a>
                  <a className="p-0" href="/about-us">
                    <span>About Us</span>
                  </a>
                  <a className="p-0" href="/our-partners">
                    <span>Our Partners</span>
                  </a>
                  <a className="p-0" href="/privacy-policy">
                    <span>Privacy Policy</span>
                  </a>
                  <a className="p-0" href="/terms-conditions">
                    <span>Terms & Conditions</span>
                  </a>
                </div>
                <div className="flex flex-col justify-between p-7">
                  <div className="flex flex-col gap-2">
                    <button
                      className="btn btn-outline text-primary border-primary hover:text-primary hover:bg-slate-200 w-full rounded-2xl p-0"
                      onClick={() => {
                        navigate("/log-in");
                      }}
                    >
                      Log In
                    </button>
                    <button
                      className="btn btn-secondary opacity-100 w-full rounded-2xl p-0"
                      onClick={() => {
                        navigate("/sign-up");
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="text-primary">
                    <div className="flex flex-row gap-8 justify-end items-center">
                      <span>
                        <em>Follow Us:</em>
                      </span>
                      <a className="opacity-60 hover:opacity-100 hover:cursor-pointer">
                        <FontAwesomeIcon
                          icon={faXTwitter}
                          className="text-3xl"
                        />
                      </a>
                      <a className="opacity-60 hover:opacity-100 hover:cursor-pointer">
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className="text-3xl"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                <span className="m-2 mb-0 text-base p-0 text-primary items-center">
                  <FontAwesomeIcon icon={faCopyright} /> 2023 IQRA AFGHANISTAN,
                  All Rights Reserved
                </span>
              </p>
              <p className="pb-10">
                <span className="m-2 mb-0 text-base p-0 text-primary items-center">
                  Made with{" "}
                  <FontAwesomeIcon icon={faHeart} className="text-error" /> by{" "}
                  <a
                    href="https://twitter.com/ajmalwali7"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-50 underline"
                  >
                    AJMAL WALI
                  </a>
                  , for AFGHAN GIRLS
                </span>
              </p>
            </div>
          </footer>
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
