import React from "react";
import instagramLogo from "../images/instagramlogo.png";
import facebookLogo from "../images/facebooklogo.png";
import twitterLogo from "../images/twitterlogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between text-white items-center w-full bg-footer sm:px-16 font-serif">
      <div className="flex h-10 gap-6 py-2 ml-9">
      <a href="https://www.facebook.com/">
        <FontAwesomeIcon icon={faFacebook} size="2x"/>
        </a>
       <a href="https://www.twitter.com/">
        <FontAwesomeIcon icon={faTwitter} size="2x"/>
        </a>
       <a href="https://www.instagram.com/">
        <FontAwesomeIcon icon={faInstagram} size="2x"/>
        </a>
      </div>
      <div className="py-2">
        <div>Email: contact@CookingWithMonkeys.dk</div>
        <div>Phone: 12344321</div>
        <div>Address: 123 Monkey St, Denmark</div>
      </div>
      <div className="h-10p py-2">
          &copy; {new Date().getFullYear()} Cooking With Monkeys
      </div>
    </footer>
  );
};

export default Footer;
