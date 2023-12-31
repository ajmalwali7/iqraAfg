export const logIn = () => ({ type: "log-in" });
export const logOut = () => ({ type: "log-out" });
export const darkTheme = () => ({ type: "dark" });
export const lightTheme = () => ({ type: "light" });
export const engLang = () => ({ type: "en" });
export const paLang = () => ({ type: "pa" });
export const daLang = () => ({ type: "da" });
export const setUser = (payload) => ({ type: "user", payload });
export const deleteUser = (payload) => ({ type: "null", payload });
export const setCourse = (payload) => ({ type: "course", payload });
export const deleteCourse = (payload) => ({ type: "del", payload });
export const setNav = () => ({ type: "nav" });
export const noNav = () => ({ type: "noNav" });
export const setCourses = (payload) => ({ type: "courses", payload });
export const deleteCourses = (payload) => ({ type: "dek", payload });
export const setTeachers = (payload) => ({ type: "teachers", payload });
export const deleteTeachers = (payload) => ({ type: "del", payload });
