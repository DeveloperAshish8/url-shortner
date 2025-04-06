import axios from "axios";

export const shortenLink = async (url: string) => {
  const data = {
    fullUrl: url,
  };
  try {
    const response = await axios.post(
      "http://localhost:5000/api/shortUrl",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error ) {
    console.log("Error in Shortning: ", error);
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;
      console.log(status);

      if (status === 401 || status === 403) {
        window.location.href = "/login";
      } 
    }
    throw error;
  }
};
