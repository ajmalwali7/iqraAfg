/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
  darkTheme,
  lightTheme,
  logOut,
  engLang,
  paLang,
  daLang,
} from "../actions/index";

export function Navbar() {
  const dispatch = useDispatch();
  const logged = useSelector((store) => store.isLogged);
  const theme = useSelector((store) => store.theme);
  const lang = useSelector((store) => store.lang);
  const user = useSelector((store) => store.user);
  const navbar = useSelector((store) => store.nav);
  const [mobNav, setMobNav] = useState(false);
  const navDoc = lang.navbar;
  // const getCookieValue = (name) =>
  //   document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const navigate = useNavigate();

  const handleLang = (e) => {
    if (e.target[0].selected) {
      dispatch(engLang());
    } else if (e.target[1].selected) {
      dispatch(paLang());
    } else {
      dispatch(daLang());
    }
  };

  function handleToggle(e) {
    if (e.target.checked) {
      dispatch(darkTheme());
    } else {
      dispatch(lightTheme());
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lang", lang.lang);
  }, [lang]);

  return (
    <>
      {navbar && (
        <>
          <div className="navbar bg-accent h-[10vh] glass z-[9999] opacity-90 justify-between fixed lg:visible  invisible">
            <div className="flex gap-4 px-5">
              <div className="py-3 ">
                <a
                  href="/"
                  className="text-3xl text-primary font-medium flex gap-2 items-center justify-center"
                >
                  <div className="avatar">
                    <div className="w-12 h-12">
                      <img
                        src={`/imgs/logo/${
                          theme === "dark" ? "dark" : "light"
                        }-logo.png`}
                      />
                    </div>
                  </div>
                  IQRA AFGHANISTAN
                </a>
              </div>
            </div>
            <div>
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  onChange={handleToggle}
                  checked={theme === "light" ? false : true}
                />

                {/* sun icon */}
                <svg
                  className="swap-on fill-current w-8 h-8 text-warning"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-off fill-current w-8 h-8 text-info"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
              <label>
                <select
                  onChange={handleLang}
                  defaultValue={
                    lang.lang === "en"
                      ? "English"
                      : lang.lang === "pa"
                      ? "پشتو"
                      : "دری"
                  }
                  className="select focus:outline-none focus:text-primary focus:font-medium text-neutral-500"
                >
                  <option>English</option>
                  <option>پشتو</option>
                  <option>دری</option>
                </select>
              </label>
              {!logged && (
                <ul className="menu menu-horizontal px-5 flex gap-5 items-end">
                  <li>
                    <a
                      className="text-primary text-lg font-medium hover:bg-transparent px-0"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <details>
                      <summary className="text-primary text-lg font-medium hover:bg-transparent px-0">
                        About
                      </summary>
                      <ul className="p-2 bg-accent text-primary w-56">
                        <li>
                          <a href="/about-us">About IQRA AFGHANISTAN</a>
                        </li>
                        <li>
                          <a href="/our-partners">Our Partners</a>
                        </li>
                        <li>
                          <a href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="/terms-conditions">Terms & Conditions</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <div className="flex gap-2">
                    <li
                      className="btn btn-outline text-primary border-primary hover:text-primary hover:bg-slate-200 w-24 rounded-2xl p-0"
                      onClick={() => {
                        navigate("/log-in");
                      }}
                    >
                      <a className="hover:bg-transparent hover:text-primary p-0">
                        {navDoc.login}
                      </a>
                    </li>
                    <li
                      className="btn btn-secondary w-24 rounded-2xl p-0"
                      onClick={() => {
                        navigate("/sign-up");
                      }}
                    >
                      <a className="hover:bg-transparent">{navDoc.signup}</a>
                    </li>
                  </div>
                </ul>
              )}
              {logged && (
                <ul className="menu menu-horizontal px-5 flex gap-5 items-end">
                  <details className="dropdown dropdown-end z-[5000]">
                    <summary className="marker:content-none">
                      <div tabIndex={0} className="avatar">
                        <div className="w-12 rounded-full cursor-pointer border-2 border-accent hover:border-primary hover:border-opacity-60 transition-all">
                          <img
                            src={
                              user.photo
                                ? `${user.photo}`
                                : `/imgs/user-imgs/default.jpg`
                            }
                          />
                        </div>
                      </div>
                    </summary>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[5000] p-1 shadow bg-accent rounded-box w-36 mt-4 text-primary text-lg"
                    >
                      <li>
                        <a href="/user/me">{navDoc.myProfile}</a>
                      </li>
                      <li>
                        <a href="/my-settings">{navDoc.setting}</a>
                      </li>
                      <li>
                        <a onClick={() => dispatch(logOut())} href="/">
                          {navDoc.logout}
                        </a>
                      </li>
                    </ul>
                  </details>
                </ul>
              )}
            </div>
          </div>
          <div className="navbar bg-accent h-[7vh] glass z-[9999] min-h-0 opacity-90 items-center justify-between fixed lg:invisible visible">
            <div className="flex flex-row h-[7vh] w-full justify-between px-2">
              {logged && (
                <label
                  htmlFor="my-drawer-2"
                  className="swap swap-rotate btn btn-primary btn-circle btn-outline w-8 h-8 min-h-fit min-w-fit border-0"
                >
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox" />

                  {/* hamburger icon */}
                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  {/* close icon */}
                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </label>
              )}
              <div>
                <a
                  href="/"
                  className="md:text-2xl text-xl text-primary md:font-medium flex gap-2 items-center"
                >
                  <div className="avatar">
                    <div className="w-9 h-9">
                      <img
                        src={`/imgs/logo/${
                          theme === "dark" ? "dark" : "light"
                        }-logo.png`}
                      />
                    </div>
                  </div>
                  {!logged && `IQRA AFGHANISTAN`}
                </a>
              </div>
              {logged && (
                <ul className="menu menu-horizontal p-0 pt-2">
                  <details className="dropdown dropdown-end z-[5000]">
                    <summary className="marker:content-none">
                      <div tabIndex={0} className="avatar">
                        <div className="w-9 h-9 rounded-full">
                          <img
                            src={
                              user.photo
                                ? `${user.photo}`
                                : `/imgs/user-imgs/default.jpg`
                            }
                          />
                        </div>
                      </div>
                    </summary>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[5000] p-1 shadow bg-accent rounded-box w-36 mt-4 text-primary text-lg"
                    >
                      <li>
                        <a href="/user/me">{navDoc.myProfile}</a>
                      </li>
                      <li>
                        <a href="/my-settings">{navDoc.setting}</a>
                      </li>
                      <li>
                        <a onClick={() => dispatch(logOut())} href="/">
                          {navDoc.logout}
                        </a>
                      </li>
                    </ul>
                  </details>
                </ul>
              )}
              {!logged && (
                <details className="dropdown dropdown-bottom dropdown-end">
                  <summary
                    onClick={() => setMobNav(!mobNav)}
                    className="btn btn-outline text-2xl btn-primary btn-circle border-none p-0 m-0 h-fit w-fit min-w-0 min-h-0"
                  >
                    {mobNav ? (
                      <FontAwesomeIcon icon={faX} />
                    ) : (
                      <FontAwesomeIcon icon={faBars} />
                    )}
                  </summary>
                  <ul className="p-2 shadow menu w-screen h-[90vh] mt-2 translate-x-4 dropdown-content z-[1] bg-accent text-primary">
                    <div className="flex flex-row">
                      <label>
                        <select
                          onChange={handleLang}
                          defaultValue={
                            lang.lang === "en"
                              ? "English"
                              : lang.lang === "pa"
                              ? "پشتو"
                              : "دری"
                          }
                          className="select focus:outline-none focus:text-primary-focus focus:font-medium text-neutral-500"
                        >
                          <option>English</option>
                          <option>پشتو</option>
                          <option>دری</option>
                        </select>
                      </label>
                      <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input
                          type="checkbox"
                          onChange={handleToggle}
                          checked={theme === "light" ? false : true}
                        />

                        {/* sun icon */}
                        <svg
                          className="swap-on fill-current w-8 h-8 text-warning"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        {/* moon icon */}
                        <svg
                          className="swap-off fill-current w-8 h-8 text-info"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                      </label>
                    </div>
                    <div className="flex flex-col gap-4 menu menu-horizontal px-5 items-center">
                      <a href="/" className="text-xl h-10">
                        Home
                      </a>
                      <details>
                        <summary className="text-xl h-10">About</summary>
                        <ul className="p-0 bg-base-100">
                          <li>
                            <a href="about-us" className="text-xl h-10">
                              About IQRA AFGHANISTAN
                            </a>
                          </li>
                          <li>
                            <a href="/our-partners" className="text-xl h-10">
                              Our Partners
                            </a>
                          </li>
                          <li>
                            <a href="/privacy-policy" className="text-xl h-10">
                              Privacy Policy
                            </a>
                          </li>
                          <li>
                            <a
                              href="/terms-conditions"
                              className="text-xl h-10"
                            >
                              Terms & Conditions
                            </a>
                          </li>
                        </ul>
                      </details>
                      <button
                        className="btn btn-outline text-primary border-primary hover:text-primary hover:bg-slate-200 w-full rounded-2xl p-0"
                        onClick={() => {
                          navigate("/log-in");
                        }}
                      >
                        {navDoc.login}
                      </button>
                      <button
                        className="btn btn-secondary opacity-100 w-full rounded-2xl p-0"
                        onClick={() => {
                          navigate("/sign-up");
                        }}
                      >
                        {navDoc.signup}
                      </button>
                    </div>
                  </ul>
                </details>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
