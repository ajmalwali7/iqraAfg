import { Outlet } from "react-router-dom";

import { Navbar } from "./navbar";
import { Background } from "./background";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import axios from "axios";
import {
  darkTheme,
  lightTheme,
  engLang,
  paLang,
  daLang,
} from "../actions/index";
// import { Drawer } from "./drawer";

export function Layout() {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.theme);
  const lang = useSelector((store) => store.lang);
  const logged = useSelector((s) => s.isLogged);
  const user = useSelector((s) => s.user);
  const layout = useSelector((s) => s.lang.layout);
  const [verifTokenSent, setVerifTokenSent] = useState(false);

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

  const sendVerifToken = async () => {
    setVerifTokenSent(true);
    console.log("Verification Sent!");
    await axios
      .get("https://iqraafg.cyclic.app/api/v1/users/emailverificationtoken", {
        headers: {
          Authorization: `Bearer ${document.cookie
            .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
            ?.pop()}`,
        },
      })
      .then((e) => console.log(e));
    setTimeout(() => {
      setVerifTokenSent(false);
    }, 100000);
  };
  return (
    <>
      <Navbar />
      <Background />
      {!logged && (
        <div className="mt-[7vh] lg:mt-[10vh] border-t border-transparent">
          <Outlet />
        </div>
      )}
      {logged && (
        <div className="drawer lg:drawer-open mt-[7vh] lg:mt-[10vh] h-[93vh] lg:h-[90vh]">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content lg:pl-72 h-fit">
            {!user.credentialVerified && verifTokenSent && (
              <div className="flex justify-center">
                <div className="flex items-center alert alert-success m-1 w-fit h-8 py-0 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {layout.verifLinkSent}{" "}
                    <a
                      onClick={sendVerifToken}
                      className="underline hover:opacity-50 active:opacity-75 hover:cursor-pointer"
                    >
                      {layout.clickHere}
                    </a>{" "}
                    {layout.verifLinkNotRecieved}
                  </span>
                </div>
              </div>
            )}
            {!user.credentialVerified && !verifTokenSent && (
              <div className="flex justify-center">
                <div className="flex items-center alert alert-warning m-1 w-fit h-8 py-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>
                    {layout.checkEmail}{" "}
                    <a
                      onClick={sendVerifToken}
                      className="underline hover:opacity-50 active:opacity-75 hover:cursor-pointer"
                    >
                      {layout.clickHere}
                    </a>{" "}
                    {layout.recieveVerifLink}
                  </span>
                </div>
              </div>
            )}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu flex flex-col justify-between shadow-md p-5 text-base mt-[7vh] lg:mt-0 w-56 md:w-72 lg:w-72 h-[93vh] lg:h-[90vh] bg-accent text-primary fixed">
              {/* Sidebar content here */}
              <div className="flex flex-row fixed -top-3 left-32 lg:invisible">
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
                    className="select text-sm focus:outline-none focus:text-primary-focus focus:font-medium text-neutral-500"
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
                    className="swap-on fill-current w-6 h-6 text-warning"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                  {/* moon icon */}
                  <svg
                    className="swap-off fill-current w-6 h-6 text-info"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <ul>
                <li className="rounded-lg m-2">
                  <a href="/">{layout.home}</a>
                </li>
                <li className="rounded-lg m-2">
                  <a href="/courses">{layout.courses}</a>
                </li>
                <li className="rounded-lg m-2">
                  <a href="/books">{layout.books}</a>
                </li>
                <li className="rounded-lg m-2">
                  <a href="/teachers">{layout.teachers}</a>
                </li>
                {(user.role === "teacher" || user.role === "admin") && (
                  <li className="rounded-lg m-2">
                    <a href="/create-course">{layout.createCourse}</a>
                  </li>
                )}
              </ul>
              <ul className="mb-5">
                <li className="flex flex-row">
                  <a className="p-0" href="/about-us">
                    <span className="m-2 text-xs">About Us</span>
                  </a>
                  <span className="p-0 min-h-0 min-w-0">|</span>
                  <a className="p-0" href="/our-partners">
                    <span className="m-2 text-xs">Our Partners</span>
                  </a>
                </li>
                <li className="flex flex-row">
                  <a className="p-0" href="/privacy-policy">
                    <span className="m-2 text-xs">{layout.privacyPolicy}</span>
                  </a>
                  <span className="p-0 min-h-0 min-w-0">|</span>
                  <a className="p-0" href="/terms-conditions">
                    <span className="m-2 text-xs">
                      {layout.termsConditions}
                    </span>
                  </a>
                </li>
                <li>
                  <p className="flex flex-row items-center">
                    <FontAwesomeIcon
                      icon={faCopyright}
                      className="text-primary text-xl mt-2"
                    />
                    <span className="m-2 mb-0 text-xs p-0 text-primary items-center">
                      2023 IQRA AFGHANISTAN,
                      <br /> All Rights Reserved
                    </span>
                  </p>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
