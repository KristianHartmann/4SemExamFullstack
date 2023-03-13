import React from "react";
import { useState } from "react";
import { navLinks } from "../constants";
import monkeyLogo from "../images/monkeyLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <section id="navbar">
      <div className="text-white flex justify-between sm:px-16 px-6 items-center bg-nav navbar w-full">
        <div className="flex gap-10 h-16 ml-32">
          <a href="/">
            <img className="h-full" alt="MonkeyLogo" src={monkeyLogo}></img>
          </a>
        </div>
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-normal cursor-pointer text-[16px] ${
                index === navLinks.length - 1 ? "mr-0" : "mr-10"
              }`}>
              {nav.title === "Shoppinglist" ? (
                <a href={`${nav.id}`}>
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="w-28px h-28px object-contain"
                  />
                </a>
              ) : nav.title === "SearchRecipes" ? (
                <a href={`${nav.id}`}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="w-28px h-28px object-contain"
                  />
                </a>
              ) : (
                <a href={`${nav.id}`}>{nav.title}</a>
              )}
            </li>
          ))}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <FontAwesomeIcon
            icon={faBars}
            className="w-28px h-28px object-contain"
            onClick={() => setToggle((prev) => !prev)}
          />
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
            <ul className="list-none flex flex-col justify-end items-center flex-1">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-normal cursor-pointer text-[16px] ${
                    index === navLinks.length - 1 ? "mb-0" : "mb-4"
                  }`}>
                  <a href={`${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
