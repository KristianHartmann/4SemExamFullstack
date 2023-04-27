import React, { useState, ChangeEvent, FormEvent } from "react";

interface LoginProps {
  login: (email: string, password: string) => void;
}

function Login({ login }: LoginProps) {
  const init = { email: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState<{
    email: string;
    password: string;
  }>(init);

  const performLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    login(loginCredentials.email, loginCredentials.password);
  };

  const testLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(
      "testLogin ",
      loginCredentials.email,
      loginCredentials.password
    );
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
      <form onSubmit={testLogin} className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-start w-full">
          <label htmlFor="email" className="mb-1 text-gray-700 font-bold">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={loginCredentials.email}
            onChange={onChange}
            className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
            required
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={loginCredentials.password}
            onChange={onChange}
            className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
