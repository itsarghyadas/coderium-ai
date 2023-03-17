import { useState } from "react";
import { MdOutlineTune } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { SlClose } from "react-icons/sl";

function ModalForm({
  isVisible,
  toggleModal,
  formData,
  handleChange,
  handleSubmit,
}) {
  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-sm backdrop-filter">
          <div className="m-auto w-full max-w-sm rounded bg-white px-10 py-8 pt-12 text-black shadow-md drop-shadow-md">
            <h2 className="absolute -top-2.5 -left-2.5 z-10 mb-4 rounded bg-purple-600 py-1.5 px-4 text-sm font-medium text-white shadow drop-shadow">
              <div className="flex items-center justify-center space-x-2">
                <span>Advanced Search</span>
                <span>
                  <AiOutlineSearch />
                </span>
              </div>
            </h2>
            <h2
              className="absolute top-1 right-1 z-10 mb-4 cursor-pointer rounded text-sm font-medium"
              onClick={handleSubmit}
            >
              <SlClose
                size={24}
                className=" rounded-full bg-red-500 text-white"
              />
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-5 text-left"
            >
              <div className="flex gap-x-3">
                <div className="flex w-1/3 flex-col gap-1">
                  <label
                    className="font-space text-[12px] font-bold text-slate-900/70"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    className="w-full rounded border py-2 px-3 text-gray-700 outline-none ring-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex w-2/3 flex-col gap-1">
                  <label
                    className="font-space text-[12px] font-bold text-slate-900/70"
                    htmlFor="region"
                  >
                    Region
                  </label>
                  <input
                    className="w-full rounded border py-2 px-3 text-gray-700 outline-none ring-1 focus:outline-none focus:ring-2 focus:ring-blue-600/80"
                    id="region"
                    name="region"
                    type="text"
                    value={formData.region}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex">
                <button
                  className="w-full rounded bg-indigo-500 py-2.5 px-4 font-bold text-white hover:bg-blue-700"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalForm;
