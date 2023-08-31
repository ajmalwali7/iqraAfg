/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setTeachers } from "../actions";

import { TeacherCard } from "./teacherCard";

export function Teachers() {
  const logged = useSelector((store) => store.isLogged);
  const teachers = useSelector((store) => store.teachers);
  const lang = useSelector((store) => store.lang.lang);
  const dispatch = useDispatch();

  const teacher =
    lang === "en" ? "Teachers:" : lang === "pa" ? ":ښوونکي" : ":استادان";

  const courseFunc = async () => {
    try {
      const courses = await axios.get(
        `http://localhost:3000/api/v1/users?role=teacher`,
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
      dispatch(setTeachers(courses.data.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (logged && !teachers) {
      courseFunc();
    }
  }, []);
  return (
    <>
      {logged && teachers && (
        <div className="text-primary card shadow-xl mt-2 m-3 p-9 bg-accent overflow-x-hidden h-fit lg:mt-9 lg:m-11">
          <h1 className=" card-title text-3xl mb-9 rtl:justify-self-end">
            {teacher}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 overflow-x-hidden">
            {teachers &&
              teachers.map((teacher) => (
                <TeacherCard
                  key={teachers.indexOf(teacher)}
                  teacher={teacher}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
