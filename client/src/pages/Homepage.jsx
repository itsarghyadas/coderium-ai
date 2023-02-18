import React from "react";

function Home() {
  return (
    <div className="dashboard h-screen">
      <h1 className="py-20 text-center font-clash text-6xl font-medium text-gray-800 ">
        Welcome! This is Homepage
      </h1>
      <div className="mx-auto flex max-w-screen-md justify-around space-x-5 py-8 text-lg font-bold text-white ">
        <a
          className="rounded bg-blue-600 px-7 py-2 shadow drop-shadow"
          href="http://localhost:5173/login"
        >
          Login
        </a>

        <a
          className="rounded bg-blue-600 px-7 py-2 shadow drop-shadow"
          href="http://localhost:5173/register"
        >
          Register
        </a>

        <a
          className="rounded bg-blue-600 px-7 py-2 shadow drop-shadow"
          href="http://localhost:5173/dashboard"
        >
          Dashboard
        </a>
      </div>
    </div>
  );
}

export default Home;
