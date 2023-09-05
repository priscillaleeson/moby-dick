import getApiObject from "./webster-dictionary-api";
import { excerptParagraphs } from "./mobyDickText";
import { useState } from "react";
import { DefinitionPopUpMenu } from "./DefinitionPopUpMenu";

export const ExcerptContainer = () => {
  /*state to track which span is selected */
  const [selectedWord, setSelectedWord] = useState({
    word: "",
    usage: [],
    definitions: null,
    position: { top: 0, left: 0 },
  });

  console.log("selected word object:", selectedWord);

  return (
    <div className="font-lora leading-relaxed">
      {/*content mapped from mobyDickText with each word wrapped in a span}*/}
      {excerptParagraphs.map((paragraph, pIndex) => {
        return (
          <p className="mb-7" key={pIndex}>
            {paragraph.split(" ").map((word, wIndex) => (
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
          <DefinitionPopUpMenu selectedWord={selectedWord} />
        )}
      </div>
    </div>
  );
};

//span represents each word:
function Span({ word, setSelectedWord }) {
  const error = "Definition could not be found.";

  const handleDoubleClick = async (e) => {
    const word = e.target.innerText;

    // console.log(`Word: "${word}"`);
    // console.log(e.clientX, e.clientY);

    const definitionResponse = await getApiObject(word);
    // console.log("def response", definitionResponse);

    setSelectedWord((prevState) => ({
      ...prevState,
      word: word,
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
