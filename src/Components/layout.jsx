import { Outlet } from "react-router-dom";

import { Navbar } from "./navbar";
import { Background } from "./background";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import axios from "axios";
// import { Drawer } from "./drawer";

export function Layout() {
  const logged = useSelector((s) => s.isLogged);
  const user = useSelector((s) => s.user);
  const layout = useSelector((s) => s.lang.layout);
  const [verifTokenSent, setVerifTokenSent] = useState(false);

  const sendVerifToken = async () => {
    setVerifTokenSent(true);
    console.log("Verification Sent!");
    await axios
      .get("http://localhost:3000/api/v1/users/emailverificationtoken", {
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
      {!logged && <Outlet />}
      {logged && (
        <div className="drawer lg:drawer-open mt-[10vh] h-[90vh]">
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
            <ul className="menu flex flex-col justify-between shadow-md p-5 text-base w-72 h-[90vh] bg-accent text-primary fixed">
              {/* Sidebar content here */}
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
                  <a className="p-0" href="/privacy-policy">
                    <span className="m-2 text-xs">{layout.privacyPolicy}</span>
                  </a>
                  <a className="p-0" href="/terms-conditions">
                    <span className="m-2 text-xs">
                      {layout.termsConditions}
                    </span>
                  </a>
                </li>
                <li>
                  <span className="m-2 mb-0 text-md p-0 hover:cursor-auto hover:text-primary items-center">
                    <FontAwesomeIcon icon={faCopyright} />
                    2023 IQRA AFGHANISTAN
                  </span>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
