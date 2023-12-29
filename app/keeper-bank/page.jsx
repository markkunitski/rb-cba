"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../lib/context/AuthContext";
import Aside from "../components/UI/Aside";
import Link from "next/link";
import { LOAD_DETAILS, YIELD_INFO, useApi } from "../lib/api";

const KeeperBank = () => {
  const { role, token } = useContext(AuthContext);
  const { data, loading, error } = useApi("GET", YIELD_INFO, {
    customerID: role,
    token: token,
  });
  const [selected, setSelected] = useState([]);

  // const [data, setDetail] = useState([
  //   {
  //     AccountName: "2jYhS5EFDo",
  //     BankAccount: "6G6bTI4W4q",
  //     Bankname: "WvymF5blrL",
  //     Currency: "WqV",
  //     Customername: "aa5pV4IR",
  //     CustomerReg: "G2NQlG1iI",
  //     IBAN: "zPTCg74hgh",
  //     MeritCurrency: "W0HTLFkv29",
  //     MeritAccount: "nfDQNuV0Gz",
  //     REQstatus: "Nq",
  //     REQID: "dWLp0kP1gx",
  //     accepted: "dccb8hi0xI",
  //     balanceCURR: 500.59494815666744,
  //     balanceEUR: 667.9737045541638,
  //     balanceMerit: -128.2499004274258,
  //     validfor: "2023-12-27",
  //   },
  // ]);
  const [details, setDetails] = useState(null);
  const [detailsloading, setdetailsLoading] = useState(true);
  const [detailserror, setdetailsError] = useState(null);

  const loadDetails = () => {
    if (selected.length) {
      const fetchData = async () => {
        try {
          const options = {
            method: "GET",
          };

          const headers = {
            "Content-Type": "application/json",
            bankAccount: data?.BankAccount,
            meritAccount: data?.MeritAccount,
            token: token,
          };

          options.headers = headers;
          const res = await fetch(LOAD_DETAILS, options);
          const responseData = await res.json();
          setDetails(responseData);
          setdetailsLoading(false);
        } catch (err) {
          setdetailsError(err);
          setdetailsLoading(false);
        }
      };

      fetchData();
    }
  };

  const handleCheck = (elem) => {
    if (!elem) return;
    const id = elem.id;
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
    } else {
      setSelected([...selected.slice(0, id), ...selected.slice(id + 1)]);
    }
  };
  const setColor = (change) => {
    if (change < -10) return "bg-red-300";
    if (change < 10) return "bg-orange-300";
    return "bg-green-300";
  };
  return (
    <main className="flex">
      <Aside role={role}>
        <Link className="link text-lg mb-4 " href="/keeper-documents">
          Documents
        </Link>
        <Link className="link text-lg link-active" href="/keeper-bank">
          Bank Connection
        </Link>
      </Aside>
      <div className="main-content my-table">
        <div className="overflow-x-auto">
          <div className="mb-20">
            <div className="upper flex items-center mb-8">
              <div className="select-block min-w-[200px] me-5">
                <p className="mb-2">Klient</p>
                <select className="select select-sm rounded-none w-full select-bordered focus:outline-none">
                  <option defaultValue="Choose one..." disabled>
                    Choose one...
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>
              <div className="select-block min-w-[200px] me-5">
                <p className="mb-2">Konto</p>
                <select className="select select-sm rounded-none w-full select-bordered focus:outline-none">
                  <option defaultValue="Choose one..." disabled>
                    Choose one...
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>
              <div className="select-block min-w-[200px] me-5">
                <p className="mb-2">Merit Konto</p>
                <select className="select select-sm rounded-none w-full select-bordered focus:outline-none">
                  <option defaultValue="Choose one..." disabled>
                    Choose one...
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>
              <div className="select-block min-w-[200px] me-5">
                <p className="mb-2">Valuuta</p>
                <select className="select select-sm rounded-none w-full select-bordered focus:outline-none">
                  <option defaultValue="Choose one..." disabled>
                    Choose one...
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>
            </div>
            <div className="bottom flex w-full">
              <div className="flex items-center">
                <button
                  onClick={loadDetails}
                  disabled={!selected.length ? "disabled" : undefined}
                  className="btn btn-sm mybluebtn me-6 disabled"
                >
                  Load Details
                </button>
                <button disabled="disabled" className="btn mybluebtn me-6 btn-sm ">
                  Load merit
                </button>
                <button disabled="disabled" className="btn mybluebtn btn-sm">
                  Yld info
                </button>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="flex items-center">
                <button disabled="disabled" className="btn myredbtn me-6 btn-sm ">
                  All Yld info
                </button>
                <button disabled="disabled" className="btn myredbtn me-6 btn-sm ">
                  Load Bank
                </button>
              </div>
            </div>
          </div>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <table className="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  {Object.keys(data).map((elem, index) => (
                    <th key={index}>{elem}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(data).map((elem, index) =>
                    index === 0 ? (
                      <td key={index}>
                        <input
                          onClick={(e) => handleCheck(e.target)}
                          id={index}
                          checked={
                            selected.includes(index) ? "checked" : undefined
                          }
                          type="checkbox"
                          className="checkbox checkbox-sm rounded-none"
                        />
                      </td>
                    ) : (
                      <td key={index}>{elem}</td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          )}

          {details && (
            <table className="table table-xs mt-20">
              <thead>
                <tr>
                  {Object.keys(details.header).map((elem, index) => (
                    <th key={index}>{elem}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className={setColor(details.header.change)}>
                  {Object.values(details.header).map((elem, index) => (
                    <td key={index}>{elem}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default KeeperBank;
