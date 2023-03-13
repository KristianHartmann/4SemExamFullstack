import React from "react";
import instagramLogo from "../images/instagramlogo.png";
import facebookLogo from "../images/facebooklogo.png";
import twitterLogo from "../images/twitterlogo.png";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between text-white items-center w-full bg-footer sm:px-16 px-6 mb-auto fixed bottom-0">
      <div className="flex h-10 gap-6">
        <a href="https://www.facebook.com/">
          <img className="h-full" src={facebookLogo} alt="Facebook" />
        </a>

        <a href="https://www.twitter.com/">
          <img className="h-full" src={twitterLogo} alt="Twitter" />
        </a>

        <a href="https://www.instagram.com/">
          <img className="h-full" src={instagramLogo} alt="Instagram" />
        </a>
      </div>
      <div className="py-2">
        <div>Email: contact@CookingWithMonkeys.dk</div>
        <div>Phone: 12344321</div>
        <div>Address: 123 Monkey St, Denmark</div>
      </div>
      <div className="h-10 flex items-center">
        <div className="copyright">
          &copy; {new Date().getFullYear()} Cooking With Monkeys
        </div>
      </div>
    </footer>
  );
};

export default Footer;
