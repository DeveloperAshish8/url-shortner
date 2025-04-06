import axios from "axios";

export const Login = async (email: string, password: string) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:5000/api/user/login",
      data,
      { withCredentials: true }
    );
    window.location.href = "/";
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
