import React from "react";
import { toast } from "react-toastify";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { GiElectric, GiPartyPopper } from "react-icons/gi";
import { BsPlusCircle } from "react-icons/bs";

import ChatRole from "./ChatRole";
import { useState } from "react";

function SideMenu({
  clearChatLog,
  tokenUsage,
  totalToken,
  handleRoleSelected,
}) {
  const redirect = () => {
    window.location.href = "http://localhost:5173/pricing";
  };

  function logout() {
    localStorage.removeItem("token");
    toast.success("Logged out Successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000); // delay for one second
  }
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    console.log("Role selected in SideMenu: ", role);
    handleRoleSelected(role);
  };
  return (
    <aside className="sidemenu flex flex-col justify-between gap-y-3 ">
      <div className="flex-1 flex-col space-y-3 border-b border-white/20">
        <div
          className="flex cursor-pointer items-center justify-center space-x-1.5 rounded-lg bg-[#5442c7] py-2.5 px-2.5 font-medium shadow drop-shadow-sm"
          onClick={clearChatLog}
        >
          <BsPlusCircle className="text-white" size={16} strokeWidth={0.3} />
          <h1 className="text-lg text-slate-200">Create New</h1>
        </div>
        <ChatRole onRoleSelected={handleRoleSelection} />
      </div>

      <div className="menu flex flex-col gap-y-2">
        <div
          className="flex cursor-pointer items-center justify-center space-x-1.5 rounded-lg bg-[#5442c7] py-2.5 px-2.5 font-medium shadow drop-shadow-sm"
          onClick={redirect}
        >
          <GiElectric className="text-white" size={18} strokeWidth={0.3} />
          <h1 className="text-lg text-slate-200">Upgrade Now</h1>
          <GiPartyPopper className="text-white" size={18} strokeWidth={0.3} />
        </div>
        {/*         <div className="side-menu-button token-usage flex items-center space-x-2 font-medium ">
          <FiAlertTriangle className="text-slate-400" />
          <h1 className="text-slate-400">Token Usage: {tokenUsage}</h1>
        </div> */}

        <div className="side-menu-button token-usage flex items-center space-x-2 font-medium ">
          <MdOutlineGeneratingTokens className="text-slate-300/70" size={18} />
          <h1 className="text-[14.5px] font-semibold text-slate-300/70">
            Token Available: <span className="text-lime-400">{totalToken}</span>
          </h1>
        </div>
        {/*         <div
          className="side-menu-button token-usage flex items-center space-x-2 bg-gray-600/10 font-medium"
          onClick={logout}
        >
          <LogOutIcon />
          <h1 className="text-[#f32d2d]">Log Out</h1>
        </div> */}
      </div>
    </aside>
  );
}

export default SideMenu;
