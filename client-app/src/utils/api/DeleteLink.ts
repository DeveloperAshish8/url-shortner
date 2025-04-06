import axios from "axios";

export const deleteLink = async (url: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/shortUrl/${url}`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log("Error in Deleting", error);
  }
};
