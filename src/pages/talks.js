import React from "react";
import { graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Container from "../components/container";
import Header from "../components/header";
import { Helmet } from "react-helmet";

const listStyle = {
  listStyleType: "none",
  margin: 0,
  padding: 0
};

export default ({ data }) => {
  return (
    <div>
      <Helmet>
        <title>Pearlbea | Speaking</title>
      </Helmet>
      <Header />
      <Container>
        <h1>Speaking</h1>

        <Grid container alignItems="stretch">
          {data.allTalksJson.edges.map(({ node }) => {
            let link = `https://slides.today/decks/${node.id}`;
            return (
              <Grid item key={node.id} xs={12}>
                <ul style={listStyle}>
                  <li>
                    <h3 style={{ marginTop: 20 }}>{node.title}</h3>
                  </li>
                  <li style={{ marginBottom: 0 }}>
                    {node.eventTitle}, {node.location}
                  </li>
                  <li>{node.date}</li>
                  <li>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      More info
                    </a>
                  </li>
                </ul>
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
    allTalksJson {
      edges {
        node {
          id
          date
          title
          eventTitle
          location
        }
      }
    }
  }
`;
