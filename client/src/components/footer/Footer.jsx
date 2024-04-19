import React from "react";

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return <p>Copyright &copy; {fullYear} CoinBounce. All rights reserved.</p>;
};

export default Footer;
