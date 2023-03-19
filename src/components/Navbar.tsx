import React, { useState } from "react";
import { navLinks } from "../constants";
import monkeyLogo from "../images/monkeyLogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const iconMap: { [key: string]: IconDefinition } = {
    Shoppinglist: faShoppingCart,
    SearchRecipes: faSearch,
  };

  return (
    <section id="navbar">
      <div className="text-white flex justify-between sm:px-16 px-6 items-center bg-tertiary navbar w-full relative z-10">
        <div className="flex gap-10 h-16 ml-4 sm:ml-0">
          <Link to="/">
            <img className="h-full" alt="MonkeyLogo" src={monkeyLogo}></img>
          </Link>
        </div>
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map(({ id, title }, index) => (
            <li
              key={id}
              className={`font-normal cursor-pointer text-[16px] ${
                index === navLinks.length - 1 ? "mr-0" : "mr-10"
              }`}>
              {iconMap[title] ? (
                <Link to={`/${id}`}>
                  <FontAwesomeIcon
                    icon={iconMap[title]}
                    className="w-28px h-28px object-contain"
                  />
                </Link>
              ) : (
                <Link to={`/${id}`}>{title}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <FontAwesomeIcon
            icon={faBars}
            className="w-28px h-28px object-contain"
            onClick={() => setToggle((prev) => !prev)}
            aria-label="Open mobile menu"
            role="button"
          />

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar text-white bg-tertiary`}>
            <ul className="list-none flex flex-col justify-end items-center flex-1">
              {navLinks.map(({ id, title }, index) => (
                <li
                  key={id}
                  className={`font-normal cursor-pointer text-[16px] ${
                    index === navLinks.length - 1 ? "mb-0" : "mb-4"
                  }`}>
                  <Link to={`/${id}`} onClick={() => setToggle(false)}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
