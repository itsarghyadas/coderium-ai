import React from "react";

function TimelineItem({ step, details }) {
  return (
    <ol className="relative flex flex-col border-l border-stone-300/50 md:flex-row">
      <li className="ml-4">
        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-amber-400/50 bg-amber-400" />
        <p className="flex flex-row flex-wrap items-center justify-start gap-4 text-xs md:text-sm">
          <span className="inline-block rounded-md bg-slate-700 px-2 py-1 text-sm font-semibold text-white">
            {step}
          </span>
        </p>
        <p className="py-4 text-sm font-semibold text-slate-500">{details}</p>
      </li>
    </ol>
  );
}

export default TimelineItem;
