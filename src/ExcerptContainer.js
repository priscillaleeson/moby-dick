import getApiObject from "./webster-dictionary-api";
import { mappedExcerptParagraphsWithSpans } from "./mobyDickText";

export const ExcerptContainer = () => {
  const handleDoubleClick = () => {
    //window.getSelection().toString().trim() is grabbing the word either on highlight or double-click as of now

    const text = window.getSelection().toString().trim();
    getApiObject(text);
  };

  return (
    <div className="font-lora leading-relaxed">
      {mappedExcerptParagraphsWithSpans}
    </div>
  );
};

//how to grab
