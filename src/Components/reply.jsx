/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { setCourse } from "../actions";

export function Reply(props) {
  const user = useSelector((s) => s.user);
  const course = useSelector((s) => s.course);
  const reply = props.reply;
  const [details, setDetails] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const timePast = reply
    ? Math.floor(
        Date.now() / 1000 -
          (Date.parse(
            `${props.reply.createdAt.split("T")[0]} ${
              props.reply.createdAt.split("T")[1].split(".")[0]
            }`
          ) +
            4.5 * 60 * 60 * 1000) /
            1000
      )
    : null;

  const deleteReply = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/comments/${reply.id}`,
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
            if (com._id === reply.parentComment) {
              return {
                ...com,
                replies: com.replies.filter((rep) => {
                  if (rep._id !== reply._id) {
                    return rep;
                  }
                }),
              };
            } else return com;
          }),
        })
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const editReply = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/comments/${reply.id}`,
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
            if (com._id === reply.parentComment) {
              return {
                ...com,
                replies: com.replies.map((rep) => {
                  if (rep._id === reply._id) {
                    return {
                      ...reply,
                      comment: res.data.data.data.comment,
                    };
                  } else return rep;
                }),
              };
            } else return com;
          }),
        })
      );
      setEdit(false);
    } finally {
      console.log("");
    }
  };
  return (
    reply && (
      <div
        onMouseEnter={() => setDetails(true)}
        onMouseLeave={() => setDetails(false)}
        className="flex justify-between"
      >
        <div className="flex flex-row gap-3 px-5 pt-3">
          <div className="avatar flex items-start pt-1">
            <div className="w-10 h-10 rounded-full outline outline-1">
              <img
                src={
                  reply.author.photo
                    ? `${reply.author.photo}`
                    : `/imgs/user-imgs/default.jpg`
                }
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <span className="text-sm block text-primary-focus px-3">
                {`${reply.author.firstName}` + " " + `${reply.author.lastName}`}
              </span>
              <span
                className={`badge ${
                  reply.author.role === "student"
                    ? "badge-neutral badge-outline"
                    : reply.author.role === "teacher"
                    ? "badge-secondary"
                    : "badge-primary"
                } text-xs block px-3`}
              >
                {`${reply.author.role}` +
                  `${
                    reply.author.role === "student"
                      ? `, class:${reply.author.class}`
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
              <form onSubmit={editReply} className="flex flex-row gap-3 w-full">
                <input
                  type="text"
                  defaultValue={reply.comment}
                  required
                  autoFocus
                  placeholder="Edit Reply..."
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:text-primary-focus text-neutral-500"
                />
                <button
                  type="submit"
                  className="btn btn-outline btn-primary w-16 rounded-lg disabled:btn-primary disabled:opacity-80"
                >
                  Save
                </button>
              </form>
            ) : (
              <span className="text-lg block text-primary-focus px-3">
                {reply.comment}
              </span>
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
              {user._id === reply.author._id ? (
                <>
                  <li>
                    <a onClick={() => setEdit(true)}>Edit</a>
                  </li>
                  <li>
                    <a onClick={deleteReply}>Delete</a>
                  </li>
                </>
              ) : user.role === "admin" ? (
                <>
                  <li>
                    <a onClick={deleteReply}>Delete</a>
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
    )
  );
}
