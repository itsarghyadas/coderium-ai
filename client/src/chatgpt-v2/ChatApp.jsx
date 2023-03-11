import { useState, useEffect, useRef } from "react";
import "./ChatApp.css";
import "./normal.css";
import SideMenu from "./SideMenu";
import ChatLog from "./ChatLog";
import ChatInput from "./ChatInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatLogNavbar from "./ChatLogNav";

const initialChatLog = [
  { user: "gpt", message: "Hello I am Codepix, Your AI Assistant 🤖" },
];

function ChatApp() {
  const chatInputRef = useRef(null);
  const [chatLog, setChatLog] = useState(initialChatLog);
  const [tokenUsage, setTokenUsage] = useState(0);
  const [totalToken, setTotalToken] = useState(0);
  const [userId, setUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelected = (role) => {
    console.log("Selected Role in ChatApp", role);
    console.log("Selected Role in ChatApp Send", role);
    setSelectedRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputValue = chatInputRef.current.value.trim();
    if (!inputValue) return;

    if (totalToken < 2000) {
      toast.error("Not enough tokens 😢");
      return;
    }

    const newMessage = { user: "me", message: inputValue };
    const newChatLog = [...chatLog, newMessage];
    setChatLog(newChatLog);
    chatInputRef.current.value = "";

    try {
      const response = await fetch("http://localhost:1337/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newChatLog.map(({ message }) => message).join("\n"),
        }),
      });

      const { message: { content } = {}, tokenUsage } = await response.json();

      setChatLog([...newChatLog, { user: "gpt", message: content }]);
      setTokenUsage((prevTokenUsage) => prevTokenUsage + tokenUsage);

      const newTotalToken = totalToken - tokenUsage;
      updateTokenCount(newTotalToken);
    } catch (error) {
      console.error("Error:", error);
    }
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
      const { userId } = await response.json();
      console.log(userId);
      setUserId(userId);
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
        <ChatLogNavbar />
        <ChatLog chatLog={chatLog} />
        <ChatInput chatInputRef={chatInputRef} handleSubmit={handleSubmit} />
      </section>
    </div>
  );
}

export default ChatApp;
