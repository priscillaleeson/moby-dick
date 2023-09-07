import getApiObject from "./webster-dictionary-api";
import { excerptParagraphs } from "./mobyDickText";
import { useState } from "react";
import { DefinitionPopUpMenu } from "./DefinitionPopUpMenu";

export const ExcerptContainer = () => {
  /*state to track which span is selected */

  const initialState = {
    word: "",
    usage: [],
    definitions: null,
    position: { top: 0, left: 0 },
  };

  const [selectedWord, setSelectedWord] = useState(initialState);

  console.log("selected word object:", selectedWord);

  return (
    <div className="font-lora leading-relaxed">
      {/*content mapped from mobyDickText with each word wrapped in a span}*/}
      {excerptParagraphs.map((paragraph, pIndex) => {
        return (
          <p className="mb-7" key={pIndex}>
            {/*removed '--' from the text due to putting words together that don't make a word*/}
            {paragraph.split(/ |--/).map((word, wIndex) => (
              <Span
                key={wIndex}
                wIndex={wIndex}
                word={word}
                setSelectedWord={setSelectedWord}
              />
            ))}
          </p>
        );
      })}
      <div>
        {" "}
        {/*if the array has a response, then show definition menu*/}
        {selectedWord.definitions && (
          <DefinitionPopUpMenu
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
            initialState={initialState}
          />
        )}
      </div>
    </div>
  );
};

//span represents each word:
function Span({ word, setSelectedWord }) {
  const error = (
    <div className="text-red-800 italic text-sm">
      Definition could not be found.
    </div>
  );

  const handleDoubleClick = async (e) => {
    const word = e.target.innerText;

    // console.log(`Word: "${word}"`);
    // console.log(e.clientX, e.clientY);

    const definitionResponse = await getApiObject(word);
    // console.log("def response", definitionResponse);

    setSelectedWord((prevState) => ({
      ...prevState,
      //.replace(/[^a-zA-Z0-9-]/g, "") means to store the word selected in state without special characters (except dash)
      word: word.replace(/[^a-zA-Z0-9-]/g, ""),
      usage: definitionResponse[0].fl,
      definitions:
        definitionResponse[0].shortdef &&
        definitionResponse[0].shortdef.length > 0
          ? definitionResponse[0].shortdef
          : [error],

      position: {
        top: e.clientY + window.scrollY,
        left: e.clientX + window.scrollX,
      },
    }));
  };

  return (
    <span
      onDoubleClick={handleDoubleClick}
      className="hover:text-purple-900 cursor-pointer select-none"
      style={{
        position: "relative",
      }}
    >
      {word + " "}
    </span>
  );
}
