import React from "react";
import { toast } from "react-toastify";
import { FaRobot } from "react-icons/fa";

function ProfileNav() {
  function logout() {
    localStorage.removeItem("token");
    toast.success("Logged out Successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000); // delay for one second
  }
  return (
    <div className="navbar-menu">
      <nav className=" flex items-center justify-between py-4 px-6">
        <div className="menu-item">
          <ul>
            <li className="flex items-center justify-center space-x-1">
              <FaRobot size={24} className="mb-1 text-slate-400/30" />
              <a
                className="font-clash text-xl font-semibold text-slate-400/30"
                href="/"
              >
                CODEPIX
              </a>
            </li>
          </ul>
        </div>
        <div className="profile-menu">
          <button
            className="rounded-full bg-black px-7 py-1.5 font-bold text-white shadow ring-2 ring-stone-700 drop-shadow-sm"
            type="submit"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default ProfileNav;
