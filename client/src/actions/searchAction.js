import axios from "axios";

const baseUrl = process.env.baseURL || "http://localhost:5000";

const backUrl = `${baseUrl}/search/text`;

export const searchText = async (text) => {
  try {
    // console.log(text);
    const { data } = await axios.get(`/search/${text}`);
    if (!data) {
      throw new Error("No result found");
      return;
    }
    return data;
  } catch (error) {
    return error;
  }
};
