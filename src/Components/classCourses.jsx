/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCourses } from "../actions";
import { useParams } from "react-router-dom";

import { CourseCard } from "./courseCard";

export function ClassCourses() {
  const logged = useSelector((store) => store.isLogged);
  const courses = useSelector((store) => store.courses);
  const dispatch = useDispatch();
  const classe = useParams();

  const courseFunc = async () => {
    try {
      const courses = await axios.get(
        `http://localhost:3000/api/v1/courses/${classe.class}`,
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
    }
  };
  useEffect(() => {
    if (logged && !courses) {
      courseFunc();
    }
  }, []);
  return (
    <>
      {logged && courses && (
        <div className="text-primary card shadow-xl m-11 p-9 bg-accent overflow-x-hidden">
          <h1 className=" card-title text-3xl mb-9">Courses:</h1>
          <div className="grid grid-cols-3 gap-2 overflow-x-hidden">
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
        </div>
      )}
    </>
  );
}
