const courseReducer = (state = null, action) => {
  if (action.type === "course") {
    state = action.payload;
    return state;
  } else if (action.type === "del") {
    return action.payload;
  } else {
    return state;
  }
};
export default courseReducer;
