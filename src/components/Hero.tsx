import React from "react";
import DualHero from "../images/DualHeroImage.png";
import { DualHeroBannerText } from "../constants";
import { Link } from "react-router-dom";

function Hero() {
  const bannerText = DualHeroBannerText.find(
    (text) => text.id === "FrontBannerText"
  );
  if (!bannerText) {
    return null; // or handle the error
  }

  const { heading, textOne, textTwo, linkText } = bannerText;

  return (
    <section id="home" className="bg-nav text-white font-serif flex">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="flex flex-col gap-4 md:w-1/2">
          <div className="heading1 text-center text-xl lg:text-5xl">
            {heading}
          </div>
          <div className="text-center text-lg lg:text-xl md:text-2xl mt-16">
            {textOne}
          </div>
          <div className="text-center text-lg lg:text-xl md:text-2xl">
            {textTwo}
          </div>
          <div className="flex justify-center mt-10">
            <Link to="searchrecipes">
              <button className="btn-primary">{linkText}</button>
            </Link>
          </div>
        </div>
        <div className="flex-grow md:w-1/2">
          <div className="h-full">
            <img
              className="w-full h-full object-cover"
              src={DualHero}
              alt="Dual Hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
