"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../lib/context/AuthContext";
import Aside from "../components/UI/Aside";
import Link from "next/link";
import { LOAD_DETAILS, YIELD_INFO, useApi } from "../lib/api";

const KeeperBank = () => {
  const { role, token } = useContext(AuthContext);
  // const { initial, initialLoading, initialError } = useApi("GET", YIELD_INFO, {
  //   customerID: role,
  //   token: token,
  // });
  const [selected, setSelected] = useState([]);

  const [hardcoded, setdata] = useState([
    {
      AccountName: "2jYhS5EFDo",
      BankAccount: "6G6bTI4W4q",
      Bankname: "WvymF5blrL",
      Currency: "WqV",
      Customername: "aa5pV4IR",
      CustomerReg: "G2NQlG1iI",
      IBAN: "zPTCg74hgh",
      MeritCurrency: "W0HTLFkv29",
      MeritAccount: "nfDQNuV0Gz",
      REQstatus: "Nq",
      REQID: "dWLp0kP1gx",
      accepted: "dccb8hi0xI",
      balanceCURR: 500.59494815666744,
      balanceEUR: 667.9737045541638,
      balanceMerit: -128.2499004274258,
      validfor: "2023-12-27",
    },
  ]);
  const { data, loading, error } = useApi("GET", LOAD_DETAILS, {
    bankAccount: hardcoded[selected[0]]?.BankAccount,
    meritAccount: hardcoded[selected[0]]?.MeritAccount,
    token: token,
  });
  const loadDetails = () => {
    if (selected.length) {
      console.log(data);
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
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                {Object.keys(hardcoded[0]).map((elem, index) => (
                  <th key={index}>{elem}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(hardcoded[0]).map((elem, index) =>
                  index === 0 ? (
                    <th key={index}>
                      <input
                        onClick={(e) => handleCheck(e.target)}
                        id={index}
                        checked={
                          selected.includes(index) ? "checked" : undefined
                        }
                        type="checkbox"
                        className="checkbox checkbox-sm"
                      />
                    </th>
                  ) : (
                    <th key={index}>{elem}</th>
                  )
                )}
              </tr>
            </tbody>
          </table>
        </div>
        {selected.length ? (
          <>
            <button onClick={loadDetails} className="btn mybluebtn">
              Load Details
            </button>
          </>
        ) : undefined}
      </div>
    </main>
  );
};

export default KeeperBank;
