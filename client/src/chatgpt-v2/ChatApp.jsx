import { useState, useEffect, useRef } from "react";
import "./ChatApp.css";
import "./normal.css";
import SideMenu from "./SideMenu";
import ChatLog from "./ChatLog";
import ChatInput from "./ChatInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialChatLog = [
  { user: "gpt", message: "Hello I am Codepix, Your AI Assistant 🤖" },
];

function ChatApp() {
  const chatInputRef = useRef(null);
  const [tokenUsage, setTokenUsage] = useState(0);
  const [totalToken, setTotalToken] = useState(0);
  const [userId, setUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoleSelected = (role) => {
    console.log("Selected Role in ChatApp", role);
    console.log("Selected Role in ChatApp Send", role);
    setSelectedRole(role);
  };

  const [chatLog, setChatLog] = useState(initialChatLog);
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    console.log("Loading in ChatApp", loading);
    setLoading(true);
    const inputValue = chatInputRef.current.value.trim();
    console.log("inputValue", inputValue);
    if (!inputValue) return;

    if (totalToken < 2000) {
      toast.error("Not enough tokens 😢");
      return;
    }

    const newMessage = { user: "me", message: inputValue };
    const newChatLog = [...chatLog, newMessage];
    setChatLog(newChatLog);
    chatInputRef.current.value = "";

    const age = localStorage.getItem("age");
    const region = localStorage.getItem("region");

    console.log("age", age);
    console.log("region", region);

    if (!inputValue || inputValue.startsWith("create an image")) {
      try {
        const response = await fetch("http://localhost:1337/api/searchimage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: inputValue,
          }),
        });
        const { image } = await response.json();
        const base64Image = `data:image/png;base64,${image}`;
        setImageUrl(base64Image);
        /*  console.log("base64Image", base64Image); */
        const newImageMessage = { user: "gpt", message: base64Image };
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { user: "gpt", message: base64Image },
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:1337/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: inputValue,
            userId: userId,
            age: age,
            region: region,
          }),
        });

        const { message: { content } = {}, tokenUsage } = await response.json();

        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { user: "gpt", message: content },
        ]);
        setTokenUsage((prevTokenUsage) => prevTokenUsage + tokenUsage);

        const newTotalToken = totalToken - tokenUsage;
        updateTokenCount(newTotalToken);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    setLoading(false);
  };

  const clearChatLog = () => {
    setChatLog(initialChatLog);
    setTokenUsage(0);
  };

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:1337/api/loggeduser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { user } = await response.json();
      console.log("UserId in ChatApp", user._id);
      setUserId(user._id);
      console.log("Credits in ChatApp", user.credits);
      setTotalToken(user.credits);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateTokenCount = async (newTotalToken) => {
    try {
      await fetch(`http://localhost:1337/api/totalTokens?userId=${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalToken: newTotalToken }),
      });

      const response = await fetch(
        `http://localhost:1337/api/totalTokens?userId=${userId}`
      );
      const { totalToken } = await response.json();
      setTotalToken(totalToken);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (!userId) return;
    const fetchTokenCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/totalTokens?userId=${userId}`
        );
        const { totalToken } = await response.json();
        setTotalToken(totalToken);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTokenCount();
  }, [userId]);
  return (
    <div className="ChatApp">
      <SideMenu
        clearChatLog={clearChatLog}
        tokenUsage={tokenUsage}
        totalToken={totalToken}
        handleRoleSelected={handleRoleSelected}
      />
      <section className="chatbox">
        <ChatLog chatLog={chatLog} imageUrl={imageUrl} />
        <ChatInput
          chatInputRef={chatInputRef}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </section>
    </div>
  );
}

export default ChatApp;
