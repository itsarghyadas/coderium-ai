import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";
import ChatgptLogo from "./ChatgptLogo";
import UserchatLogo from "./UserchatLogo";
import { FaDownload } from "react-icons/fa";

const ChatMessage = ({ message, imageUrl }) => {
  console.log("message in chatmessage", message);
  const isGpt = message.user === "gpt";
  const classes = `chat-message border-b border-dashed border-slate-500/20 ${
    isGpt ? "chatgpt" : ""
  }`;
  const avatarClasses = `avatar h-8 w-8 flex-shrink-0 rounded-full ${
    isGpt ? "chatgpt" : "user"
  }`;
  const avatarContent = isGpt ? (
    <ChatgptLogo />
  ) : (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600/70 ">
      <UserchatLogo />
    </div>
  );
  const components = {
    table: ({ children }) => (
      <table className="message__table">{children}</table>
    ),
    p: ({ children }) => <p className="message__paragraph">{children}</p>,
    code: CodeBlock,
  };

  return (
    <div className={classes}>
      <div className="chat-message-center mx-auto max-w-4xl border-l border-r border-dashed border-slate-500/20 px-8 py-10 ">
        <div className="flex items-start space-x-5 pr-7">
          <div className={avatarClasses}>{avatarContent}</div>
          {isGpt && imageUrl !== undefined && imageUrl !== "" ? (
            <div className="flex flex-col gap-1.5">
              {message.message.startsWith("data:image/") ? (
                <div className="flex flex-col gap-y-2">
                  <img
                    className="h-[300px] w-[300px] rounded-md object-cover shadow-sm drop-shadow-sm"
                    src={message.message}
                    alt="ChatMessage image"
                  />
                  <button className="flex items-center justify-center space-x-2 rounded bg-slate-200 py-1.5 font-phudu text-lg font-semibold text-slate-700 shadow drop-shadow ">
                    <a href={message.message} download>
                      Download
                    </a>
                    <span>
                      <FaDownload />
                    </span>
                  </button>
                </div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="message__markdown project-prose text-left"
                  components={components}
                >
                  {message.message}
                </ReactMarkdown>
              )}
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="message__markdown project-prose text-left"
              components={components}
            >
              {message.message}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
