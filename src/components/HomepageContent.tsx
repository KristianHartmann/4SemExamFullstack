import React from "react";
import { useState } from "react";
import Hero from "./Hero";
import SearchRecipes from "./SearchRecipes";
import Login from "./Login";
import RandomMealList from "./RandomMealList";
import { client } from "../App";
import App from "../App";
const HomepageContent = () => {
  return (
    <section id="home">
      <Hero />
      <RandomMealList client={client} />
    </section>
  );
};
export default HomepageContent;
