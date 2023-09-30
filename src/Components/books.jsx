/* eslint-disable react-hooks/exhaustive-deps */
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";

export function Books() {
  const [dariBooks, setDariBooks] = useState(true);
  const [classe, setClasse] = useState(7);
  const [subject, setSubject] = useState(null);
  const logged = useSelector((store) => store.isLogged);
  return (
    <>
      {logged && (
        <div className="text-primary card shadow-xl m-11 p-9 bg-accent overflow-x-hidden">
          <h1 className=" card-title text-3xl mb-9">Books:</h1>
          <div
            onClick={(e) => setClasse(1 * e.target.text.split(" ")[1])}
            className="tabs my-3"
          >
            <a
              className={`tab tab-lifted ${
                classe === 7 ? "tab-active text-primary" : ""
              }`}
            >
              Class 7
            </a>
            <a
              className={`tab tab-lifted ${
                classe === 8 ? "tab-active text-primary" : ""
              }`}
            >
              Class 8
            </a>
            <a
              className={`tab tab-lifted ${
                classe === 9 ? "tab-active text-primary" : ""
              }`}
            >
              Class 9
            </a>
            <a
              className={`tab tab-lifted ${
                classe === 10 ? "tab-active text-primary" : ""
              }`}
            >
              Class 10
            </a>
            <a
              className={`tab tab-lifted ${
                classe === 11 ? "tab-active text-primary" : ""
              }`}
            >
              Class 11
            </a>
            <a
              className={`tab tab-lifted ${
                classe === 12 ? "tab-active text-primary" : ""
              }`}
            >
              Class 12
            </a>
          </div>
          <div
            onClick={(e) => setDariBooks(e.target.text === "Dari Books")}
            className="tabs"
          >
            <a
              className={`tab tab-lifted ${
                dariBooks ? "tab-active text-primary" : ""
              }`}
            >
              Dari Books
            </a>
            <a
              className={`tab tab-lifted ${
                dariBooks ? "" : "tab-active text-primary"
              }`}
            >
              Pashto Books
            </a>
          </div>
          <dialog id="mm1" className="modal h-screen w-screen ">
            <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
              <form method="dialog">
                <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                  <FontAwesomeIcon icon={faX} className="text-white" />
                </button>
              </form>
              <iframe
                src={`https://moe.gov.af/sites/default/files/2020-03/G${classe}-${
                  dariBooks ? (subject === "English" ? "Ps" : "Dr") : "Ps"
                }-${
                  subject === "Islamic_Study"
                    ? dariBooks
                      ? classe === 10
                        ? "Islamic_Study_hanafi"
                        : "Islamic_Study_Hanafi"
                      : subject
                    : subject === "Physic"
                    ? dariBooks
                      ? classe === 10
                        ? "physic"
                        : subject
                      : subject
                    : subject
                }${classe === 8 ? (subject === "Math" ? "_0" : "") : ""}.pdf`}
                className="h-full w-10/12"
              />
            </div>
          </dialog>
          <div className="overflow-x-auto">
            <table className="table my-10 bg-secondary bg-opacity-5">
              {/* head */}
              <thead>
                <tr className="text-primary text-base border-opacity-60">
                  <th></th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Language</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("Islamic_Study");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>1</th>
                  <td>Islamic Study</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("Math");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>1</th>
                  <td>Mathematics</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("Biology");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>2</th>
                  <td>Biology</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("Physic");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>3</th>
                  <td>Physics</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("Chemistry");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>4</th>
                  <td>Chemistry</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("English");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>5</th>
                  <td>English</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("Dari");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>5</th>
                  <td>Dari</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("Pashto");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>6</th>
                  <td>Pashto</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("History");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>7</th>
                  <td>History</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {/* row */}
                <tr
                  onClick={() => {
                    setSubject("Geography");
                    document.getElementById("mm1").showModal();
                  }}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>8</th>
                  <td>Geography</td>
                  <td>{classe}</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>

                {classe >= 10 ? (
                  <>
                    <tr
                      onClick={() => {
                        setSubject("Computer");
                        document.getElementById("mm1").showModal();
                      }}
                      className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                    >
                      <th>5</th>
                      <td>Computer</td>
                      <td>{classe}</td>
                      <td>{dariBooks ? "Dari" : "Pashto"}</td>
                    </tr>
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
