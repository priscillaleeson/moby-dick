import axios from "axios";

const getApiObject = async (text) => {
  console.log(text);
  const response = await axios.get(
    `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${text}?key=9e06ee89-3af3-4280-b0ab-a6f4f6b862d0`
  );
  console.log(response);
  return response;
};

export default getApiObject;
