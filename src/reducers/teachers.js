const teachersReducer = (state = null, action) => {
  if (action.type === "teachers") {
    state = [...action.payload];
    return state;
  } else if (action.type === "del") {
    return action.payload;
  } else {
    return state;
  }
};
export default teachersReducer;
