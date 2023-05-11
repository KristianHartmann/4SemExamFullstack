import React from "react";
import { Link } from "react-router-dom";

interface props {
  img: string;
  styling: string;
  imgstyling: string;
  alt: string;
}
function HeroImg(props: props) {
  return (
    <div className={props.styling}>
      <img className={props.imgstyling} src={props.img} alt={props.alt} />
    </div>
  );
}

export default HeroImg;
