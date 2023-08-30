/* eslint-disable no-constant-condition */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { noNav, logIn, setUser } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export function Signup() {
  const signupPage = useSelector((s) => s.lang.signupPage);
  const [student, setStudent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sameText, setSameText] = useState(false);
  const [eightChars, setEightChars] = useState(false);
  const [numberInc, setNumberInc] = useState(false);
  const [charInc, setCharInc] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [reqBody, setReqBody] = useState({});
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passReqs = [
    { regex: /.{8,}/, index: 0 },
    { regex: /[0-9]/, index: 1 },
    { regex: /[^a-zA-Z0-9]/, index: 2 },
  ];

  function handleRole(e) {
    e.target.classList.contains("student")
      ? setStudent(true)
      : setStudent(false);
  }

  async function handleForm1(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/email/${e.target[4].value}`
      );
      if (res.data.data.user) {
        setIsLoading(false);
        setEmailUsed(true);
        setTimeout(() => {
          setEmailUsed(false);
          setForm1(false);
          setForm1(true);
        }, 3000);
      } else {
        setReqBody({
          ...reqBody,
          firstName: e.target[0].value,
          lastName: e.target[1].value,
          email: e.target[4].value,
          phoneNumber: e.target[5].value ? e.target[5].value : null,
          gender: e.target[2].checked ? "female" : "male",
        });
        setForm1(false);
        setForm2(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleForm2(e) {
    e.preventDefault();
    setReqBody({
      ...reqBody,
      role: student ? "student" : "teacher",
      class: student ? e.target[2].value * 1 : null,
      address: {
        streetAdd: student ? e.target[3].value : e.target[2].value,
        city: student ? e.target[4].value : e.target[3].value,
        province: student ? e.target[5].value : e.target[4].value,
      },
      password: "a",
    });
    setForm2(false);
    setForm3(true);
  }

  async function handleForm3(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        reqBody
      );
      document.cookie = `jwt=${res.data.token}; max-age=${new Date(
        Date.now + 2 * 24 * 60 * 60 * 1000
      )}`;
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      dispatch(setUser(res.data.data.user));
      dispatch(logIn());
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  dispatch(noNav());
  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <div className=" w-[45%] bg-gradient-to-br from-primary to-secondary flex justify-center items-center">
          <div className="w-4/5 bg-accent opacity-70 rounded-2xl flex flex-col py-5 gap-6 justify-center items-center">
            <div className="avatar">
              <div className=" w-36 h-36 rounded">
                <img src="/imgs/logo/light-logo.png" />
              </div>
            </div>
            <span className="px-8 text-4xl text-primary block">
              <span className=" font-bold">IQRA Afghanistan</span>-We Make{" "}
              <em>EDUCATION</em> Accessible to <em>EVERYONE!</em>
            </span>
          </div>
        </div>
        <div className="flex flex-col w-[55%] h-full justify-center items-center">
          {form1 && (
            <form onSubmit={handleForm1} className="w-9/12">
              <div className="flex flex-col card bg-accent shadow-xl w-full py-4 px-5 h-fit">
                <div className="avatar mb-6">
                  <div className="w-14 h-14 rounded">
                    <img src="/imgs/logo/light-logo.png" />
                  </div>
                </div>
                <span className="label-text text-info text-base block">
                  {signupPage.starText1}
                  <span className="text-error text-lg">{signupPage.star}</span>
                  {signupPage.starText2}
                </span>
                <div className="flex flex-row">
                  <label className="label block">
                    <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg label-text text-base block text-primary-focus">
                      {signupPage.firstName}:
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={signupPage.firstName}
                      className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                    />
                  </label>
                  <label className="label block">
                    <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                      {signupPage.lastName}:
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={signupPage.lastName}
                      className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                    />
                  </label>
                </div>
                <div className="flex flex-row gap-3 ">
                  <label className="label justify-start">
                    <input
                      type="radio"
                      name="gender"
                      defaultChecked
                      className="peer mt-1"
                    />
                    <span className="label-text ml-1 text-base block text-secondary peer-checked:text-primary">
                      {signupPage.female}
                    </span>
                  </label>
                  <label className="label justify-start ">
                    <input type="radio" name="gender" className="peer mt-1" />
                    <span className="label-text ml-1 text-base block text-secondary peer-checked:text-primary">
                      {signupPage.male}
                    </span>
                  </label>
                </div>
                <label className="label flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus ">
                    {signupPage.email}:
                  </span>
                  {emailUsed && (
                    <span className="text-error font-medium mb-2 h-6 max-w-xs p-0 pl-4">
                      {signupPage.emailSigned}
                    </span>
                  )}
                  <input
                    type="email"
                    required
                    placeholder={signupPage.email}
                    className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <label className="label block">
                  <span className="label-text text-base block text-primary-focus">
                    {signupPage.phoneNo}:
                  </span>
                  <input
                    type="number"
                    placeholder="0700000000"
                    className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-20 rounded-3xl mt-5 disabled:btn-primary disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      signupPage.next
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
          {form2 && (
            <form onSubmit={handleForm2} className="w-9/12">
              <div className="flex flex-col card bg-accent shadow-xl py-7 w-full px-5 h-fit">
                <div className="avatar mb-6">
                  <div className="w-14 h-14 rounded">
                    <img src="/imgs/logo/light-logo.png" />
                  </div>
                </div>
                <span className="label-text text-info text-base block">
                  {signupPage.starText1}
                  <span className="text-error text-lg">{signupPage.star}</span>
                  {signupPage.starText2}
                </span>
                <div className="flex flex-row gap-3">
                  <label className="label justify-start">
                    <input
                      id="student-check"
                      type="radio"
                      name="role"
                      defaultChecked
                      onChange={handleRole}
                      className="peer mt-1 student"
                    />
                    <span className="label-text ml-1 text-base block text-secondary peer-checked:text-primary">
                      {signupPage.student}
                    </span>
                  </label>
                  <label className="label justify-start ">
                    <input
                      type="radio"
                      name="role"
                      onChange={handleRole}
                      className="peer mt-1"
                    />
                    <span className="label-text ml-1 text-base block text-secondary peer-checked:text-primary">
                      {signupPage.teacher}
                    </span>
                  </label>
                </div>
                {student && (
                  <label className="label block">
                    <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                      {signupPage.class}:
                    </span>
                    <select className="select select-primary focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500">
                      <option defaultValue={7}>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </select>
                  </label>
                )}
                <label className="label block">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                    {signupPage.address}:
                  </span>
                  <input
                    type="text"
                    required
                    placeholder={signupPage.streetAdd}
                    className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <div className="flex flex-row">
                  <label className="label block">
                    <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                      {signupPage.city}:
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={signupPage.city}
                      className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                    />
                  </label>
                  <label className="label block">
                    <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                      {signupPage.province}:
                    </span>
                    <select className="select w-28 select-primary focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500">
                      <option defaultValue={"Kabul"}>Kabul</option>
                      <option>Nangarhar</option>
                      <option>Kunduz</option>
                      <option>Balkh</option>
                      <option>Herat</option>
                      <option>Kandahar</option>
                    </select>
                  </label>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setForm2(false);
                      setForm1(true);
                    }}
                    className="btn btn-secondary w-20 rounded-3xl mt-5"
                  >
                    {signupPage.back}
                  </button>
                  <input
                    type="submit"
                    value={signupPage.next}
                    className="btn btn-primary w-20 rounded-3xl mt-5"
                  />
                </div>
              </div>
            </form>
          )}
          {form3 && (
            <form onSubmit={handleForm3} className="w-9/12">
              <div className="flex flex-col card bg-accent shadow-xl py-7 w-full px-5 h-fit">
                <div className="avatar mb-6">
                  <div className="w-14 h-14 rounded">
                    <img src="/imgs/logo/light-logo.png" />
                  </div>
                </div>
                <span className="label-text text-info text-base block">
                  {signupPage.starText1}
                  <span className="text-error text-lg">{signupPage.star}</span>
                  {signupPage.starText2}
                </span>
                <label className="label flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus ">
                    {signupPage.password}:
                  </span>
                  <div className="flex justify-start w-full items-center gap-2 input input-bordered input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                    <input
                      type={passwordShown ? "text" : "password"}
                      required
                      onChange={(e) => {
                        passReqs.forEach((i) => {
                          const isValid = i.regex.test(e.target.value);
                          i.index == 0
                            ? setEightChars(isValid)
                            : i.index == 1
                            ? setNumberInc(isValid)
                            : setCharInc(isValid);
                        });
                        if (
                          reqBody.confirmPassword &&
                          e.target.value === reqBody.confirmPassword
                        ) {
                          setSameText(true);
                        } else {
                          setSameText(false);
                        }
                        setReqBody({ ...reqBody, password: e.target.value });
                      }}
                      disabled={isLoading}
                      placeholder={signupPage.password}
                      className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary disabled:opacity-80 focus:text-primary-focus focus:font-medium text-neutral-500"
                    />
                    <button
                      onClick={() => {
                        setPasswordShown(!passwordShown);
                        // console.log(reqBody);
                      }}
                      type="button"
                      disabled={isLoading}
                      className="hover:text-primary active:text-primary-focus text-primary text-opacity-50"
                    >
                      {passwordShown ? (
                        <FontAwesomeIcon icon={faEyeSlash} size="xl" />
                      ) : (
                        <FontAwesomeIcon icon={faEye} size="xl" />
                      )}
                    </button>
                  </div>
                </label>
                <span
                  className={`text-xs text-error block ${
                    eightChars ? "text-success" : "text-error"
                  }`}
                >
                  {!eightChars ? (
                    <FontAwesomeIcon icon={faX} size="xl" />
                  ) : (
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                  )}
                  {signupPage.eightChars}
                </span>
                <span
                  className={`text-xs text-error block ${
                    numberInc ? "text-success" : "text-error"
                  }`}
                >
                  {!numberInc ? (
                    <FontAwesomeIcon icon={faX} size="xl" />
                  ) : (
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                  )}
                  {signupPage.numsInc}
                </span>
                <span
                  className={`text-xs text-error block ${
                    charInc ? "text-success" : "text-error"
                  }`}
                >
                  {!charInc ? (
                    <FontAwesomeIcon icon={faX} size="xl" />
                  ) : (
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                  )}
                  {signupPage.specChars}
                </span>
                <label className="label flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                    {signupPage.conPassword}:
                  </span>
                  <div className="flex justify-start w-full items-center gap-2 input input-bordered input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                    <input
                      type={confirmPasswordShown ? "text" : "password"}
                      required
                      onChange={(e) => {
                        if (
                          reqBody.password &&
                          e.target.value === reqBody.password
                        ) {
                          setSameText(true);
                        } else {
                          setSameText(false);
                        }
                        setReqBody({
                          ...reqBody,
                          confirmPassword: e.target.value,
                        });
                      }}
                      disabled={isLoading}
                      placeholder={signupPage.conPassword}
                      className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary disabled:opacity-80 focus:text-primary-focus focus:font-medium text-neutral-500"
                    />
                    <button
                      onClick={() => {
                        setConfirmPasswordShown(!confirmPasswordShown);
                        // console.log(reqBody);
                      }}
                      type="button"
                      disabled={isLoading}
                      className="hover:text-primary active:text-primary-focus text-primary text-opacity-50"
                    >
                      {confirmPasswordShown ? (
                        <FontAwesomeIcon icon={faEyeSlash} size="xl" />
                      ) : (
                        <FontAwesomeIcon icon={faEye} size="xl" />
                      )}
                    </button>
                  </div>
                </label>
                <span
                  className={`text-xs text-error block ${
                    sameText ? "text-success" : "text-error"
                  }`}
                >
                  {sameText ? (
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                  ) : (
                    <FontAwesomeIcon icon={faX} size="xl" />
                  )}
                  {signupPage.passEConPass}
                </span>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setForm3(false);
                      setForm2(true);
                      setReqBody({
                        ...reqBody,
                        confirmPassword: null,
                        password: null,
                      });
                      // console.log(reqBody);
                    }}
                    disabled={isLoading}
                    className="btn btn-secondary w-20 rounded-3xl mt-5 disabled:btn-secondary disabled:opacity-80"
                  >
                    {signupPage.back}
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !sameText ||
                      !charInc ||
                      !numberInc ||
                      !eightChars
                    }
                    className="btn btn-primary rounded-3xl mt-5 disabled:btn-primary disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      signupPage.signup
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
