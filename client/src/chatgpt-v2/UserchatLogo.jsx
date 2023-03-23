import React from "react";
import userAvatar from "../assets/avatar-svgrepo-com.svg";
import { useState } from "react";
import { useEffect } from "react";

function UserchatLogo() {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userRealName, setUserRealName] = useState("");
  const [firstLetter, setFirstLetter] = useState("");

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
        const { user } = await response.json();
        const userEmail = user.email;
        setUserEmail(userEmail);
        console.log("userEmail is in Chatlogo:", user.email);
        const userId = user._id;
        setUserId(userId);
        const userRealName = user.name;
        setUserRealName(userRealName);
        const firstLetter = userRealName.charAt(0).toUpperCase();
        setFirstLetter(firstLetter);
        console.log("userRealName is in Chatlogo:", firstLetter);
        console.log("user ID is in Chatlogo:", userId);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <p className="font-phudu">{firstLetter}</p>
    </div>
  );
}

export default UserchatLogo;
