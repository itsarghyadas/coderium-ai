import { useState, useRef } from "react";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import { VscCopy } from "react-icons/vsc";
import { MdContentCopy } from "react-icons/md";
import promptData from "./PromptData";

function SuggestionPrompt({ onSuggestionClick }) {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  function handleLeftClick() {
    containerRef.current.scrollLeft -= 500; // adjust this value as needed
    setScrollLeft(containerRef.current.scrollLeft);
  }

  function handleRightClick() {
    containerRef.current.scrollLeft += 500; // adjust this value as needed
    setScrollLeft(containerRef.current.scrollLeft);
  }
  const [suggestion, setSuggestion] = useState("");

  /*   function handleClick(suggestion) {
    console.log("clicked submit button");
    setSuggestion(suggestion);
    console.log("Suggestion clicked: ", suggestion);
    onSuggestionClick(suggestion);
  } */

  function handleClick(suggestion, event) {
    if (event.type === "click") {
      console.log("clicked submit button");
      setSuggestion(suggestion);
      console.log("Suggestion clicked: ", suggestion);
      onSuggestionClick(suggestion);
    } else if (
      event.type === "keydown" &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
    }
  }

  const handleCopy = (textToCopy, event) => {
    event.preventDefault(); // prevent form submission
    console.log("cliked copy button");
    console.log("Text to copy: ", textToCopy);
    navigator.clipboard.writeText(textToCopy.trim());
    // Remove focus from the input box
    containerRef.current.blur();
  };

  return (
    <div className="suggestion-parent flex items-center space-x-3 text-[14.6px] ">
      <div>
        <button
          type="button"
          /* className="suggestion-nav-button suggestion-nav-button--left -ml-5" */
          className="mt-1.5"
          onClick={handleLeftClick}
        >
          <span>
            <BiLeftArrowCircle size={26} className="text-green-400" />
          </span>
        </button>
      </div>
      <div
        className="suggestion-prompt-container scrollbar-hide scrollbar-hide mt-2 flex overflow-auto overflow-x-scroll font-medium"
        ref={containerRef}
        style={{
          scrollBehavior: "smooth",
          scrollLeft: scrollLeft,
          transition: "scrollLeft 0.5s ease",
        }}
      >
        <div className="flex">
          {promptData.map((button, index) => (
            <div
              key={index}
              className="suggestion-prompt mr-2 mb-2 flex items-center justify-center space-x-3 rounded-md border border-gray-300/20 bg-slate-400/5 px-2 py-1 text-sm"
            >
              <button
                className={`${button.color} focus:outline-none`}
                onClick={(event) => handleClick(button.text, event)}
                onKeyDown={(event) => handleClick(button.text, event)}
              >
                {button.text}
              </button>

              <button
                className="copy-button focus:outline-none"
                onClick={(event) => handleCopy(button.text, event)}
              >
                <span>
                  <MdContentCopy size={20} className="text-white" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          type="button"
          /* className="suggestion-nav-button suggestion-nav-button--right -mr-5" */
          className="mt-1.5"
          onClick={handleRightClick}
        >
          <span>
            <BiRightArrowCircle size={26} className="text-green-400" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default SuggestionPrompt;
