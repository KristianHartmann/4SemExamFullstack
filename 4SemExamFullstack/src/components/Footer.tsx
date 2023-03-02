import React from "react";
import instagramLogo from "../images/instagramlogo.png";
import facebookLogo from "../images/facebooklogo.png";
import twitterLogo from "../images/twitterlogo.png";
import companyLogo from "../images/monkeyLogo.png";

import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <a
              href="https://www.pinterest.dk/pin/525302744006741868/"
              target="_blank"
            >
              <img src={facebookLogo} alt="Facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://www.pinterest.dk/pin/525302744006741868/"
              target="_blank"
            >
              <img src={twitterLogo} alt="Twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.pinterest.dk/pin/525302744006741868/"
              target="_blank"
            >
              <img src={instagramLogo} alt="Instagram" />
            </a>
          </li>
        </ul>
      </nav>
      <div className="contact-info">
        <div>Email: contact@CookingWithMonkeys.dk</div>
        <div>Phone: 12344321</div>
        <div>Address: 123 Monkey St, Denmark</div>
      </div>
      <div className="company-logo">
        <img src={companyLogo} alt="Company Logo" />
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Cooking With Monkeys
      </div>
    </footer>
  );
};

export default Footer;
