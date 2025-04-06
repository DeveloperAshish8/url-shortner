import axios from "axios";

export const Logout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    window.location.href = "/login";
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
