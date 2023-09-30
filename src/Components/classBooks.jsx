/* eslint-disable react-hooks/exhaustive-deps */
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function ClassBooks() {
  const [dariBooks, setDariBooks] = useState(true);
  const logged = useSelector((store) => store.isLogged);
  const classe = useParams();
  return (
    <>
      {logged && (
        <div className="text-primary card shadow-xl m-11 p-9 bg-accent overflow-x-hidden">
          <h1 className=" card-title text-3xl mb-9">
            Class {classe.class.slice(5)} Books:
          </h1>
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
          <div className="overflow-x-auto">
            <table className="table my-10 bg-secondary bg-opacity-5">
              {/* head */}
              <thead>
                <tr className="text-primary text-base border-opacity-60">
                  <th></th>
                  <th>Name</th>
                  <th>Language</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm10").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>1</th>
                  <td>Islamic Study</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm10" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-${dariBooks ? "Dr" : "Ps"}-Islamic_Study${
                        dariBooks
                          ? classe.class.slice(5) === "10"
                            ? "_hanafi"
                            : "_Hanafi"
                          : ""
                      }.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm1").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>1</th>
                  <td>Mathematics</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm1" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-${dariBooks ? "Dr" : "Ps"}-Math${
                        classe.class.slice(5) === "8" ? "_0" : ""
                      }.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm2").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>2</th>
                  <td>Biology</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm2" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-${dariBooks ? "Dr" : "Ps"}-Biology.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm3").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>3</th>
                  <td>Physics</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm3" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-${dariBooks ? "Dr" : "Ps"}-Physic.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm4").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>4</th>
                  <td>Chemistry</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm4" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-${dariBooks ? "Dr" : "Ps"}-Chemistry.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm9").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>5</th>
                  <td>English</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm9" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-Ps-English.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm4").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>5</th>
                  <td>Dari</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm5" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-${dariBooks ? "Dr" : "Ps"}-Dari.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm6").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>6</th>
                  <td>Pashto</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm6" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-${dariBooks ? "Dr" : "Ps"}-Pashto.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm7").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>7</th>
                  <td>History</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm7" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-${dariBooks ? "Dr" : "Ps"}-History.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {/* row */}
                <tr
                  onClick={() => document.getElementById("mm8").showModal()}
                  className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                >
                  <th>8</th>
                  <td>Geography</td>
                  <td>{dariBooks ? "Dari" : "Pashto"}</td>
                </tr>
                <dialog id="mm8" className="modal h-screen w-screen ">
                  <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                    <form method="dialog">
                      <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                        <FontAwesomeIcon icon={faX} className="text-white" />
                      </button>
                    </form>
                    <iframe
                      src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                        5
                      )}-${dariBooks ? "Dr" : "Ps"}-Geography.pdf`}
                      className="h-full w-10/12"
                    />
                  </div>
                </dialog>
                {classe.class.slice(5) >= 10 ? (
                  <>
                    <tr
                      onClick={() =>
                        document.getElementById("mm11").showModal()
                      }
                      className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                    >
                      <th>5</th>
                      <td>Computer</td>
                      <td>{dariBooks ? "Dari" : "Pashto"}</td>
                    </tr>
                    <dialog id="mm11" className="modal h-screen w-screen ">
                      <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                        <form method="dialog">
                          <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                            <FontAwesomeIcon
                              icon={faX}
                              className="text-white"
                            />
                          </button>
                        </form>
                        <iframe
                          src={`https://moe.gov.af/sites/default/files/2020-03/G${classe.class.slice(
                            5
                          )}-${dariBooks ? "Dr" : "Ps"}-Computer.pdf`}
                          className="h-full w-10/12"
                        />
                      </div>
                    </dialog>
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
