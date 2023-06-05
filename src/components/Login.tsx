import { Link } from "raviger";
import React from "react";
import TextInput from "./InputComponents/TextInput";

const Login = () => {
  return (
    <div className="flex flex-col gap-16 w-full p-3.5 text-gray-700 md:w-1/3">
      <p className="text-center text-4xl font-medium">LOGO</p>
      <div>
        <h1 className="text-2xl font-extrabold">Log in</h1>
        <p className="text-sm text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      <div>
        <form id="login-form" className="flex flex-col gap-7">
          <TextInput
            label="Email Address"
            placeholder="name@company.com"
            type="email"
            id="email"
          />
          <div className="flex flex-col gap-2">
            <TextInput
              label="Password"
              placeholder="your password"
              type="password"
              id="password"
            />
            <button className="text-xs text-left">Forget Password?</button>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <input type="checkbox" id="remember" className="w-4 h-4" />
            <label htmlFor="remember" className="text-gray-400">
              Remember Me
            </label>
          </div>
        </form>
        <button
          form="login-form"
          type="submit"
          className="p-3.5 mt-5 bg-blue-600 text-white w-full rounded-md"
        >
          Login
        </button>
        <div className="flex gap-1 mt-3.5">
          <p>Not a member?</p>
          <Link href="/signup" className="font-bold">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
