/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCourses } from "../actions";
import chaps from "../assets/docs/chapters.json";
import { CourseCard } from "./courseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export function CCourses() {
  const logged = useSelector((store) => store.isLogged);
  const courses = useSelector((store) => store.courses);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handle = useParams();
  const c = handle.class;
  const subj = handle.subject;
  const chap = chaps[`class${c}`][subj][handle.chapter];
  const courseFunc = async () => {
    setIsLoading(true);
    try {
      const courses = await axios.get(
        `http://localhost:3000/api/v1/courses?class=${c}&subject=${subj}&chapter=${chap}`,
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
                ?.pop() || ""
            }`,
          },
        }
      );
      dispatch(setCourses(courses.data.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (logged) {
      courseFunc();
    }
  }, [c]);
  document.title = `Class ${c} ${subj} Chapters: Iqra Afghanistan`;
  return (
    <>
      {logged && (
        <div className="text-primary card shadow-xl m-2 mb-10 lg:m-11 p-3 lg:p-9 bg-accent overflow-x-hidden">
          <h1 className="card-title text-xl md:text-3xl mb-4 lg:mb-9">
            {`Class ${c} ${subj} Chapter ${chap} Courses:`}
          </h1>
          {isLoading && (
            <div className="flex items-center justify-center h-52">
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="fa-spin text-3xl text-primary"
              />
            </div>
          )}
          {courses && !isLoading && courses.length === 0 && (
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
                No Courses for Class {c} {subj} Yet, Please Visit Another Time!
              </span>
            </div>
          )}
          {courses && !isLoading && (
            <div>
              <div className="grid grid-cols-3 gap-2 overflow-x-hidden h-0 md:h-fit invisible md:visible">
                <div className="flex flex-col gap-2">
                  {courses
                    .filter((course) => courses.indexOf(course) % 3 == 0)
                    .map((c) => {
                      return <CourseCard key={courses.indexOf(c)} course={c} />;
                    })}
                </div>
                <div className="flex flex-col gap-2">
                  {courses
                    .filter((course) => courses.indexOf(course) % 3 == 1)
                    .map((c) => {
                      return <CourseCard key={courses.indexOf(c)} course={c} />;
                    })}
                </div>
                <div className="flex flex-col gap-2">
                  {courses
                    .filter((course) => courses.indexOf(course) % 3 == 2)
                    .map((c) => {
                      return <CourseCard key={courses.indexOf(c)} course={c} />;
                    })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 overflow-x-hidden h-fit md:h-0 visible md:invisible">
                <div className="flex flex-col gap-2">
                  {courses
                    .filter((course) => courses.indexOf(course) % 2 == 0)
                    .map((c) => {
                      return <CourseCard key={courses.indexOf(c)} course={c} />;
                    })}
                </div>
                <div className="flex flex-col gap-2">
                  {courses
                    .filter((course) => courses.indexOf(course) % 2 == 1)
                    .map((c) => {
                      return <CourseCard key={courses.indexOf(c)} course={c} />;
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
