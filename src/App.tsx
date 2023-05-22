import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePageContent from "./components/HomepageContent";
import SearchRecipes from "./components/SearchRecipes";
import SavedRecipes from "./components/SavedRecipes";
import Recipe from "./components/Recipe";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateRecipe from "./components/CreateRecipe";
import facade from "./facades/apiFacade";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import MyRecipes from "./components/MyRecipes";

export const client = new ApolloClient({
  uri: "https://kiah.dk/sem4exam/",
  // uri: "http://localhost:4000/graphql"
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="flex flex-col w-screen h-screen min-h-screen overflow-x-auto">
          <Navbar />
          <div className="flex-grow bg-background">
            <Routes>
              <Route path="/" element={<HomePageContent />} />
              <Route path="/searchrecipes" element={<SearchRecipes />} />
              <Route path="/savedrecipes" element={<SavedRecipes />} />
              <Route path="/recipe" element={<Recipe client={client} />} />
              <Route
                path="/shoppinglist"
                element={<div> not implemented yet</div>}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login client={client} />} />
              <Route path="/createRecipe" element={<CreateRecipe />} />
              <Route
                path="/myrecipes"
                element={<MyRecipes client={client} />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
