import React from "react";
import containerStyle from "./container.module.css";

export default ({ children }) => (
  <main className={containerStyle.container}>{children}</main>
);
