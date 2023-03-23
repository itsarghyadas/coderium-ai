import React from "react";
import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatLogNavbar from "./ChatLogNav";

function ChatLog({ chatLog, imageUrl }) {
  const chatLogRef = useRef(null);
  /* console.log("image in chatlog", imageUrl); */
  useEffect(() => {
    chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
  }, [chatLog]);

  return (
    <div
      className="chat-log relative max-h-[80%] overflow-y-auto"
      ref={chatLogRef}
    >
      <ChatLogNavbar />
      {chatLog.map((message, index) => (
        <ChatMessage key={index} message={message} imageUrl={imageUrl} />
      ))}
    </div>
  );
}

export default ChatLog;
