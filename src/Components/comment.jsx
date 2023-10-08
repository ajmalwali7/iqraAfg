/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Reply } from "./reply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { setCourse } from "../actions";

export function Comment(props) {
  const user = useSelector((s) => s.user);
  const course = useSelector((s) => s.course);
  const [isLoading, setIsLoading] = useState(false);
  const [replyTab, setReplyTab] = useState(false);
  const [details, setDetails] = useState(false);
  const [edit, setEdit] = useState(false);
  const [replies, setReplies] = useState(false);

  const dispatch = useDispatch();

  const handleReply = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://iqraafg.cyclic.app/api/v1/courses/${props.comment.course}/comments/${props.comment.id}`,
        { comment: e.target[0].value },
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      document.getElementById("replyForm").reset();
      dispatch(
        setCourse({
          ...course,
          comments: course.comments.map((com) => {
            if (com._id == props.comment._id) {
              return {
                ...props.comment,
                replies: [
                  ...props.comment.replies,
                  {
                    ...res.data.data.data,
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
              };
            } else {
              return com;
            }
          }),
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async () => {
    try {
      await axios.delete(
        `https://iqraafg.cyclic.app/api/v1/comments/${props.comment.id}`,
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      dispatch(
        setCourse({
          ...course,
          comments: course.comments.filter((com) => {
            if (com._id !== props.comment._id) {
              return com;
            }
          }),
        })
      );
    } finally {
      console.log("");
    }
  };
  const editComment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `https://iqraafg.cyclic.app/api/v1/comments/${props.comment.id}`,
        { comment: e.target[0].value },
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      dispatch(
        setCourse({
          ...course,
          comments: course.comments.map((com) => {
            if (com._id == props.comment._id) {
              return {
                ...props.comment,
                comment: res.data.data.data.comment,
              };
            } else return com;
          }),
        })
      );
      setEdit(false);
    } finally {
      setIsLoading(false);
    }
  };

  const timePast = Math.floor(
    Date.now() / 1000 -
      (Date.parse(
        `${props.comment.createdAt.split("T")[0]} ${
          props.comment.createdAt.split("T")[1].split(".")[0]
        }`
      ) +
        4.5 * 60 * 60 * 1000) /
        1000
  );
  return (
    <div className="flex flex-col">
      <div
        onMouseEnter={() => setDetails(true)}
        onMouseLeave={() => setDetails(false)}
        className="flex flex-row justify-between"
      >
        <div className="flex flex-row gap-3 px-5 pt-3">
          {" "}
          <div className="avatar flex items-start pt-1">
            <div className="w-10 h-10 rounded-full outline outline-1">
              <img
                src={
                  props.comment.author.photo
                    ? `${props.comment.author.photo}`
                    : `/imgs/user-imgs/default.png`
                }
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <span className="text-sm block text-primary-focus px-3">
                {`${props.comment.author.firstName}` +
                  " " +
                  `${props.comment.author.lastName}`}
              </span>
              <span
                className={`badge ${
                  props.comment.author.role === "student"
                    ? "badge-neutral badge-outline"
                    : props.comment.author.role === "teacher"
                    ? "badge-secondary"
                    : "badge-primary"
                } text-xs block px-3`}
              >
                {`${props.comment.author.role}` +
                  `${
                    props.comment.author.role === "student"
                      ? `, class:${props.comment.author.class}`
                      : ""
                  }`}
              </span>
              <span className="text-xs block text-primary-focus px-3 self-end">
                {Math.floor(timePast / 60) > 0 ? (
                  Math.floor(timePast / 3600) > 0 ? (
                    Math.floor(timePast / 86400) > 0 ? (
                      Math.floor(timePast / 604800) > 0 ? (
                        Math.floor(timePast / 2419200) > 0 ? (
                          Math.floor(timePast / 29030400) > 0 ? (
                            <>
                              {Math.floor(timePast / 29030400)} year
                              {Math.floor(timePast / 29030400) > 1
                                ? `s`
                                : ``}{" "}
                              ago
                            </>
                          ) : (
                            <>
                              {Math.floor(timePast / 2419200)} month
                              {Math.floor(timePast / 2419200) > 1
                                ? `s`
                                : ``}{" "}
                              ago
                            </>
                          )
                        ) : (
                          <>
                            {Math.floor(timePast / 604800)} week
                            {Math.floor(timePast / 604800) > 1 ? `s` : ``} ago
                          </>
                        )
                      ) : (
                        <>
                          {Math.floor(timePast / 86400)} day
                          {Math.floor(timePast / 86400) > 1 ? `s` : ``} ago
                        </>
                      )
                    ) : (
                      <>
                        {Math.floor(timePast / 3600)} hour
                        {Math.floor(timePast / 3600) > 1 ? `s` : ``} ago
                      </>
                    )
                  ) : (
                    <>
                      {Math.floor(timePast / 60)} minute
                      {Math.floor(timePast / 60) > 1 ? `s` : ``} ago
                    </>
                  )
                ) : (
                  <>few seconds ago</>
                )}
              </span>
            </div>
            {edit ? (
              <form
                onSubmit={editComment}
                className="flex flex-row gap-3 w-full"
              >
                <input
                  type="text"
                  defaultValue={props.comment.comment}
                  required
                  autoFocus
                  placeholder="Edit Comment..."
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:text-primary-focus text-neutral-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-outline btn-primary w-16 rounded-lg disabled:btn-primary disabled:opacity-80"
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    "Save"
                  )}
                </button>
              </form>
            ) : (
              <span className="text-lg block text-primary-focus px-3">
                {props.comment.comment}
              </span>
            )}
            <div className="flex flex-row gap-5">
              <button
                type="button"
                onClick={() => setReplyTab(!replyTab)}
                className="btn-ghost w-fit mx-3 p-1 px-2 rounded-full text-primary"
              >
                Reply
              </button>
              {props.comment.replies.length > 0 && (
                <button
                  type="button"
                  onClick={() => setReplies(!replies)}
                  className="btn-ghost w-fit mx-3 p-1 px-2 rounded-full text-primary"
                >
                  {props.comment.replies.length} Repl
                  {props.comment.replies.length == 1 ? `y` : `ies`}
                </button>
              )}
            </div>
            {replies && (
              <>
                {props.comment.replies.map((r) => (
                  <Reply key={props.comment.replies.indexOf(r)} reply={r} />
                ))}
              </>
            )}
            {replyTab && (
              <div className="flex flex-row gap-3 px-5 rounded-md">
                <div className="avatar flex items-center">
                  <div className="w-10 h-10 rounded-full outline outline-1">
                    <img
                      src={
                        user.photo
                          ? `${user.photo}`
                          : `/imgs/user-imgs/default.png`
                      }
                    />
                  </div>
                </div>
                <form
                  onSubmit={handleReply}
                  id="replyForm"
                  className="flex flex-row gap-3 w-full"
                >
                  <input
                    type="text"
                    required
                    placeholder="Add Reply Here..."
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
                      "Reply"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        {details && (
          <details className="dropdown dropdown-end z-[5000]">
            <summary className="marker:content-none btn btn-link btn-primary w-7 h-7 hover:opacity-70">
              <div tabIndex={0} className="">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </summary>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[5000] p-1 shadow bg-accent rounded-box w-36 text-primary text-lg"
            >
              {user._id === props.comment.author._id ? (
                <>
                  <li>
                    <a onClick={() => setEdit(true)}>Edit</a>
                  </li>
                  <li>
                    <a onClick={deleteComment}>Delete</a>
                  </li>
                </>
              ) : user.role === "admin" ? (
                <>
                  <li>
                    <a onClick={deleteComment}>Delete</a>
                  </li>
                  <li>
                    <a>Report</a>
                  </li>
                </>
              ) : (
                <li>
                  <a>Report</a>
                </li>
              )}
            </ul>
          </details>
        )}
      </div>
      <div className="divider m-0"></div>
    </div>
  );
}
