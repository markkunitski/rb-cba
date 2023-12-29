"use client";
import React, { useContext, useEffect, useState } from "react";
import Aside from "../components/UI/Aside";
import Link from "next/link";
import { AuthContext } from "../lib/context/AuthContext";
import {
  CREATE_DOC,
  CREATE_REQUEST,
  DELETE_DOC,
  DELETE_REQUEST,
  GET_DOCS,
  GET_REQUESTS,
  LOAD_DETAILS,
  MAIN_INFO,
  UPDATE_REQUEST,
  YIELD_INFO,
  useApi,
} from "../lib/api";

const Page = () => {
  const [data, setData] = useState([
    {
      name: "Cool Document One",
      type: ".cvs",
      updated: "21.02.2024",
    },
    {
      name: "Awesome Document Second",
      type: ".docx",
      updated: "10.02.2023",
    },
    {
      name: "Unbelivable Document Third",
      type: ".exe",
      updated: "11.11.2021",
    },
  ]);
  const [requested, setRequested] = useState([
    {
      name: "Cool Document One",
      type: ".cvs",
      updated: "21.02.2024",
    },
    {
      name: "Awesome Document Second",
      type: ".docx",
      updated: "10.02.2023",
    },
    {
      name: "Unbelivable Document Third",
      type: ".exe",
      updated: "11.11.2021",
    },
  ]);
  const { role, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const openModal = (event, index) => {
    event.stopPropagation();
    setIsModalOpen(true);
    document.getElementById(`modal_${index}`).showModal();
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalKey(modalKey + 1);
  };
  const handleRowClick = (index) => {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return;
    if (!isModalOpen) {
      setExpandedRow(index === expandedRow ? null : index);
    }
  };
  const deleteBank = (indexToRemove) => {
    setData([
      ...data.slice(0, indexToRemove),
      ...data.slice(indexToRemove + 1),
    ]);
    closeModal();
  };
  const addDoc = async (event) => {
    event.preventDefault();

    // Fetch the file input from the form
    const fileInput = event.target.elements[0];
    const file = fileInput.files[0];

    if (!file) {
      return;
    }
    setData([
      ...data,
      {
        name: file.name,
        type: file.type,
        updated: file.lastModifiedDate.toLocaleDateString("en-GB"),
      },
    ]);

    // const formData = new FormData();
    // formData.append("document_data", file);
    // const jsonData = {
    //   customer_id: role,
    //   token: token,
    // };

    // // Append the JSON data as a blob to the FormData
    // formData.append(
    //   "json_data",
    //   new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    // );

    // try {
    //   const response = await fetch(CREATE_DOC, {
    //     method: "POST",
    //     body: formData,
    //   });

    //   // Handle the response here
    //   if (response.ok) {
    //     const data = await response.json();
    //     // Do something with the data
    //     console.log(data);
    //   } else {
    //     throw new Error("Failed to create doc");
    //   }
    // } catch (error) {
    //   // Handle the error here
    //   console.error(error);
    // }

    closeModal();
  };

  // const addAccount = (event, index) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   let newAccount = "";

  //   formData.forEach((value, key) => {
  //     if (key === "account") {
  //       newAccount = value;
  //     }
  //   });

  //   // Create a new array with the updated account
  //   const newData = [...data];
  //   newData[index].accounts = [...newData[index].accounts, newAccount];

  //   // Update the state with the new data
  //   setData(newData);

  //   event.currentTarget.reset(); // Reset the form fields
  //   setIsModalOpen(false); // Close the dialog
  //   setModalKey(modalKey + 1);
  // };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <main className="flex">
      <Aside role={role}>
        <Link
          className="link text-lg mb-4 link-active"
          href="/client-documents"
        >
          Documents
        </Link>
        <Link className="link text-lg " href="/client-bank">
          Bank Connection
        </Link>
      </Aside>
      <div className="main-content">
        <div className="overflow-x-auto">
          <div className="flex items-center mb-10">
            <h2 className="me-10">{role} Documents</h2>

            <span
              onClick={(event) => openModal(event, "add")}
              className="add-link"
            >
              Add new
            </span>

            <dialog key={modalKey} id={`modal_add`} className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <form
                  onSubmit={addDoc}
                  method="dialog"
                  className="flex justify-between"
                >
                  <input
                    type="file"
                    className="file-input file-input-bordered rounded-none w-5/6"
                  />
                  <button type="submit" className="btn mybluebtn">
                    Add Document
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
          {loading ? (
            <h2>LOADING DATA</h2>
          ) : (
            <table className="table mb-24">
              {/* head */}
              <thead>
                <tr>
                  {Object.keys(data[0]).map((obj, index) => (
                    <th className="uppercase" key={index}>
                      {obj}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((obj, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className={`hover ${
                        expandedRow === index ? "expanded" : ""
                      }`}
                      onClick={() => handleRowClick(index)}
                    >
                      {Object.keys(obj).map((key, index) => (
                        <td key={index}>
                          {key === "accounts" ? obj[key].length : obj[key]}
                        </td>
                      ))}
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
                              Are you sure you want to delete {obj.name}?
                            </h3>

                            <form className="flex" method="dialog">
                              {/* if there is a button in form, it will close the modal */}
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
                        <td colSpan={Object.keys(obj).length}>
                          {obj.accounts.map((account, index) => (
                            <p key={index} className="mb-4">
                              {account}
                            </p>
                          ))}
                          <span
                            onClick={(event) => openModal(event, "acc")}
                            className="add-link"
                          >
                            Connect new account to {obj.bank}
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
                                    className="input myinput w-full "
                                  />
                                </label>
                                <button type="submit" className="btn mybluebtn">
                                  Add
                                </button>
                              </form>
                            </div>
                          </dialog>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
          {!loading && (
            <>
              <div className="flex items-center mb-10">
                <h2 className="me-10">Requested</h2>

                <dialog key={modalKey} id={`modal_add`} className="modal">
                  <div className="modal-box w-11/12 max-w-5xl">
                    <form
                      onSubmit={addDoc}
                      method="dialog"
                      className="flex justify-between"
                    >
                      <input
                        type="file"
                        className="file-input file-input-bordered rounded-none w-5/6"
                      />
                      <button type="submit" className="btn mybluebtn">
                        Add Document
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
              <table className="table mb-24">
                {/* head */}
                <thead>
                  <tr>
                    {Object.keys(requested[0]).map((obj, index) => (
                      <th className="uppercase" key={index}>
                        {obj}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requested.map((obj, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className={`hover ${
                          expandedRow === index ? "expanded" : ""
                        }`}
                        onClick={() => handleRowClick(index)}
                      >
                        {Object.keys(obj).map((key, index) => (
                          <td key={index}>
                            {key === "accounts" ? obj[key].length : obj[key]}
                          </td>
                        ))}
                      </tr>
                      {expandedRow === index && (
                        <tr className="expanded-row">
                          <td colSpan={Object.keys(obj).length}>
                            {obj.accounts.map((account, index) => (
                              <p key={index} className="mb-4">
                                {account}
                              </p>
                            ))}
                            <span
                              onClick={(event) => openModal(event, "acc")}
                              className="add-link"
                            >
                              Connect new account to {obj.bank}
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
                                      className="input myinput w-full "
                                    />
                                  </label>
                                  <button
                                    type="submit"
                                    className="btn mybluebtn"
                                  >
                                    Add
                                  </button>
                                </form>
                              </div>
                            </dialog>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
