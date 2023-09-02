/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../actions";

import { Comment } from "./comment";

export function Course() {
  const user = useSelector((s) => s.user);
  const course = useSelector((s) => s.course);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noCourse, setNoCourse] = useState(false);
  const handle = useParams();

  const handleComment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://iqraafg.cyclic.app/api/v1/courses/${course.id}/comments`,
        { comment: e.target[0].value },
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      document.querySelector("form").reset();
      dispatch(
        setCourse({
          ...course,
          comments: [
            ...course.comments,
            {
              ...res.data.data.data,
              replies: [],
              author: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                class: user.class,
                photo: user.photo,
              },
            },
          ],
        })
      );
    } catch (err) {
      setCommentError(true);
      setTimeout(() => setCommentError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const getCourse = async () => {
    try {
      const res = await axios.get(
        `https://iqraafg.cyclic.app/api/v1/courses/course/${handle.slug}`
      );
      dispatch(setCourse(res.data.data.course));
      document.title = `${res.data.data.course.title}: Iqra Afghanistan`;
      setError(false);
      if (res.data.data.course === null) {
        setNoCourse(true);
      }
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    getCourse();
  }, [handle.slug]);
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
                An Error Occurred While Getting the Course Please Try Again
                Later,
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
        {noCourse && (
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
                No Course Found With That Name! Please Enter Another Name,
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
        {course && (
          <div className="flex flex-col card bg-accent shadow-xl py-7 w-10/12 px-5 gap-3">
            <div className="flex flex-col pt-8 gap-y-4 w-full">
              <div className="flex flex-col gap-y-2">
                <span className="text-3xl block text-primary-focus font-semibold px-3">
                  {`${course.title}`[0].toUpperCase() +
                    `${course.title}`.substring(1) +
                    ", " +
                    `${course.subject}`[0].toUpperCase() +
                    `${course.subject}`.substring(1) +
                    ", Class " +
                    course.class +
                    ": "}
                </span>
                <div>
                  <div className="divider m-0 before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
                  <div className="flex flex-row p-0">
                    <span className="block text-sm text-primary-focus px-3">
                      Teacher:{" "}
                      {`${course.teacher.firstName}`[0].toUpperCase() +
                        `${course.teacher.firstName}`.substring(1) +
                        " " +
                        `${course.teacher.lastName}`[0].toUpperCase() +
                        `${course.teacher.lastName}`.substring(1)}
                    </span>
                    <span className="block text-sm text-primary-focus px-3">
                      Created At: {course.createdAt.split("T")[0]}
                    </span>
                  </div>
                  <div className="divider m-0 before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
                </div>
                <span className="text-lg block text-primary-focus px-3">
                  {`${course.description}`[0].toUpperCase() +
                    `${course.description}`.substring(1)}
                </span>
                {course.videoLink && (
                  <iframe
                    src={`${course.videoLink}`}
                    className="h-[500px] w-auto rounded-xl mt-5"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col mt-10">
              <label className="text-sm block text-primary-focus px-3">
                {course.comments.length} Comments
              </label>
              {commentError && (
                <div className="flex items-center alert alert-error m-1 mt-3 py-1 opacity-90 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-4 w-4"
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
                    An Error Occurred Posting the Comment, Please Try Again!
                  </span>
                </div>
              )}
              <div className="flex flex-row gap-3 px-5 pt-7 pb-10 rounded-md">
                <div className="avatar flex items-center">
                  <div className="w-10 h-10 rounded-full outline outline-1">
                    <img
                      src={
                        user.photo
                          ? `${user.photo}`
                          : `/imgs/user-imgs/default.jpg`
                      }
                    />
                  </div>
                </div>
                <form
                  onSubmit={handleComment}
                  className="flex flex-row gap-3 w-full"
                >
                  <input
                    type="text"
                    required
                    placeholder="Add Comment Here..."
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:text-primary-focus text-neutral-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-outline btn-primary w-20 rounded-lg disabled:btn-primary disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      "Comment"
                    )}
                  </button>
                </form>
              </div>
              <div className="bg-sky-100 rounded-md shadow-md">
                {course.comments.map((comment) => (
                  <Comment
                    key={course.comments.indexOf(comment)}
                    comment={comment}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
