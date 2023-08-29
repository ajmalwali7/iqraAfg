const themeReducer = (state = "light", action) => {
  if (action.type === "dark" && state === "light") return "dark";
  else if (action.type === "light" && state === "dark") return "light";
  else return state;
};
export default themeReducer;
