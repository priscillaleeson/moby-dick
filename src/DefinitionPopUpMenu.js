import { HiMiniXMark } from "react-icons/hi2";

export function DefinitionPopUpMenu({
  setSelectedWord,
  selectedWord,
  initialState,
}) {
  const handleDelete = () => {
    setSelectedWord(initialState);
  };

  console.log("selectedWord", selectedWord);
  console.log("this is selectedWord.position:", selectedWord.position);
  return (
    <div
      style={{
        top: `${selectedWord.position.top}px`,
        left: `${selectedWord.position.left}px`,
      }}
      className=" p-5 absolute rounded-sm z-10 text-black bg-indigo-200"
    >
      <div>
        <div
          onClick={handleDelete}
          className="absolute top-1 right-2 text-white font-sans text-lg cursor-pointer hover:text-violet-600 active:font-semibold"
        >
          <HiMiniXMark />
        </div>
        <div className="font-bold lowercase">{selectedWord.word}</div>
        <div className="italic mb-2">{selectedWord.usage}</div>
        <div>
          <ul className="list-decimal">
            {/*map over first definition's array */}
            {selectedWord.definitions.map((definition) => {
              return <li className="m-2">{definition}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
