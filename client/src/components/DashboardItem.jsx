import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { BsArrowDownCircleFill } from "react-icons/bs";

const DashboardItem = ({
  title,
  details,
  link,
  linkName,
  id,
  version,
  steps,
}) => {
  return (
    <div className="option-one w-full rounded-lg px-10 py-8 ">
      {steps && steps.length > 0 && (
        <div className="m-auto flex max-w-5xl flex-col md:flex-row ">
          <div className="w-full">
            <div className="mb-6 flex items-center space-x-2">
              <p className=" text-xl font-bold underline decoration-slate-500 decoration-dashed decoration-1 underline-offset-8">
                How this works
              </p>
              <BsArrowDownCircleFill
                className=" border- mt-0.5 rounded-full border-slate-500 text-slate-600"
                size="1.25rem"
              />
            </div>
            {steps.map(
              (step, index) => (
                console.log(step.description),
                (
                  <div key={index} className="step flex space-x-4">
                    <div className="step-description">
                      <ol className="relative flex flex-col border-l border-stone-300/50 md:flex-row">
                        <li className="ml-4">
                          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-amber-400/50 bg-amber-400" />
                          <p className="flex flex-row flex-wrap items-center justify-start gap-4 text-xs md:text-sm">
                            <span className="inline-block rounded-md bg-slate-700 px-2 py-1 text-sm font-semibold text-white">
                              {step.step}
                            </span>
                          </p>
                          <p className="py-4 text-sm font-semibold text-slate-500">
                            {step.description}
                          </p>
                        </li>
                      </ol>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      )}
      {/*  <img src={image} alt="" className="image rounded-sm mb-6"></img> */}
      <div className="absolute -top-2.5 -right-2.5 z-10 rounded bg-purple-600 py-1.5 px-4 text-sm font-medium text-white shadow drop-shadow">
        {id}
      </div>
      <div className="flex flex-col md:flex-row"></div>
      <div className="back flex w-full flex-col gap-y-2 rounded-lg pt-7">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-black">{title}</h1>
          <span className="version font-regular rounded-full bg-purple-700 px-3 py-0.5 text-[12px] text-white">
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
