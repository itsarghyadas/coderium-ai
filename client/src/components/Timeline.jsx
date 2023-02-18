import React from "react";
import TimelineItem from "./TimelineItem";
import { BsArrowDownCircleFill } from "react-icons/bs";
import test from "../data/step.timeline";

function Timeline() {
  return (
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
        {Array.isArray(test) && (
          <div className="flex h-full w-full items-center ">
            {test.map((box, firstDimIndex) => (
              <div key={firstDimIndex}>
                {box.map((item, secondDimIndex) => (
                  <div className="flex" key={item.description}>
                    <TimelineItem
                      key={item.step}
                      step={item.step}
                      details={item.description}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Timeline;
