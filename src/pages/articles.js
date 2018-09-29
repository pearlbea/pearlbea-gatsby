import React from "react";
import { graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Container from "../components/container";
import Header from "../components/header";
import ArticleCard from "../components/articleCard";

export default ({ data }) => {
  return (
    <div>
      <Header />
      <Container>
        <h1>Writing</h1>
        <Grid container spacing={40} alignItems="stretch">
          {data.allMarkdownRemark.edges.map(({ node }) => {
            return (
              <Grid item key={node.id} xs={12} sm={6}>
                <ArticleCard data={node} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            summary
            heroImage {
              childImageSharp {
                sizes(maxWidth: 250) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
