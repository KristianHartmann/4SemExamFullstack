import React from "react";
import { useState } from "react";
import Hero from "./Hero";
import SearchRecipes from "./SearchRecipes";
import Login from "./Login";
import RandomMealList from "./RandomMealList";

const HomepageContent = () => {
  return (
    <section id="home flex flex-grow">
      <Hero />
      <RandomMealList />
    </section>
  );
};
export default HomepageContent;
