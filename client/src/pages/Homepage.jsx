import React from "react";
import ProfileNav from "../components/ProfileNav";

function Home() {
  return (
    <div className=" homepage h-screen ">
      <div className="heropart mx-auto max-w-2xl px-7 pt-20 sm:pt-24 lg:pt-32">
        <h1 className="pt-8 pb-2 text-center font-phudu text-5xl font-semibold leading-normal tracking-normal text-white drop-shadow sm:text-6xl lg:text-6xl">
          CODEPIX
        </h1>
        <input
          className="m-auto mt-4 w-full rounded-full bg-zinc-800/70 py-2 px-4 font-medium text-amber-400 shadow drop-shadow placeholder:text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
          spellCheck="false"
          placeholder="Search for an image"
        ></input>
        <div className="mt-6 flex justify-center gap-x-5">
          <button className="h-9 w-32 rounded-full bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800 font-bold text-white shadow ring-1 ring-white/20 drop-shadow">
            Search
          </button>
          <button className="h-9 w-32 rounded-full font-bold text-white shadow ring-1 ring-zinc-300 drop-shadow">
            Generate
          </button>
        </div>
      </div>
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
