/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEye,
  faEyeSlash,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logIn, logOut, setUser } from "../actions";
import FormData from "form-data";

export function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nameEdit, setNameEdit] = useState(false);
  const [passEdit, setPassEdit] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [sameText, setSameText] = useState(false);
  const [eightChars, setEightChars] = useState(false);
  const [numberInc, setNumberInc] = useState(false);
  const [charInc, setCharInc] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [wrongCurrentPass, setWrongCurrentPass] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [reqBody, setReqBody] = useState(null);
  const [reqUpdateBody, setReqUpdateBody] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const passReqs = [
    { regex: /.{8,}/, index: 0 },
    { regex: /[0-9]/, index: 1 },
    { regex: /[^a-zA-Z0-9]/, index: 2 },
  ];

  const updateReq = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setReqUpdateBody({
      ...reqUpdateBody,
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      class: user.role === "student" ? e.target[2].value : null,
      gender: user.role === "student" ? e.target[3].value : e.target[2].value,
      address: {
        streetAdd:
          user.role === "student" ? e.target[4].value : e.target[3].value,
        city: user.role === "student" ? e.target[5].value : e.target[4].value,
        province:
          user.role === "student" ? e.target[6].value : e.target[5].value,
      },
    });
  };

  const updateMe = async () => {
    try {
      const res = await axios.patch(
        "https://iqraafg.cyclic.app/api/v1/users/updateMe",
        reqUpdateBody,
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setReqUpdateBody(null);
      setNameEdit(false);
      dispatch(setUser(res.data.data.user));
      dispatch(logIn());
      setUpdated(true);
      setTimeout(() => {
        setUpdated(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const updatePhoto = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let photo = new FormData();
    photo.append("photo", e.target[0].files[0], "photo");
    try {
      const res = await axios.patch(
        "https://iqraafg.cyclic.app/api/v1/users/updateMe",
        photo,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundry=${photo._boundry}`,
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setReqUpdateBody(null);
      setNameEdit(false);
      dispatch(setUser(res.data.data.user));
      dispatch(logIn());
      setUpdated(true);
      document.getElementById("photoForm").reset();
      setTimeout(() => {
        setUpdated(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePass = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.patch(
        "https://iqraafg.cyclic.app/api/v1/users/updatePassword",
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      console.log(res);
      document.cookie = `jwt=${res.data.token}; max-age=${new Date(
        Date.now + 2 * 24 * 60 * 60 * 1000
      )}`;
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setPasswordUpdated(true);
      setPassEdit(false);
      document.getElementById("passForm").reset();
      dispatch(logIn());
      setTimeout(() => {
        setPasswordUpdated(false);
      }, 4000);
    } catch (err) {
      if (err.response.status == 401) {
        setWrongCurrentPass(true);
        setTimeout(() => {
          setWrongCurrentPass(false);
        }, 4000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("https://iqraafg.cyclic.app/api/v1/users/deleteMe", {
        headers: {
          Authorization: `Bearer ${document.cookie
            .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
            ?.pop()}`,
        },
      });
      dispatch(logOut());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (reqUpdateBody) {
      updateMe();
    }
  }, [reqUpdateBody]);
  document.title = "Edit Profile";
  const user = useSelector((s) => s.user);
  return (
    <>
      <div className="flex justify-center mt-10 mb-20">
        <div className="flex flex-row card bg-accent shadow-xl py-7 w-10/12 px-5 gap-3">
          <div className="flex flex-col pt-8 pl-8 items-center justify-start gap-y-4 w-2/5">
            <div className="avatar">
              <div className="w-28 rounded-full cursor-pointer outline outline-2 outline-primary">
                <img
                  src={
                    user.photo ? `${user.photo}` : `/imgs/user-imgs/default.jpg`
                  }
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-2">
              <span className="label-text text-lg block text-primary-focus">
                {`${user.firstName}`[0].toUpperCase() +
                  `${user.firstName}`.substring(1) +
                  " " +
                  `${user.lastName}`[0].toUpperCase() +
                  `${user.lastName}`.substring(1)}
              </span>
              <span className="label-text text-center text-sm block text-primary-focus">
                {`ID: ${user.userID}`}
                <br />
                {`${user.role}`[0].toUpperCase() +
                  `${user.role}`.substring(1) +
                  `${user.role === "student" ? `, Class: ${user.class}` : ""}`}
              </span>
              <div className="divider m-0 before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
              <span className="label-text text-center text-sm block text-primary-focus">
                {user.phoneNumber && (
                  <>
                    {user.phoneNumber}
                    <br />
                  </>
                )}

                {user.email}
              </span>
              <div className="divider before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
              <span className="label-text text-center text-sm block text-primary-focus">
                {`Address: ${user.address.streetAdd}, ${user.address.city} City, ${user.address.province}, Afghanistan`}
              </span>
            </div>
          </div>
          <div className="divider divider-horizontal before:bg-secondary after:bg-secondary"></div>
          <div className="flex flex-col w-3/5">
            {updated && (
              <span className={`text-md block text-success`}>
                <FontAwesomeIcon icon={faCheck} size="xl" />
                {` Updated Successfully!`}
              </span>
            )}
            <form id="photoForm" onSubmit={updatePhoto}>
              <label className="label flex flex-col justify-start items-start">
                <span className="label-text text-xs block text-primary-focus ">
                  Profile Photo:
                </span>
                <div className="flex justify-start pr-0 w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                  <span className="badge badge-info text-xs">
                    Profile photo change will be available soon!
                  </span>
                  {/* <input
                    type="file"
                    name="photo"
                    required
                    disabled={!nameEdit || isLoading}
                    className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus font-medium"
                  />
                  {nameEdit && (
                    <button
                      disabled={isLoading}
                      className="btn btn-success btn-circle btn-sm btn-outline hover:text-primary active:text-primary-focus text-primary text-opacity-50 self-center"
                    >
                      <FontAwesomeIcon icon={faCheck} size="xl" />
                    </button>
                  )} 
                  When the issue of file uploading is solved*/}
                </div>
              </label>
            </form>
            <form onSubmit={updateReq}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row">
                  <label className="label flex flex-col justify-start items-start">
                    <span className="label-text text-xs block text-primary-focus ">
                      First Name:
                    </span>
                    <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                      <input
                        type="text"
                        disabled={!nameEdit}
                        defaultValue={
                          `${user.firstName}`[0].toUpperCase() +
                          `${user.firstName}`.substring(1)
                        }
                        className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus font-medium"
                      />
                    </div>
                  </label>
                  <label className="label flex flex-col justify-start items-start">
                    <span className="label-text text-xs block text-primary-focus ">
                      Last Name:
                    </span>
                    <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                      <input
                        type="text"
                        disabled={!nameEdit}
                        defaultValue={
                          `${user.lastName}`[0].toUpperCase() +
                          `${user.lastName}`.substring(1)
                        }
                        className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus font-medium"
                      />
                    </div>
                  </label>
                </div>
                <div className="flex flex-row">
                  {user.role === "student" ? (
                    <label className="label flex flex-col justify-start items-start">
                      <span className="label-text text-xs block text-primary-focus ">
                        Class:
                      </span>
                      <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                        <input
                          type="number"
                          min={7}
                          max={12}
                          disabled={!nameEdit}
                          defaultValue={user.class}
                          className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus font-medium"
                        />
                      </div>
                    </label>
                  ) : (
                    ""
                  )}
                  <label className="label flex flex-col justify-start items-start">
                    <span className="label-text text-xs block text-primary-focus ">
                      Gender:
                    </span>
                    <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                      <select
                        disabled={!nameEdit}
                        className="select w-28 focus:outline-none text-primary-focus disabled:bg-accent disabled:text-primary-focus disabled:border-0 disabled:opacity-100"
                      >
                        <option defaultValue={user.gender}>
                          {user.gender}
                        </option>
                        <option>
                          {user.gender === "male" ? "female" : "male"}
                        </option>
                      </select>
                    </div>
                  </label>
                </div>
                <div className="flex flex-col">
                  <label className="label flex flex-col justify-start items-start">
                    <span className="label-text text-xs block text-primary-focus ">
                      Street:
                    </span>
                    <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                      <input
                        type="text"
                        disabled={!nameEdit}
                        defaultValue={
                          `${user.address.streetAdd}`[0].toUpperCase() +
                          `${user.address.streetAdd}`.substring(1)
                        }
                        className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus font-medium"
                      />
                    </div>
                  </label>
                  <div className="flex flex-row">
                    <label className="label flex flex-col justify-start items-start">
                      <span className="label-text text-xs block text-primary-focus ">
                        City:
                      </span>
                      <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                        <input
                          type="text"
                          disabled={!nameEdit}
                          defaultValue={
                            `${user.address.city}`[0].toUpperCase() +
                            `${user.address.city}`.substring(1)
                          }
                          className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus font-medium"
                        />
                      </div>
                    </label>
                    <label className="label flex flex-col justify-start items-start">
                      <span className="label-text text-xs block text-primary-focus ">
                        Province:
                      </span>
                      <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                        <select
                          disabled={!nameEdit}
                          className="select w-28 focus:outline-none text-primary-focus disabled:bg-accent disabled:text-primary-focus disabled:border-0 disabled:opacity-100"
                        >
                          <option defaultValue={user.address.province}>
                            {user.address.province}
                          </option>
                          <option>Nangarhar</option>
                          <option>Kunduz</option>
                          <option>Balkh</option>
                          <option>Herat</option>
                          <option>Kandahar</option>
                        </select>
                      </div>
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setNameEdit(!nameEdit);
                    // console.log(reqBody);
                  }}
                  type="button"
                  disabled={isLoading}
                  className="btn btn-outline hover:text-primary active:text-primary-focus text-primary text-opacity-50"
                >
                  {nameEdit ? (
                    <>
                      <FontAwesomeIcon icon={faX} size="xl" />
                      {` Cancel`}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                      {` edit`}
                    </>
                  )}
                </button>
                {nameEdit && (
                  <button
                    disabled={isLoading}
                    className="btn btn-success btn-outline hover:text-primary active:text-primary-focus text-primary text-opacity-50"
                  >
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                    {` Save`}
                  </button>
                )}
              </div>
            </form>
            <div className="divider before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
            <form id="passForm" onSubmit={updatePass}>
              <div className="flex flex-col">
                {wrongCurrentPass && (
                  <span className={`text-md block text-error`}>
                    <FontAwesomeIcon icon={faX} size="xl" />
                    {` Current Password Wrong!`}
                  </span>
                )}
                {passwordUpdated && (
                  <span className={`text-md block text-success`}>
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                    {` Password Updated Successfully!`}
                  </span>
                )}
                <label className="label flex flex-col justify-start items-start">
                  <span className="label-text text-xs block text-primary-focus ">
                    Current Password:
                  </span>
                  <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                    <input
                      type="text"
                      disabled={!passEdit}
                      onChange={(e) => {
                        setReqBody({
                          ...reqBody,
                          currentPassword: e.target.value,
                        });
                      }}
                      placeholder="Current Password"
                      className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus focus:font-medium"
                    />
                  </div>
                </label>
                <div className="flex flex-row">
                  <label className="label flex flex-col justify-start items-start">
                    <span className="label-text text-xs block text-primary-focus">
                      New Password:
                    </span>
                    <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
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
                            reqBody.confirmNewPassword &&
                            e.target.value === reqBody.confirmNewPassword
                          ) {
                            setSameText(true);
                          } else {
                            setSameText(false);
                          }
                          setReqBody({
                            ...reqBody,
                            newPassword: e.target.value,
                          });
                        }}
                        disabled={isLoading || !passEdit}
                        placeholder="Password"
                        className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus focus:font-medium"
                      />
                      <button
                        onClick={() => {
                          setPasswordShown(!passwordShown);
                          // console.log(reqBody);
                        }}
                        type="button"
                        disabled={isLoading || !passEdit}
                        className="hover:text-primary active:text-primary-focus text-xs text-primary text-opacity-50"
                      >
                        {passwordShown ? (
                          <FontAwesomeIcon icon={faEyeSlash} size="xl" />
                        ) : (
                          <FontAwesomeIcon icon={faEye} size="xl" />
                        )}
                      </button>
                    </div>
                  </label>
                  <label className="label flex flex-col justify-start items-start">
                    <span className="label-text text-xs block text-primary-focus">
                      Confirm New Password:
                    </span>
                    <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                      <input
                        type={confirmPasswordShown ? "text" : "password"}
                        required
                        onChange={(e) => {
                          if (
                            reqBody.newPassword &&
                            e.target.value === reqBody.newPassword
                          ) {
                            setSameText(true);
                          } else {
                            setSameText(false);
                          }
                          setReqBody({
                            ...reqBody,
                            confirmNewPassword: e.target.value,
                          });
                        }}
                        disabled={isLoading || !passEdit}
                        placeholder="Confirm Password"
                        className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus focus:font-medium"
                      />
                      <button
                        onClick={() => {
                          setConfirmPasswordShown(!confirmPasswordShown);
                          // console.log(reqBody);
                        }}
                        type="button"
                        disabled={isLoading || !passEdit}
                        className="hover:text-primary active:text-primary-focus text-xs text-primary text-opacity-50"
                      >
                        {confirmPasswordShown ? (
                          <FontAwesomeIcon icon={faEyeSlash} size="xl" />
                        ) : (
                          <FontAwesomeIcon icon={faEye} size="xl" />
                        )}
                      </button>
                    </div>
                  </label>
                </div>
                {passEdit && (
                  <>
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
                      Password Must be 8 or more Characters
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
                      Password Must Contain a Number i.e. 0-9
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
                      Password Must Contain a Special Character i.e. +,*,$,@...
                    </span>
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
                      "Password" and "Confirm Password" Must be Same
                    </span>
                  </>
                )}
                <button
                  onClick={() => {
                    setPassEdit(!passEdit);
                    // console.log(reqBody);
                  }}
                  type="button"
                  disabled={isLoading}
                  className="btn btn-outline hover:text-primary active:text-primary-focus text-primary text-opacity-50"
                >
                  {passEdit ? (
                    <>
                      <FontAwesomeIcon icon={faX} size="xl" />
                      {` Cancel`}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                      {` edit`}
                    </>
                  )}
                </button>
                {passEdit && (
                  <button
                    disabled={
                      isLoading ||
                      !sameText ||
                      !charInc ||
                      !numberInc ||
                      !eightChars
                    }
                    className="btn btn-success btn-outline hover:text-primary active:text-primary-focus text-primary text-opacity-50 mt-3 disabled:btn-outline disabled:opacity-80"
                  >
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                    {` Save`}
                  </button>
                )}
              </div>
            </form>
            <div className="divider before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
            <div>
              <button
                onClick={() => window.my_modal_1.showModal()}
                type="button"
                disabled={isLoading}
                className="btn btn-error btn-outline"
              >
                <FontAwesomeIcon icon={faTrashCan} size="xl" />
                {` Delete Account`}
              </button>
              <dialog id="my_modal_1" className="modal">
                <form
                  method="dialog"
                  className="modal-box bg-error opacity-90 text-error-content"
                >
                  <h3 className="font-bold text-lg">Note!</h3>
                  <p className="py-4">
                    This action will DELETE your account. You will not be able
                    to access your account if DELETED!
                  </p>
                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn border-error bg-error-content text-error hover:bg-error hover:border-error-content hover:text-error-content">
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn border-error bg-error-content text-error hover:bg-error hover:border-error-content hover:text-error-content"
                    >
                      DELETE
                    </button>
                  </div>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
