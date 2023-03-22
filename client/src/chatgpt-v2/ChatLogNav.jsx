import { useState } from "react";
import "./ChatLogNav.css";
import UserchatLogo from "./UserchatLogo";
import { MdOutlineTune } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import ModalForm from "./ModalForm";

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
    <>
      <div className="navbar-parent">
        <nav
          className={`navbar ${
            isVisible ? "navbar--visible" : "navbar--hidden"
          }`}
        >
          <div className="navbar__container">
            <div className="navbar__links flex items-center justify-center space-x-5">
              <div>
                <button
                  className="pointer-events-auto flex items-center space-x-2 rounded bg-orange-700 py-1.5 px-2.5 text-sm font-medium text-white shadow-md"
                  onClick={toggleModal}
                >
                  <span>
                    <MdOutlineTune />
                  </span>{" "}
                  <span>Advanced</span>
                </button>
              </div>
            </div>

            <div className="navbar__links">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 shadow-sm drop-shadow-sm">
                <UserchatLogo />
              </div>
            </div>
          </div>
        </nav>
      </div>
      {isModalOpen && (
        <ModalForm
          isVisible={isModalOpen}
          toggleModal={toggleModal}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
        />
      )}
    </>
  );
}

export default ChatLogNavbar;
