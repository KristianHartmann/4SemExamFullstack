import React, { useState } from "react";
import { useEffect } from "react";
import facade, { API_URL } from "../facades/apiFacade";
import { RegisterMutation } from "../queries/RegisterMutation";
import { useMutation } from "@apollo/client";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [createUser] = useMutation(RegisterMutation);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      setMessage(`User with email ${data.createUser.email} created!`);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setMessage(error?.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex flex-col items-start w-full">
          <label htmlFor="email" className="mb-1 text-gray-700 font-bold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Register
          </button>
        </div>

        {message && (
          <div className="mt-6 text-center text-blue-500">{message}</div>
        )}
      </form>
    </div>
  );
};

export default Register;
