/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export function CreateCourse() {
  const logged = useSelector((s) => s.isLogged);
  const user = useSelector((s) => s.user);
  const createCoursePage = useSelector((s) => s.lang.createCoursePage);
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState(true);
  const [invalidLink, setInvalidLink] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(true);
  const [courseCreated, setCourseCreated] = useState(false);

  const checkIfVideo = (e) => {
    if (e.nativeEvent.target.files[0])
      setVideoUploaded(e.nativeEvent.target.files[0].type === "video/mp4");
  };

  const uploadCourse = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target[2].checked) {
      if (
        e.target[4].value.includes("youtu.be/") ||
        e.target[4].value.includes("youtube.com/watch")
      )
        setInvalidLink(false);
      else {
        setIsLoading(false);
        setInvalidLink(true);
        return;
      }
    }
    const reqBody = {
      class: e.target[0].value * 1,
      subject: e.target[1].value,
      videoLink: e.target[2].checked
        ? `https://www.youtube.com/embed/${
            e.target[4].value.split("=").length > 1
              ? e.target[4].value.split("=")[1]
              : e.target[4].value.split("/")[
                  e.target[4].value.split("/").length - 1
                ]
          }`
        : null,
      title: e.target[5].value,
      description: e.target[6].value,
    };
    let course = new FormData();
    e.target[3].checked ? course.append("video", e.target[4].files[0]) : null;
    e.target[3].checked ? course.append("doc", JSON.stringify(reqBody)) : null;
    try {
      await axios.post(
        "http://localhost:3000/api/v1/courses/",
        e.target[3].checked ? course : reqBody,
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      setCourseCreated(true);
      setTimeout(() => {
        document.querySelector("form").reset();
        setLink(true);
        setCourseCreated(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!(logged || user) && (
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
              Please Log In to Create Courses!!!
              <br />
              Or{" "}
              <a
                href="/"
                className="underline hover:opacity-50 active:opacity-75 hover:cursor-pointer"
              >
                Click Here
              </a>{" "}
              To Go To Homepage!
            </span>{" "}
          </div>
        </div>
      )}
      {logged && user.role === "student" && (
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
              You are Not allowed to Create Courses!!!
              <br />
              <a
                href="/"
                className="underline hover:opacity-50 active:opacity-75 hover:cursor-pointer"
              >
                Click Here
              </a>{" "}
              To Go To Homepage!
            </span>{" "}
          </div>
        </div>
      )}
      {logged &&
        (user.role === "teacher" || user.role === "admin") &&
        !user.credentialVerified && (
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
                Please Verify your Email!!!
                <br />
                <a
                  href="/"
                  className="underline hover:opacity-50 active:opacity-75 hover:cursor-pointer"
                >
                  Click Here
                </a>{" "}
                To Go To Homepage!
              </span>{" "}
            </div>
          </div>
        )}
      {logged &&
        (user.role === "teacher" || user.role === "admin") &&
        user.credentialVerified &&
        !user.teachVerified && (
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
                Please wait untill you are Verified as Teacher!!!
                <br />
                <a
                  href="/"
                  className="underline hover:opacity-50 active:opacity-75 hover:cursor-pointer"
                >
                  Click Here
                </a>{" "}
                To Go To Homepage!
              </span>{" "}
            </div>
          </div>
        )}
      {logged &&
        (user.role === "teacher" || user.role === "admin") &&
        user.credentialVerified &&
        user.teachVerified && (
          <div className="flex justify-center">
            <form
              onSubmit={uploadCourse}
              className="w-11/12 lg:w-9/12 h-fit mt-2 lg:mt-9 mb-20"
            >
              <div className="flex flex-col card bg-accent shadow-xl py-7 w-full px-5 h-fit">
                <div className="avatar mb-6">
                  <div className="w-14 h-14 rounded">
                    <img src="/imgs/logo/light-logo.png" />
                  </div>
                </div>
                <span className="label-text text-info text-base block">
                  {createCoursePage.starText1}
                  <span className="text-error text-lg">
                    {createCoursePage.star}
                  </span>
                  {createCoursePage.starText2}
                </span>
                {courseCreated && (
                  <p className="alert bg-success-content text-success font-medium text-lg mb-2 h-6 max-w-xs p-3 pb-10 pl-4">
                    {createCoursePage.courseCreated}
                  </p>
                )}
                <div className="flex gap-3">
                  <label className="label block">
                    <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                      {createCoursePage.class}
                    </span>
                    <select className="select select-primary focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500">
                      <option defaultValue={7}>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </select>
                  </label>
                  <label className="label block">
                    <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                      {createCoursePage.subject}
                    </span>
                    <select className="select select-primary focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500">
                      <option defaultValue="Mathematics">Mathematics</option>
                      <option>Physics</option>
                      <option>Biology</option>
                      <option>Chemistry</option>
                      <option>Computer</option>
                      <option>Islamic Studies</option>
                      <option>Pashto</option>
                      <option>Dari</option>
                      <option>History</option>
                      <option>Geography</option>
                    </select>
                  </label>
                </div>
                <div className="flex flex-row gap-3">
                  <label className="label justify-start">
                    <input
                      id="link-check"
                      type="radio"
                      name="link"
                      defaultChecked
                      onChange={(e) => {
                        e.target.classList.contains("link")
                          ? setLink(true)
                          : setLink(false);
                      }}
                      className="peer mt-1 link"
                    />
                    <span className="label-text ml-1 text-base block text-secondary peer-checked:text-primary">
                      {createCoursePage.vidLink}
                    </span>
                  </label>
                  <label className="label justify-start ">
                    <input
                      type="radio"
                      name="link"
                      onChange={(e) => {
                        e.target.classList.contains("link")
                          ? setLink(true)
                          : setLink(false);
                      }}
                      className="peer mt-1"
                    />
                    <span className="label-text ml-1 text-base block text-secondary peer-checked:text-primary">
                      {createCoursePage.vidUpload}
                    </span>
                  </label>
                </div>
                {link ? (
                  <label className="label block">
                    <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                      {createCoursePage.vidLink}
                    </span>
                    {invalidLink && (
                      <span className="label-text font-semibold text-lg block text-error">
                        <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                        {createCoursePage.enterValidLink}
                      </span>
                    )}
                    <input
                      type="text"
                      required
                      placeholder={createCoursePage.link}
                      className="input input-bordered input-primary w-full focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                    />
                  </label>
                ) : (
                  <label className="label block">
                    <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                      {createCoursePage.courseVid}
                    </span>
                    {!videoUploaded && (
                      <span className="label-text font-semibold text-lg block text-error">
                        <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                        {createCoursePage.enterVideo}
                      </span>
                    )}
                    <input
                      type="file"
                      required
                      accept="video/mp4"
                      onChange={checkIfVideo}
                    />
                  </label>
                )}
                <label className="label block">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                    {createCoursePage.title}
                  </span>
                  <input
                    type="text"
                    required
                    placeholder={createCoursePage.title}
                    className="input input-bordered input-primary w-full focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <label className="label block">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                    {createCoursePage.description}
                  </span>
                  <textarea
                    rows={7}
                    cols={50}
                    required
                    placeholder={createCoursePage.descPlace}
                    className=" resize-none input input-bordered input-primary w-full h-40 focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading || !videoUploaded}
                    className="btn btn-primary rounded-3xl mt-5 disabled:btn-primary disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      createCoursePage.create
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
    </>
  );
}
