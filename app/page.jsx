"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "./lib/context/AuthContext";

export default function Home() {
  const [activeTab, setActive] = useState(0);
  const { setAuth } = useContext(AuthContext);
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault()
    let role, link;
  
    switch (activeTab) {
      case 0:
        role = "1";
        link = "/keeper-bank";
        break;
      case 1:
        role = "2";
        link = "/client-bank";
        break;
      case 2:
        role = "3";
        link = "/no-rights";
        break;
    }
    const token = Math.random().toString(36).substring(7);
    setAuth(role, token);
    router.replace(link);
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen ">
      <div className="flex flex-col w-96">
        <Image
          alt="rblogo"
          className="mb-20"
          src="/icon/icon.png"
          width={200}
          height={100}
        ></Image>
        <div role="tablist" className="tabs tabs-bordered mb-10">
          <a
            onClick={() => setActive(0)}
            role="tab"
            className={`tab ${activeTab === 0 && "tab-active"}`}
          >
            Book Keeper
          </a>
          <a
            onClick={() => setActive(1)}
            role="tab"
            className={`tab ${activeTab === 1 && "tab-active"}`}
          >
            Client
          </a>
          <a
            onClick={() => setActive(2)}
            role="tab"
            className={`tab ${activeTab === 2 && "tab-active"}`}
          >
            Admin
          </a>
        </div>
        <form>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Login</span>
            </div>
            <input
              type="text"
              placeholder="Login"
              className="input myinput w-full "
            />
          </label>
          <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="input myinput w-full "
            />
          </label>
          <button
            className="btn mybluebtn w-full mt-4"
            type="submit"
            onClick={handleLogin}
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
