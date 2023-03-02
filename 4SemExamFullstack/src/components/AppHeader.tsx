import React from "react";
import "../styles/header.css";
import logo from "../images/MonkeyLogo.png";

export type AppHeaderProps = {
  title: string;
};

const Header: React.FC<AppHeaderProps> = React.memo(({ title }) => {
  return (
    <div className="Header">
      <div className="HeaderLogo">
        <a href="#home">
          <h2>{title}</h2>
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>
      <div className="LoginModal">Login</div>
    </div>
  );
});

export default Header;
