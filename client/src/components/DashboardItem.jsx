import React from "react";
import { FiExternalLink } from "react-icons/fi";
import Timeline from "./Timeline";

const DashboardItem = ({
  title,
  details,
  link,
  linkName,
  id,
  version,
}) => {
  return (
    <div className="option-one w-full rounded-lg px-10 py-8 ">
     {/*  <img src={image} alt="" className="image rounded-sm mb-6"></img> */}
      <div className="absolute -top-2.5 -right-2.5 z-10 rounded bg-purple-600 py-1.5 px-4 text-sm font-medium text-white shadow drop-shadow">
        {id}
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flow w-full">
          <Timeline />
        </div>
      </div>
      <div className="back flex w-full flex-col gap-y-2 rounded-lg pt-10">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-black">{title}</h1>
          <span className="version rounded-full bg-purple-700 px-3 py-0.5 text-[12px] font-regular text-white">
            {version}
          </span>
        </div>
        <p className="text-sm font-bold leading-6 text-slate-500">{details}</p>
        <a
          className="mt-2 flex w-full items-center justify-center rounded bg-black/90 py-3 font-bold text-white shadow drop-shadow-sm"
          href={link}
        >
          {linkName}
          <FiExternalLink className="ml-2 mb-0.5 inline " />
        </a>
      </div>
    </div>
  );
};

export default DashboardItem;
