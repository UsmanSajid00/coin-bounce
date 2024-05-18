import React from "react";
import styles from "./Loader.module.css";
import { TailSpin } from "react-loader-spinner";

const Loader = ({ text }) => {
  return (
    <div className={styles.loaderWrapepr}>
      <h2>Loading {text}</h2>
      <TailSpin color={"#3661fb"} height={100} width={100} radius={1} />
    </div>
  );
};

export default Loader;
