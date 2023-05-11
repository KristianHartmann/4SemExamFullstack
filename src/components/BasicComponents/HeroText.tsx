import React from "react";
import DualHero from "../images/DualHeroImage.png";
import { Link } from "react-router-dom";

interface props {
  styling: string;
  heading: string;
  headingStyling: string;
  textOne: string;
  textOneStyling: string;
  textTwo: string;
  textTwoStyling: string;
  linkText: string;
  linkStyling: string;
  btnStyling: string;
  linkTo: string;
}
function HeroText(props: props) {
  const { heading, textOne, textTwo } = props;

  return (
    <div className={props.styling}>
      <div className={props.headingStyling}>{heading}</div>
      <div className={props.textOneStyling}>{textOne}</div>
      <div className={props.textTwoStyling}>{textTwo}</div>
      <div className={props.linkStyling}>
        <Link to={props.linkTo}>
          <button className={props.btnStyling}>{props.linkText}</button>
        </Link>
      </div>
    </div>
  );
}

export default HeroText;
