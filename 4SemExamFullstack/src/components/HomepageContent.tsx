import React from "react";
import { useState } from "react";
import Hero from "./Hero";
import SearchRecipes from "./SearchRecipes";
import Login from "./Login";

const HomepageContent = () => {
  return (
    <section id="home flex flex-grow">
      <Hero />
    </section>
  );
};
export default HomepageContent;
