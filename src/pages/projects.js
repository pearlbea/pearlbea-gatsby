import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "../components/container";
import Header from "../components/header";
import RepoCard from "../components/repoCard";
import { Helmet } from "react-helmet";

export default ({ data }) => {
  return (
    <div>
      <Helmet>
        <title>Pearlbea | Coding</title>
      </Helmet>
      <Header />
      <Container>
        <h1>Coding</h1>
        <Grid container spacing={16}>
          {data.allReposJson.edges.map(({ node }) => {
            return (
              <Grid item key={node.name} xs={12} sm={6}>
                <RepoCard data={node} />
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
    allReposJson {
      edges {
        node {
          name
          description
          language
          link
        }
      }
    }
  }
`;
