import React, { useState, useEffect } from "react";

function Completion() {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [totalToken, setTotalToken] = useState(0);
  const [userRealName, setUserRealName] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:1337/api/loggeduser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { userName } = await response.json();
        const userEmailResponse = await fetch(
          `http://localhost:1337/api/user/${userName}`
        );
        const { user } = await userEmailResponse.json();
        setUserEmail(user.email);
        console.log("userEmail is:", user.email);
        const userId = user._id;
        setUserId(userId);
        const userRealName = user.name;
        setUserRealName(userRealName);
        console.log("userRealName is:", userRealName);
        console.log("user ID is:", userId);
        const availableTokenResponse = await fetch(
          `http://localhost:1337/api/totalTokens?userId=${userId}`
        );
        const { totalToken } = await availableTokenResponse.json();
        setToken(totalToken);
        console.log("Token is Database:", totalToken);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getData();
  }, []);

  return (
    <div className="dashboard">
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-lg rounded-lg bg-white px-10 py-8 shadow drop-shadow">
          <h1 className="mb-4 text-2xl font-bold">Payment Successful</h1>
          <p className="font-medium text-slate-500/80">
            Hello <span className="font-bold text-red-500">{userRealName}</span>{" "}
            😍
          </p>
          <p className="mt-2 font-medium text-slate-500/80">
            Thank you for your purchase. Your new token balance is{" "}
            <span className="font-bold text-purple-700">{token}</span> 🎉
          </p>
          <p className="mt-2 font-medium text-slate-500/80">
            We have sent you the receipt to{" "}
            <span className="font-bold text-red-500">{userEmail}</span>
          </p>

          <button className="mt-5 rounded border border-slate-800/50 bg-sky-800 py-2 px-5 font-medium text-white">
            <a href="http://localhost:5173/dashboard">Got it Thanks !</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Completion;
