import React, { useState } from "react";
import SendIcon from "./SendIcon";
import SuggestionPrompt from "./SuggestionPrompt";
import { FiSettings } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import MyToggle from "./ToggleSwitch";

function ChatInput({ chatInputRef, handleSubmit, loading }) {
  const [inputHeight, setInputHeight] = useState("auto");
  console.log("Loading in ChatInput", loading);

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
        <div className="feature-holder rounded-lg border border-white/10 p-1.5 shadow-sm drop-shadow-sm">
          <div className="flex items-center justify-start space-x-2 py-2 ">
            <h1 className="px-1 text-left text-sm">Enable Google Search</h1>
            <MyToggle />
          </div>
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
              <AiOutlineSearch size={22} />
            </button>
            <button className="absolute bottom-1.5 right-1 rounded-md p-1 text-gray-500 md:bottom-2.5 md:right-2">
              {loading ? (
                <div className="animate-spin font-bold">
                  <AiOutlineLoading3Quarters className="h-5 w-5 font-bold text-slate-300" />
                </div>
              ) : (
                <SendIcon />
              )}
            </button>
          </div>
        </div>
        <div className="py-2">
          <SuggestionPrompt onSuggestionClick={handleSuggestionClick} />
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
