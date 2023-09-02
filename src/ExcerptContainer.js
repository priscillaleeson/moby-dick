import getApiObject from "./webster-dictionary-api";
import { excerptParagraphs } from "./mobyDickText";
import { useState } from "react";

export const ExcerptContainer = () => {
  const [selectedWord, setSelectedWord] = useState({
    word: "",
    usage: "",
    definitions: [],
    coordinates: { x: null, y: null },
  });

  //const handleDoubleClick = () => {
  //window.getSelection().toString().trim() is grabbing the word either on highlight or double-click as of now

  //   const text = window.getSelection().toString().trim();
  //   getApiObject(text);
  // };

  console.log("selected word", selectedWord);
  return (
    <div className="font-lora leading-relaxed">
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
        {selectedWord.definitions.length > 0 && (
          <DefinitionPopUpMenu content={selectedWord} />
        )}
      </div>
    </div>
  );
};

const DefinitionPopUpMenu = ({ content }) => {
  console.log("content", content);
  return (
    <div className="overflow-hidden p-10 absolute rounded-sm z-10 w-80 h-80 top-10 right-10 text-black bg-indigo-200">
      <div>
        <div className="font-bold lowercase">{content.word}</div>
        <div className="italic mb-2">{content.usage}</div>
        <div>
          <ul className="list-decimal">
            {/*map over first definition's array */}
            {content.definitions.map((definition) => {
              return <li className="m-2">{definition}</li>;
            })}
          </ul>
        </div>
      </div>
      {/* <div>
        Tooltip for:
        {content?.map((tier1Item) => {
          return (
            <ol key={Math.random()}>
              {tier1Item?.map((tier2Item) => {
                return <li key={Math.random()}>{tier2Item}</li>;
              })}{" "}
              // this is also an arrays 
            </ol>
          );
        })}{" "}
      </div> */}
    </div>
  );
};

function Span({ word, setSelectedWord }) {
  //const [definitions, setDefinitions] = useState();

  const handleDoubleClick = async (e) => {
    const word = e.target.innerText;

    console.log(`Word: "${word}"`);
    console.log(e.clientX, e.clientY);

    const definitionResponse = await getApiObject(word);
    // definitions is an array of arrays of strings aka TS: Array<string[]>
    console.log("def response", definitionResponse);

    setSelectedWord({
      word: word,
      usage: definitionResponse[0].fl,
      definitions: definitionResponse[0].shortdef,
      coordinates: { x: e.clientX, y: e.clientY },
    });
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
