import Image from "next/image";
import Link from "next/link";
import React from "react";

const Aside = ({ children, role }) => {
  const StringifyRole = (role) => {
    switch (role) {
      case "1":
        return "Book Keeper";
      case "2":
        return "Client";
      case "3":
        return "Admin";
    }
  };
  return (
    <aside className="bg-zinc-300 h-screen fixed flex flex-col justify-between p-8">
      <Image alt="rblogo" width={180} height={100} src="/icon/icon.png"></Image>

      <nav className="flex flex-col">{children}</nav>
      <div>
        <h5 className="">Hi, {StringifyRole(role)}</h5>
        <Link className="text-zinc-500 text-sm" href={"/"}>
          Log Out
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
