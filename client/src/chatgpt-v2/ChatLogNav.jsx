import { useState } from "react";
import "./ChatLogNav.css";
import UserchatLogo from "./UserchatLogo";
import { MdOutlineTune } from "react-icons/md";

function ChatLogNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    age: "25",
    region: "India",
  });

  localStorage.setItem("age", formData.age);
  localStorage.setItem("region", formData.region);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // do something with the form data here
    isModalOpen && setIsModalOpen(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="navbar-parent">
      <nav
        className={`navbar ${isVisible ? "navbar--visible" : "navbar--hidden"}`}
      >
        <div className="navbar__container">
          <div className="navbar__links">
            <button
              className="mr-2 flex items-center space-x-2 rounded-lg bg-gray-900 py-2 px-4 font-medium text-white shadow-md"
              onClick={toggleModal}
            >
              <span>
                <MdOutlineTune />
              </span>{" "}
              <span>Fine-Tube</span>
            </button>
          </div>
          <div className="navbar__links">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 shadow-sm drop-shadow-sm">
              <UserchatLogo />
            </div>
          </div>
        </div>
      </nav>
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="m-auto w-full max-w-sm rounded-lg bg-slate-200 p-8 text-black shadow-md drop-shadow-md">
            <h2 className="mb-4 font-phudu text-2xl font-semibold text-gray-700/70">
              Advanced Search
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-5 text-left"
            >
              <div className="flex flex-col gap-y-5">
                <div>
                  {/*  <label
                    className="s mb-2 font-bold
                      text-gray-700/30"
                    htmlFor="age"
                  >
                    Age
                  </label> */}
                  <input
                    className="w-full rounded border py-2 px-3 text-gray-700 outline-none  ring-1 placeholder:text-slate-700/20 focus:outline-none focus:ring-2 focus:ring-blue-600/50 "
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  {/*  <label
                    className="mb-2 font-bold text-gray-700"
                    htmlFor="region"
                  >
                    Region
                  </label> */}
                  <input
                    className="w-full rounded border py-2 px-3 text-gray-700 outline-none ring-1 placeholder:text-slate-700/20 focus:outline-none focus:ring-2 focus:ring-blue-600/80"
                    id="region"
                    name="region"
                    type="text"
                    placeholder="Enter your region"
                    value={formData.region}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex">
                <button
                  className="w-full rounded-lg bg-indigo-500 py-2.5 px-4 font-bold text-white hover:bg-blue-700"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatLogNavbar;
