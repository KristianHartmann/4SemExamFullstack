import React from "react";
import DualHero from "../images/DualHeroImage.png";
import { FrontBannerText } from "../constants";
import HeroImg from "./BasicComponents/HeroImg";
import HeroText from "./BasicComponents/HeroText";
import { Link } from "react-router-dom";

function Hero() {
  const bannerText = FrontBannerText.find(
    (text) => text.id === "FrontBannerText"
  );

  if (!bannerText) {
    return null; // or handle the error
  }

  const { heading, textOne, textTwo, linkText } = bannerText;

  return (
    <section
      id="home"
      className="bg-nav text-white font-serif flex flex-col md:flex-row h-1/2">
      <HeroText
        styling="flex-1 flex flex-col justify-center px-4 py-8 md:p-0"
        headingStyling="heading1 text-center text-xl lg:text-5xl"
        heading={heading}
        textOneStyling="text-center text-lg lg:text-xl md:text-2xl mt-16"
        textOne={textOne}
        textTwoStyling="text-center text-lg lg:text-xl md:text-2xl"
        textTwo={textTwo}
        linkStyling="flex justify-center mt-10"
        linkTo="searchrecipes"
        linkText={linkText}
        btnStyling="btn-primary"
      />
      <HeroImg
        styling="flex-1 order-first md:order-last"
        imgstyling="w-full h-full object-cover object-center"
        img={DualHero}
        alt="Dual Hero"
      />
    </section>
  );
}

export default Hero;
