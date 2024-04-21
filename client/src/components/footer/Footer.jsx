import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <p className={styles.footer}>
      Copyright &copy; {fullYear} CoinBounce. All rights reserved.
    </p>
  );
};

export default Footer;
