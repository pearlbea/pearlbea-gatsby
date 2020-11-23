import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import indexStyle from "./index.module.css";
import { Helmet } from "react-helmet";
import favicon from "../img/icon-small.png";

export default ({ data }) => {
  return (
    <div className={indexStyle.wrapper}>
      <Helmet>
        <html lang="en" />
        <title>Pearlbea</title>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        <meta http-equiv="Content-Language" content="en" />
      </Helmet>
      <div className={indexStyle.wrapper}>
        <Img sizes={data.fileName.childImageSharp.sizes} />
      </div>
      <div className={indexStyle.wrapper}>
        <h1 style={{ marginTop: "1em" }}>Pearl Latteier</h1>
        <div>
          Frontend engineer at{" "}
          <a
            href="https://propellerhealth.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Propeller
          </a>
        </div>
        <div>
          <a
            href="https://developers.google.com/experts/people/pearl-latteier"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Developer Expert
          </a>{" "}
          in web technologies
        </div>
        <div>
          Co-organizer of{" "}
          <a
            href="https://www.meetup.com/gdgmadison/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GDG Madison
          </a>
          ,{" "}
          <a
            href="https://www.womentechmakers.com/directory/pearl-latteier"
            target="_blank"
            rel="noopener noreferrer"
          >
            Women Techmakers
          </a>{" "}
          lead
        </div>
        <div>
          <a
            href="https://twitter.com/pblatteier"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{" "}
          &#183;&nbsp;
          <a
            href="https://github.com/pearlbea"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>{" "}
          &#183;&nbsp;
          <a
            href="https://www.npmjs.com/~pearlbea"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </a>{" "}
          &#183;&nbsp;
          <a
            href="https://www.linkedin.com/in/pearllatteier/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
        </div>
      </div>
      <nav>
        <ul className={indexStyle.list}>
          <li className={indexStyle.item}>
            <Link className={indexStyle.link} role="button" to="/articles">
              Writing
            </Link>
          </li>
          <li className={indexStyle.item}>
            <Link className={indexStyle.link} role="button" to="/talks">
              Speaking
            </Link>
          </li>
          <li className={indexStyle.item}>
            <Link className={indexStyle.link} role="button" to="/projects">
              Coding
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const query = graphql`
  query indexQuery {
    fileName: file(relativePath: { eq: "img/full-pb-photo.jpeg" }) {
      childImageSharp {
        sizes(maxWidth: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;
