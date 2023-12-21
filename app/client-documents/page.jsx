"use client";
import React, { useState } from "react";
import Aside from "../components/UI/Aside";
import Link from "next/link";

const Page = () => {
  const [data, setData] = useState([
    {
      bank: "Bank XYZ",
      accounts: ["Savings", "Credit"],
      number: "98765 432 100",
      currency: "USD",
      status: "Active",
      expiration: "21.02.2024",
      regid: "#ABC123",
    },
    {
      bank: "Bank ABC",
      accounts: ["Savings", "Checking", "Investment", "Credit"],
      number: "98765 432 101",
      currency: "USD",
      status: "Active",
      expiration: "21.02.2024",
      regid: "#DEF456",
    },
    {
      bank: "Bank XYZ",
      accounts: ["Savings", "Checking", "Credit"],
      number: "98765 432 100",
      currency: "USD",
      status: "Active",
      expiration: "21.02.2024",
      regid: "#ABC123",
    },
  ]);
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
      if (key === "accounts") {
        newBank[key] = value.split(",").map((account) => account.trim());
      } else {
        newBank[key] = value;
      }
    });

    setData([...data, newBank]);

    event.currentTarget.reset(); // Reset the form fields
    setIsModalOpen(false); // Close the dialog
    setModalKey(modalKey + 1);
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
    newData[index].accounts = [...newData[index].accounts, newAccount];

    // Update the state with the new data
    setData(newData);

    event.currentTarget.reset(); // Reset the form fields
    setIsModalOpen(false); // Close the dialog
    setModalKey(modalKey + 1);
  };

  return (
    <main className="flex">
      <Aside>
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
            <h2 className="me-10">Bank Connections</h2>

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
              </div>
            </dialog>
          </div>

          <table className="table">
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
                            Are you sure you want to delete {obj.bank}?
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
        </div>
      </div>
    </main>
  );
};

export default Page;
