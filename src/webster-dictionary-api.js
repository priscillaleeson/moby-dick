import axios from "axios";

const getApiObject = async (word) => {
  console.log("word: ", word);
  const response = await axios.get(
    `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=9e06ee89-3af3-4280-b0ab-a6f4f6b862d0`
  );

  console.log("Response", {
    response,
    data: response.data,
    typeOfData: typeof response.data,
  });

  // const isArray = typeof response.data === Array;

  return response.data.map((usage, i) => {
    console.log("usage", usage);
    return usage;

    // return usage.shortdef;
  });

  // if (isArray) {
  //   return response.data.map((usage, i) => {
  //     return usage.shortdef;
  //   });
  // }
  // return [];
};

export default getApiObject;
