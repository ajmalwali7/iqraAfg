/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function User() {
  const me = useSelector((s) => s.user);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const handle = useParams();
  const getUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/user/${handle.handle}`
      );
      setUser(res.data.data.user);
      setError(false);
      if (res.data.data.user === null) {
        setNoUser(true);
      }
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    if (!(handle.handle === "me")) {
      getUser();
    } else {
      setUser(me);
    }
  }, [handle.handle]);

  return (
    <>
      <div className="flex justify-center mt-10 mb-20">
        {error && (
          <div className="flex flex-col pt-8 gap-y-4 items-center justify-center">
            <div className="flex items-center alert alert-error m-1 w-fit opacity-75">
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
              <span>
                An Error Occurred While Getting the User Please Try Again Later,
                <br />
                Or{" "}
                <a
                  href="/"
                  className="underline hover:opacity-50 active:opacity-75 hover:cursor-pointer"
                >
                  Click Here
                </a>{" "}
                To Go To Homepage!
              </span>
            </div>
          </div>
        )}
        {noUser && (
          <div className="flex flex-col pt-8 gap-y-4 items-center justify-center">
            <div className="flex items-center alert alert-error m-1 w-fit opacity-75">
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
              <span>
                No User Found With That UserID! Please Enter Another UserID,
                <br />
                Or{" "}
                <a
                  href="/"
                  className="underline hover:opacity-50 active:opacity-75 hover:cursor-pointer"
                >
                  Click Here
                </a>{" "}
                To Go To Homepage!
              </span>
            </div>
          </div>
        )}
        {user && (
          <div className="flex flex-row justify-center card bg-accent glass py-7 w-10/12 px-5 gap-3">
            <div className="flex flex-col pt-8 gap-y-4 items-center justify-center">
              <div className="avatar">
                <div className="w-28 rounded-full cursor-pointer outline outline-2 outline-primary">
                  <img
                    src={
                      user.photo
                        ? `${user.photo}`
                        : `/imgs/user-imgs/default.jpg`
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-y-2">
                <span className="label-text text-lg block text-primary-focus">
                  {`${user.firstName}`[0].toUpperCase() +
                    `${user.firstName}`.substring(1) +
                    " " +
                    `${user.lastName}`[0].toUpperCase() +
                    `${user.lastName}`.substring(1)}
                </span>
                <span className="label-text text-center text-sm block text-primary-focus">
                  {`ID: ${user.userID}`}
                  <br />
                  {`${user.role}`[0].toUpperCase() +
                    `${user.role}`.substring(1) +
                    `${
                      user.role === "student" ? `, Class: ${user.class}` : ""
                    }`}
                </span>
                <div className="divider m-0 before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
                <span className="label-text text-center text-sm block text-primary-focus">
                  {user.phoneNumber && (
                    <>
                      {user.phoneNumber}
                      <br />
                    </>
                  )}

                  {user.email}
                </span>
                <div className="divider before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
                <span className="label-text text-center text-sm block text-primary-focus">
                  {`Address: ${user.address.streetAdd}, ${user.address.city} City, ${user.address.province}, Afghanistan`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
