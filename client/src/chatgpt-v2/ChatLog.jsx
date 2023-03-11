import React from "react";
import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

function ChatLog({ chatLog }) {
  const chatLogRef = useRef(null);

  useEffect(() => {
    chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
  }, [chatLog]);

  return (
    <div
      className="chat-log relative max-h-[72%] overflow-y-auto"
      ref={chatLogRef}
    >
     {/*  <ChatLogNavbar /> */}
      {chatLog.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}

export default ChatLog;
