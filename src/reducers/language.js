import en from "../assets/docs/langs/en.json";
import pa from "../assets/docs/langs/pa.json";
import da from "../assets/docs/langs/da.json";

const lang = localStorage.getItem("lang");
let initialState = en;
if (lang === "pa") {
  initialState = pa;
}
if (lang === "da") {
  initialState = da;
}

const langReducer = (state = initialState, action) => {
  if (action.type === "en") return en;
  else if (action.type === "pa") return pa;
  else if (action.type === "da") return da;
  else return state;
};
export default langReducer;
