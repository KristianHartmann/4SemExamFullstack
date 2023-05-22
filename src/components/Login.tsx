import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  useMutation,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";
import { LoginMutation } from "../queries/LoginMutation";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { LoginInput, LoginData, LoginVariables } from "../types/types";

const Login = ({ client }: { client: ApolloClient<NormalizedCacheObject> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error, data }] = useMutation<
    LoginData,
    LoginVariables
  >(LoginMutation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login");
    login({
      variables: { input: { email, password } },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data && data.login.token) {
    localStorage.setItem("jwtToken", data.login.token);

    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
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
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
};

export default Login;
