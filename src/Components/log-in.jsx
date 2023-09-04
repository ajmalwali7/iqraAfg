/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, noNav, setUser } from "../actions";

export function Login() {
  const dispatch = useDispatch();
  const login = useSelector((s) => s.lang.loginPage);
  const [isLoading, setIsLoading] = useState(false);
  const [sameText, setSameText] = useState(false);
  const [eightChars, setEightChars] = useState(false);
  const [numberInc, setNumberInc] = useState(false);
  const [charInc, setCharInc] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [incorrectCreds, setIncorrectCreds] = useState(false);
  const [noUserFound, setNoUserFound] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [tokenSent, setTokenSent] = useState(false);
  const [tokenWrong, setTokenWrong] = useState(false);
  const [error, setError] = useState(false);
  const [reqBody, setReqBody] = useState({});

  const navigate = useNavigate();

  const passReqs = [
    { regex: /.{8,}/, index: 0 },
    { regex: /[0-9]/, index: 1 },
    { regex: /[^a-zA-Z0-9]/, index: 2 },
  ];

  async function sendReset(e) {
    e.preventDefault();
    setIsLoading(true);
    const email = {
      email: e.target[0].value,
    };
    try {
      await axios.post(
        `https://iqraafg.cyclic.app/api/v1/users/forgotPassword`,
        email
      );
      document.querySelector("form").reset();
      setTokenSent(true);
    } catch (err) {
      if (err.response.status == 404) {
        setNoUserFound(true);
        setTimeout(() => {
          setNoUserFound(false);
        }, 3000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function resetPassword(e) {
    e.preventDefault();
    console.log(e);
    setIsLoading(true);
    const body = {
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      const res = await axios.patch(
        `https://iqraafg.cyclic.app/api/v1/users/resetPassword/${e.target[0].value}`,
        body
      );
      document.cookie = `jwt=${res.data.token}; max-age=${new Date(
        Date.now + 2 * 24 * 60 * 60 * 1000
      )}`;
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      dispatch(setUser(res.data.data.user));
      dispatch(logIn());
      navigate("/");
    } catch (err) {
      if (err.response.status == 400) {
        setTokenWrong(true);
        setTimeout(() => {
          setTokenWrong(false);
        }, 3000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForm1(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://iqraafg.cyclic.app/api/v1/users/login`,
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
      if (err.response.status == 401) {
        setIncorrectCreds(true);
        setTimeout(() => {
          setIncorrectCreds(false);
        }, 3000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  }
  dispatch(noNav());
  document.title = "Log In: Iqra Afghanistan";

  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <div className="invisible md:visible w-0 md:w-[45%] bg-gradient-to-br from-primary to-secondary flex justify-center items-center">
          <div className="w-4/5 bg-accent opacity-70 rounded-2xl flex flex-col gap-6 justify-center items-center py-5">
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
        <div className="flex flex-col w-full md:w-[55%] h-full justify-center items-center">
          {!forgotPassword ? (
            <form onSubmit={handleForm1} className="w-11/12 md:w-9/12">
              <div className="flex flex-col card bg-accent shadow-xl w-full py-4 px-5 h-fit">
                <div className="avatar mb-6">
                  <div className="w-14 h-14 rounded">
                    <img src="/imgs/logo/light-logo.png" />
                  </div>
                </div>
                {incorrectCreds && (
                  <span className="alert alert-error text-white font-medium mb-2 h-6 max-w-xs p-0 pl-4 flex items-center">
                    {login.incorrectCreds}
                  </span>
                )}
                {error && (
                  <span className="alert alert-error text-white font-medium mb-2 h-6 max-w-xs p-0 pl-4 flex items-center">
                    {login.errorLoggingIn}
                  </span>
                )}
                <label className="label flex flex-col justify-start items-start px-0">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus ">
                    {login.email}:
                  </span>
                  <input
                    type="email"
                    required
                    placeholder={login.email}
                    onChange={(e) => {
                      setReqBody({ ...reqBody, email: e.target.value });
                    }}
                    className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <label className="label flex flex-col justify-start items-start max-w-xs px-0">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus ">
                    {login.password}:
                  </span>
                  <div className="flex justify-start w-full items-center gap-2 input input-bordered input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                    <input
                      type={passwordShown ? "text" : "password"}
                      required
                      onChange={(e) => {
                        setReqBody({ ...reqBody, password: e.target.value });
                      }}
                      disabled={isLoading}
                      placeholder={login.password}
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
                  <a
                    onClick={() => setForgotPassword(true)}
                    className="link text-xs m-1 self-end block text-primary-focus "
                  >
                    {login.forgotPassword}
                  </a>
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
                      login.login
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : !tokenSent ? (
            <form onSubmit={sendReset} className="w-11/12 md:w-9/12">
              <div className="flex flex-col card bg-accent shadow-xl w-full py-4 px-5 h-fit">
                <div className="avatar mb-6">
                  <div className="w-14 h-14 rounded">
                    <img src="/imgs/logo/light-logo.png" />
                  </div>
                </div>
                {noUserFound && (
                  <span className="alert alert-error text-white font-medium mb-2 h-6 max-w-xs p-0 pl-4 flex items-center">
                    {login.noUserFound}
                  </span>
                )}
                {error && (
                  <span className="alert alert-error text-white font-medium mb-2 h-6 max-w-xs p-0 pl-4 flex items-center">
                    {login.errorLoggingIn}
                  </span>
                )}
                <label className="label flex flex-col justify-start items-start px-0">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus ">
                    {login.email}:
                  </span>
                  <input
                    type="email"
                    required
                    placeholder={login.email}
                    className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <div className="flex justify-between">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setForgotPassword(false)}
                    className="btn btn-secondary rounded-3xl mt-5 disabled:btn-secondary disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      login.back
                    )}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary rounded-3xl mt-5 disabled:btn-primary disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      login.sendReset
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={resetPassword} className="w-11/12 md:w-9/12">
              <div className="flex flex-col card bg-accent shadow-xl w-full py-4 px-5 h-fit">
                <div className="avatar mb-6">
                  <div className="w-14 h-14 rounded">
                    <img src="/imgs/logo/light-logo.png" />
                  </div>
                </div>
                {tokenWrong && (
                  <span className="alert alert-error text-white font-medium mb-2 p-2 pl-4 flex items-center">
                    {login.tokenWrong}
                  </span>
                )}
                {error && (
                  <span className="alert alert-error text-white font-medium mb-2 h-6 max-w-xs p-0 pl-4 flex items-center">
                    {login.errorLoggingIn}
                  </span>
                )}
                <span className="alert alert-info text-sm md:text-base text-white md:font-medium mb-2 h-fit p-2">
                  {login.tokenSent}
                </span>
                <label className="label flex flex-col justify-start items-start px-0">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus ">
                    {login.token}:
                  </span>
                  <input
                    type="text"
                    required
                    placeholder={login.token}
                    className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <label className="label flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus ">
                    {login.newPassword}:
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
                          confirmPassword &&
                          e.target.value === confirmPassword
                        ) {
                          setSameText(true);
                        } else {
                          setSameText(false);
                        }
                        setPassword(e.target.value);
                      }}
                      disabled={isLoading}
                      placeholder={login.newPassword}
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
                  {login.eightChars}
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
                  {login.numsInc}
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
                  {login.specChars}
                </span>
                <label className="label flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                    {login.conPass}:
                  </span>
                  <div className="flex justify-start w-full items-center gap-2 input input-bordered input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                    <input
                      type={confirmPasswordShown ? "text" : "password"}
                      required
                      onChange={(e) => {
                        if (password && e.target.value === password) {
                          setSameText(true);
                        } else {
                          setSameText(false);
                        }
                        setConfirmPassword(e.target.value);
                      }}
                      disabled={isLoading}
                      placeholder={login.conPass}
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
                  {login.passEConPass}
                </span>
                <div className="flex justify-between">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setTokenSent(false)}
                    className="btn btn-secondary rounded-3xl mt-5 disabled:btn-secondary disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      login.back
                    )}
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
                      login.save
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
