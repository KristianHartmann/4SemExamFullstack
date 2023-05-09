import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import monkeyLogo from "../images/monkeyLogo.png";
import facade from "../facades/apiFacade";
import "../styles/Navbar.css";

type NavLink = {
  id: string;
  title: string;
  onClick?: () => void;
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const isLoggedIn = facade.loggedIn();

  const handleLogout = () => {
    facade.logout();
  };

  const iconMap: { [key: string]: IconDefinition } = {
    Shoppinglist: faShoppingCart,
    SearchRecipes: faSearch,
  };

  const navLinks: NavLink[] = [
    {
      id: "searchrecipes",
      title: "SearchRecipes",
    },
    {
      id: "savedrecipes",
      title: "Saved Recipes",
    },
    {
      id: "shoppinglist",
      title: "Shoppinglist",
    },
  ];

  if (isLoggedIn) {
    navLinks.push({
      id: "logout",
      title: "Logout",
      onClick: handleLogout,
    });
    navLinks.push({
      id: "createRecipe",
      title: "Create a Recipe",
    });
  } else {
    navLinks.push({
      id: "login",
      title: "Login",
    });
    navLinks.push({
      id: "register",
      title: "Register",
    });
  }

  // if (!isLoggedIn && location.pathname !== "/login")
  //   return <Navigate to="/login" />;

  // Har udkommenteret de to linjer ovenfor, da det gør man ryger til loginpage uanset hvad, hvis man ikke er logged ind.

  return (
    <section id="navbar">
      <div className="text-white flex justify-between sm:px-16 px-6 items-center bg-tertiary navbar w-full relative z-10">
        <div className="flex gap-10 h-16 ml-4 sm:ml-0">
          <Link to="/">
            <img className="h-full" alt="MonkeyLogo" src={monkeyLogo}></img>
          </Link>
        </div>
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map(({ id, title, onClick }, index) => (
            <li
              key={id}
              className={`font-normal cursor-pointer text-[16px] ${
                index === navLinks.length - 1 ? "mr-0" : "mr-10"
              }`}
            >
              {iconMap[title] ? (
                <Link to={id === "logout" ? "/" : `/${id}`} onClick={onClick}>
                  {id === "logout" ? (
                    <FontAwesomeIcon
                      icon={iconMap[title]}
                      className="w-28px h-28px object-contain"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={iconMap[title]}
                      className="w-28px h-28px object-contain"
                    />
                  )}
                </Link>
              ) : (
                <Link to={id === "logout" ? "/" : `/${id}`} onClick={onClick}>
                  {title}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="sm:hidden block">
          <button
            className="bg-tertiary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setToggle(!toggle)}
          >
            <FontAwesomeIcon
              icon={faBars}
              className="w-28px h-28px object-contain"
            />
          </button>
        </div>
      </div>
      <ul
        className={`${
          toggle ? "block" : "hidden"
        } absolute sm:hidden top-16 left-0 right-0 bg-tertiary list-none text-white px-4 py-2`}
      >
        {navLinks.map(({ id, title, onClick }) => (
          <li
            key={id}
            className={`font-normal cursor-pointer text-[16px] py-2 ${
              id === "logout" ? "border-t-2 border-gray-100 mt-2 pt-2" : ""
            }`}
          >
            {iconMap[title] ? (
              <Link to={id === "logout" ? "/" : `/${id}`} onClick={onClick}>
                {id === "logout" ? (
                  <FontAwesomeIcon
                    icon={iconMap[title]}
                    className="w-28px h-28px object-contain mr-4"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={iconMap[title]}
                    className="w-28px h-28px object-contain mr-4"
                  />
                )}
                {title}
              </Link>
            ) : (
              <Link to={id === "logout" ? "/" : `/${id}`} onClick={onClick}>
                {title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Navbar;
