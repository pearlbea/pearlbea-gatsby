import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "gatsby";
import headerStyle from "./header.module.css";
import icon from "../img/icon-small.png";
import { Helmet } from "react-helmet";
import favicon from "../img/icon-small.png";

export default () => (
  <header className={headerStyle.header}>
    <Helmet>
      <html lang="en" />
      <title>Pearlbea</title>
      <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      <meta http-equiv="Content-Language" content="en" />
    </Helmet>
    <AppBar color="default">
      <Toolbar>
        <div className={headerStyle.logo}>
          <Link to="/" className={headerStyle.logoLink}>
            <img src={icon} width="32" height="32" alt="pb icon" />
          </Link>
        </div>
        <nav>
          <ul className={headerStyle.list}>
            <li className={headerStyle.item}>
              <Link to="articles">writing</Link>
            </li>
            <li className={headerStyle.item}>
              <Link to="talks">speaking</Link>
            </li>
            <li className={headerStyle.item}>
              <Link to="projects">coding</Link>
            </li>
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  </header>
);
