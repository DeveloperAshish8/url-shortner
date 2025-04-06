import axios from "axios";

export const Register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const data = {
      fullName: name,
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:5000/api/user/register",
      data
    );
    window.location.href = "/login";
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
