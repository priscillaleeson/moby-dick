import axios from "axios";

const getApiObject = async (word) => {
  console.log("word: ", word);

  /* sanitize selected word to remove all special characters from the API fetch */
  const sanitizedWord = word.replace(/[^a-zA-Z0-9]/g, "");
  console.log("sanitizedWord", sanitizedWord);

  // try {
  const response = await axios.get(
    `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${sanitizedWord}?key=9e06ee89-3af3-4280-b0ab-a6f4f6b862d0`
  );

  console.log("Response", {
    response,
    data: response.data,
    typeOfData: typeof response.data,
  });

  // if (!response.data || !response.data.length) {
  //   throw new Error("No definition found for this word.");
  // }

  // const isArray = typeof response.data === Array;

  return response.data.map((usage, i) => {
    // console.log("usage", usage);
    return usage;

    // return usage.shortdef;
  });
  // } catch (error) {
  //   console.error("Error fetching definition", error.message);
  //   throw error;
  // }
};

export default getApiObject;
