import React from "react";
import DualHero from "../images/DualHeroImage.png";
import { DualHeroBannerText } from "../constants";
import { Link } from 'react-router-dom';


function Hero() {
  return (
    <section
      id="home"
      className="bg-tertiary flex text-white font-serif">
      <div className="flex flex-col w-1/2 items-center flex-grow gap-14">
        <div className=" heading1 flex justify-center pt-3 mt-16">
          {
            DualHeroBannerText.find((text) => text.id === "FrontBannerText")
              ?.heading
          }
        </div>
        <div className="flex justify-center w-1/2 text-2xl">
          {
            DualHeroBannerText.find((text) => text.id === "FrontBannerText")
              ?.textOne
          }
        </div>
        <div className="flex justify-center w-1/2 text-2xl ">
          {
            DualHeroBannerText.find((text) => text.id === "FrontBannerText")
              ?.textTwo
          }
        </div>
        <div>
          <Link to="recipes">
            <button className="btn-primary">
              See the coolest recipes here!
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col flex-grow w-1/2 h-full">
        <img className="h-full" src={DualHero}></img>
      </div>
    </section>
  );
}

export default Hero;
