const coursesReducer = (state = null, action) => {
  if (action.type === "courses") {
    state = [...action.payload];
    return state;
  } else if (action.type === "del") {
    return action.payload;
  } else {
    return state;
  }
};
export default coursesReducer;
