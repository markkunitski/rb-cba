import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">401</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">Seems like you dont have permission to go there</p>

        <Link
          href="/"
          className="mt-6 btn mybluebtn"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default page;
