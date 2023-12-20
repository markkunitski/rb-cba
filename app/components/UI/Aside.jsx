import Image from "next/image";
import Link from "next/link";
import React from "react";

const Aside = ({ children }) => {
  return (
    <aside className="bg-zinc-300 h-screen w-2/12 flex flex-col justify-between p-8">
      <Image alt="rblogo" width={180} height={100} src="/icon/icon.png"></Image>

      <nav className="flex flex-col"
      >{children}</nav>
      <div>
        <h5 className="">Logged user name</h5>
        <Link className="text-zinc-500 text-sm"  href={'/'}>Log Out</Link>
      </div>
    </aside>
  );
};

export default Aside;
