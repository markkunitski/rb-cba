"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(0);
  return (
    <main className="flex justify-center items-center w-screen h-screen ">
      <div className="flex flex-col w-96">
        <Image alt="rblogo" className="mb-20" src="/icon/icon.png" width={200} height={100}></Image>
        <div role="tablist" className="tabs tabs-bordered mb-10">
          <a
            onClick={() => setActive(0)}
            role="tab"
            className={`tab ${active === 0 && "tab-active"}`}
          >
            Client
          </a>
          <a
            onClick={() => setActive(1)}
            role="tab"
            className={`tab ${active === 1 && "tab-active"}`}
          >
            Book Keeper
          </a>
          <a
            onClick={() => setActive(2)}
            role="tab"
            className={`tab ${active === 2 && "tab-active"}`}
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
          <Link href='/client-documents' className="btn mybluebtn w-full mt-4" type="submit">Log In</Link>
        </form>
      </div>
    </main>
  );
}
