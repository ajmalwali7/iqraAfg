/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn, setUser } from "../actions";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export function VerifyToken() {
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  const handle = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyToken = async () => {
    try {
      console.log(handle.token);
      const res = await axios.patch(
        `https://iqraafg.cyclic.app/api/v1/users/verifyemail/${handle.token}`
      );
      setVerified(true);
      console.log(res);
      document.cookie = `jwt=${res.data.token}; max-age=${new Date(
        Date.now + 2 * 24 * 60 * 60 * 1000
      )}`;
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      dispatch(setUser(res.data.data.user));
      setTimeout(() => {
        dispatch(logIn());
        navigate("/");
      }, 5000);
    } catch (err) {
      console.log(verified);
      if (!verified) {
        setError(true);
      }
    }
  };

  useEffect(() => {
    console.log("useEffect Hook");
    if (!verified) {
      console.log("useEffect Hook 1");
      verifyToken();
    }
  }, []);
  return (
    <>
      {!error ? (
        <div>
          {verified ? (
            <div className="flex justify-center mt-[13vh]">
              <div className="flex items-center alert alert-success m-1 w-fit h-8 py-0">
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
                  Email Verified! You Can Go To Homepage By Clicking{" "}
                  <a
                    className="underline hover:opacity-50 active:opacity-75 hover:cursor-pointer"
                    href="/"
                  >
                    Here
                  </a>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-[7vh] lg:mt-[10vh] w-screen h-screen">
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="fa-spin text-3xl text-primary"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center mt-[13vh]">
          <div className="flex items-center alert alert-error m-1 w-fit h-8 py-0">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error: Invalid Link! Please Enter Valid Link!</span>
          </div>
        </div>
      )}
    </>
  );
}
