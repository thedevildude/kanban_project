import { Link } from "raviger";
import React, { useState } from "react";
import TextInput from "./InputComponents/TextInput";

const Login = () => {
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginCredential);
  };

  return (
    <div className="flex flex-col w-full p-3.5 text-gray-700 md:w-1/3 md:p-0">
      <p className="text-center text-4xl font-medium my-12">LOGO</p>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-extrabold mb-2">Log in</h1>
          <p className="text-sm text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        <div>
          <form
            id="login-form"
            onSubmit={handleLogin}
            className="flex flex-col gap-7"
          >
            <TextInput
              label="Email Address"
              placeholder="name@company.com"
              value={loginCredential.email}
              type="email"
              id="email"
              handleChangeCB={(e) =>
                setLoginCredential({
                  ...loginCredential,
                  email: e.target.value,
                })
              }
            />
            <div className="flex flex-col gap-2">
              <TextInput
                label="Password"
                placeholder="your password"
                value={loginCredential.password}
                type="password"
                id="password"
                handleChangeCB={(e) =>
                  setLoginCredential({
                    ...loginCredential,
                    password: e.target.value,
                  })
                }
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
    </div>
  );
};

export default Login;
