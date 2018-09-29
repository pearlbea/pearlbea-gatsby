import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { Helmet } from "react-helmet";
import Container from "../components/container";
import Header from "../components/header";

require("prismjs/themes/prism-solarizedlight.css");

export default ({ data }) => {
  const article = data.markdownRemark;
  return (
    <div>
      <Helmet>
        <title>Pearlbea | Writing</title>
        <meta name="description" content={article.frontmatter.summary} />
        <meta name="og:description" content={article.frontmatter.summary} />
      </Helmet>
      <Header />
      <Container style={{ maxWidth: 700 }}>
        <h1>{article.frontmatter.title}</h1>
        <p>
          Republished with permission from{" "}
          <Link to="https://bendyworks.com/">Bendyworks</Link>.
        </p>
        <Img
          sizes={article.frontmatter.heroImage.childImageSharp.sizes}
          alt=""
          style={{ marginBottom: "2em" }}
        />
        <div dangerouslySetInnerHTML={{ __html: article.html }} />
      </Container>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        summary
        date
        coauthor
        heroImage {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
