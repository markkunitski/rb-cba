"use client";
import React, { useContext, useEffect, useState } from "react";
import Aside from "../components/UI/Aside";
import Link from "next/link";
import Cookies from "js-cookie";
import { MAIN_INFO, useApi } from "../lib/api";
import { AuthContext } from "../lib/context/AuthContext";
const Page = () => {
  const { role, token } = useContext(AuthContext);
  const { data, loading, error } = useApi("GET", MAIN_INFO, {
    userid: 2,
    token: "string",
  });
  const [expandedRow, setExpandedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const openModal = (event, index) => {
    event.stopPropagation();
    setIsModalOpen(true);
    document.getElementById(`modal_${index}`).showModal();
  };
  const handleRowClick = (index) => {
    if (!isModalOpen) {
      setExpandedRow(index === expandedRow ? null : index);
    }
  };
  const deleteBank = (indexToRemove) => {
    setIsModalOpen(false);
    setData([
      ...data.slice(0, indexToRemove),
      ...data.slice(indexToRemove + 1),
    ]);
  };
  const addBank = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newBank = {};
    formData.forEach((value, key) => {
      if (key === "bank_accs") {
        newBank[key] = value.split(",").map((account) => account.trim());
      } else {
        newBank[key] = value;
      }
    });

    setData([...data, newBank]);

    event.currentTarget.reset(); // Reset the form fields
    closeModal();
  };
  const addAccount = (event, index) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let newAccount = "";

    formData.forEach((value, key) => {
      if (key === "account") {
        newAccount = value;
      }
    });

    // Create a new array with the updated account
    const newData = [...data];
    newData[index].bank_accs = [...newData[index].bank_accs, newAccount];

    // Update the state with the new data
    setData(newData);

    event.currentTarget.reset(); // Reset the form fields
    closeModal();
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalKey(modalKey + 1);
  };
  
  return (
    <main className="flex">
      <Aside role={role}>
        <Link className="link text-lg mb-4" href="/client-documents">
          Documents
        </Link>
        <Link className="link text-lg link-active" href="/client-bank">
          Bank Connection
        </Link>
      </Aside>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="main-content">
          <div className="overflow-x-auto">
            <div className="flex items-center mb-10">
              <h2 className="me-10">{role} Bank Connections</h2>

              <span
                onClick={(event) => openModal(event, "add")}
                className="add-link"
              >
                Add new
              </span>

              <dialog key={modalKey} id={`modal_add`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl flex justify-between items-end">
                  <form
                    onSubmit={addBank}
                    method="dialog"
                    className="flex items-end"
                  >
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Bank Name</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Bank Name"
                        name="bank"
                        className="input myinput w-full "
                      />
                    </label>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Accounts</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Accounts"
                        name="accounts"
                        className="input myinput w-full "
                      />
                    </label>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Number</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Number"
                        name="number"
                        className="input myinput w-full "
                      />
                    </label>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Currency</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Currency"
                        name="currency"
                        className="input myinput w-full "
                      />
                    </label>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Status</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Status"
                        name="status"
                        className="input myinput w-full "
                      />
                    </label>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Expiration</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Expiration"
                        name="expiration"
                        className="input myinput w-full "
                      />
                    </label>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">RegId</span>
                      </div>
                      <input
                        type="text"
                        placeholder="RegId"
                        name="regid"
                        className="input myinput w-full "
                      />
                    </label>
                    <button type="submit" className="btn mybluebtn">
                      Create
                    </button>
                  </form>
                  <button
                    onClick={closeModal}
                    className="btn border-none myredbtn absolute -top-14 right-0 z-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </dialog>
            </div>

            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="uppercase">Name</th>
                  <th className="uppercase">Bank Accounts</th>
                  <th className="uppercase">Merit Accounts</th>
                </tr>
              </thead>
              <tbody>
                {data.customers.map((elem, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className={`hover ${
                        expandedRow === index ? "expanded" : ""
                      }`}
                      onClick={() => handleRowClick(index)}
                    >
                      <td>{elem.name}</td>
                      <td>{elem.bank_accs.length}</td>
                      <td>{elem.merit_accs.length}</td>
                      <td>
                        <button
                          className="btn btn-xs myredbtn capitalize w-full"
                          onClick={(event) => openModal(event, index)}
                        >
                          Delete
                        </button>

                        <dialog id={`modal_${index}`} className="modal">
                          <div className="modal-box w-11/12 max-w-5xl flex justify-between items-center">
                            <h3 className="font-bold text-lg">
                              Are you sure you want to delete {elem.bank_accs}?
                            </h3>

                            <form className="flex" method="dialog">
                              {/* if there is a button in the form, it will close the modal */}
                              <button
                                className="btn mybluebtn"
                                onClick={() => setIsModalOpen(false)}
                              >
                                Deny
                              </button>
                              <button
                                onClick={() => deleteBank(index)}
                                className="btn myredbtn ms-4"
                              >
                                Delete
                              </button>
                            </form>
                          </div>
                        </dialog>
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr className="expanded-row">
                        <td></td>
                        <td>
                          {elem.bank_accs.map((account, index) => (
                            <p key={account} className="mb-4">
                              {account}
                            </p>
                          ))}
                          <span
                            onClick={(event) => openModal(event, "acc")}
                            className="add-link"
                          >
                            Connect new bank to {elem.name}
                          </span>

                          <dialog
                            key={modalKey}
                            id={`modal_acc`}
                            className="modal"
                          >
                            <div className="modal-box w-11/12 max-w-5xl flex justify-between items-end">
                              <form
                                onSubmit={(event) => addAccount(event, index)}
                                method="dialog"
                                className="flex items-end"
                              >
                                <label className="form-control w-full">
                                  <div className="label">
                                    <span className="label-text">
                                      Account Name
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Account Name"
                                    name="account"
                                    className="input myinput w-full"
                                  />
                                </label>
                                <button type="submit" className="btn mybluebtn">
                                  Add
                                </button>
                              </form>
                              <button
                                onClick={closeModal}
                                className="btn border-none myredbtn absolute -top-14 right-0 z-10"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </dialog>
                        </td>
                        <td>
                          {elem.merit_accs.map((account, index) => (
                            <p key={account} className="mb-4">
                              {account}
                            </p>
                          ))}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
};
export default Page;
