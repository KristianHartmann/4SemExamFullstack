import React from "react";
import instagramLogo from "../images/instagramlogo.png";
import facebookLogo from "../images/facebooklogo.png";
import twitterLogo from "../images/twitterlogo.png";
import companyLogo from "../images/monkeyLogo.png";

const Footer: React.FC = () => {
  return (
    <footer>
      <nav>
        <ul className="w-8 h-7">
          <li>
            <a href="https://www.facebook.com/">
              <img src={facebookLogo} alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/">
              <img src={twitterLogo} alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <img src={instagramLogo} alt="Instagram" />
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <div>Email: contact@CookingWithMonkeys.dk</div>
        <div>Phone: 12344321</div>
        <div>Address: 123 Monkey St, Denmark</div>
      </div>
      <div className="w-8 h-7">
        <img src={companyLogo} alt="Company Logo" />
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Cooking With Monkeys
      </div>
    </footer>
  );
};

export default Footer;
