import axios from "axios";

export const GetAllLinks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/shortUrl", {
      withCredentials: true,
    });
    if (response) return response.data;
  } catch (error) {
    console.log("Error in Fetching links", error);
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
