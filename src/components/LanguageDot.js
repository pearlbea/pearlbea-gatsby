import React from "react";
import dotStyle from "./dot.module.css";

export default ({ language }) => {
  const langClass = language ? language.toLowerCase() : "dot";
  const dotClass = dotStyle[langClass];

  return <div className={dotClass} />;
};
