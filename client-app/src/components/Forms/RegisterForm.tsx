import * as React from "react";
import { Link } from "react-router-dom";
import { Register } from "../../utils/api/Register";

interface IRegisterFormProps {}

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = () => {
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;
    console.log(email + " " + password);

    const response = await Register(name, email, password);
    console.log(response);
  };
  return (
    <div className="w-full justify-center items-center h-screen flex">
      <div className="flex flex-col justify-center items-center w-[400px]  text-white gap-10">
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <h1 className="md:text-3xl text-2xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-transparent bg-clip-text leading-[1.7]">
            Create a new Account
          </h1>
          <h6 className="text-base font-medium">
            Already have a account? <Link to="/login" className="underline">Login</Link>
          </h6>
        </div>

        <form
          className="flex flex-col gap-8 justify-center items-center"
          onSubmit={submitForm}
        >
          <label htmlFor="email" className="flex flex-col gap-2">
            Full Name
            <input
              type="name"
              name="name"
              placeholder="Enter your name"
              required
              className="w-[350px] h-12 rounded-3xl border-[3px] border-[#6f6f6f] px-4 py-2 bg-transparent outline-none text-base font-medium"
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-2">
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter the Email"
              required
              className="w-[350px] h-12 rounded-3xl border-[3px] border-[#6f6f6f] px-4 py-2 bg-transparent outline-none text-base font-medium"
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-2">
            Password
            <input
              type="password"
              name="password"
              required
              placeholder="Enter the password"
              className="w-[350px] h-12 rounded-3xl border-[3px] border-[#6f6f6f] px-4 py-2 bg-transparent outline-none text-base font-medium"
            />
          </label>
          <button
            type="submit"
            className="w-full h-12 rounded-full flex items-center justify-center  bg-[#144EE3] text-white"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
