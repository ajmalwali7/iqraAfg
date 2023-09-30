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
          {dariBooks ? (
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
                  {/* row 1 */}
                  <tr
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="hover:bg-primary hover:bg-opacity-5 hover:cursor-pointer border-opacity-30"
                  >
                    <th>1</th>
                    <td>Mathematics</td>
                    <td>Dari</td>
                  </tr>
                  <dialog id="my_modal_1" className="modal h-screen w-screen ">
                    <div className="modal-box max-h-screen max-w-screen-2xl h-screen w-screen flex items-center justify-center py-0">
                      <form method="dialog">
                        <button className="btn btn-circle bg-opacity-20 border-0 hover:bg-opacity-40 absolute min-h-0 h-7 w-7 right-4 top-4">
                          <FontAwesomeIcon icon={faX} className="text-white" />
                        </button>
                      </form>
                      <iframe
                        src="https://moe.gov.af/sites/default/files/2020-03/G7-Ps-Math.pdf"
                        className="h-full w-10/12"
                      />
                    </div>
                  </dialog>
                  {/* row 2 */}
                  <tr className="hover:bg-primary hover:bg-opacity-5 border-opacity-30">
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Dari</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
}
