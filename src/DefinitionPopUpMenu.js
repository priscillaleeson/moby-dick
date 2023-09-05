export function DefinitionPopUpMenu({ selectedWord }) {
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
