import React, { useState } from "react";
import SendIcon from "./SendIcon";
import SuggestionPrompt from "./SuggestionPrompt";
import { FiSettings } from "react-icons/fi";

function ChatInput({ chatInputRef, handleSubmit }) {
  const [inputHeight, setInputHeight] = useState("auto");

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    setInputHeight(textarea.style.height);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
      setInputHeight("auto");
    }
  };
  const handleSuggestionClick = (text) => {
    chatInputRef.current.value = text;
  };
  return (
    <div>
      <form
        className="chat-input-holder z-20 m-auto max-w-4xl"
        onSubmit={handleSubmit}
      >
        <div className="chat-input-textarea relative flex w-full flex-grow flex-col rounded-md border border-black/10 py-2">
          <textarea
            rows={1}
            ref={chatInputRef}
            style={{ height: inputHeight }}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            spellCheck="false"
            className="h-full w-full resize-none bg-transparent p-1 pr-12 pl-8 text-sm font-[400] outline-none md:text-base"
          ></textarea>
          <button className="absolute bottom-2.5 left-2 rounded-md p-1 text-gray-500">
            <FiSettings />
          </button>
          <button className="absolute bottom-1.5 right-1 rounded-md p-1 text-gray-500 md:bottom-2.5 md:right-2">
            <SendIcon />
          </button>
        </div>
        <div className="py-2">
          <SuggestionPrompt onSuggestionClick={handleSuggestionClick} />
        </div>
        {/*         <p className="text-xs text-gray-300/50">
          Version 1.0.0. Our goal is to make AI systems more natural and safe to
          interact with. Your feedback will help us improve.
        </p> */}
      </form>
    </div>
  );
}

export default ChatInput;
