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
        const { userName } = await response.json();
        const userEmailResponse = await fetch(
          `http://localhost:1337/api/user/${userName}`
        );
        const { user } = await userEmailResponse.json();
        setUserEmail(user.email);
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
      {/*       <img
        className="rounded-full shadow drop-shadow"
        src={userAvatar}
        alt="user avatar"
      /> */}
      <p className="font-phudu">{firstLetter}</p>
    </div>
  );
}

export default UserchatLogo;
