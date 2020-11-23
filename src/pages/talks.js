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
          <Grid item key='100820' xs={12}>
            <ul style={listStyle}>
              <li>
                <h3 style={{ marginTop: 20 }}>Leverage the Power of Native with Progressive Web Apps</h3>
              </li>
              <li style={{ marginBottom: 0 }}>
                Girl Geek X, Virtual Girl Geek Dinner
              </li>
              <li>Oct 8, 2020</li>
              <li>
                <a href='https://girlgeek.io/events/codesee-girl-geek-event-networking/' target="_blank" rel="noopener noreferrer">
                  More info
                </a>
              </li>
            </ul>
          </Grid>
          <Grid item key='100720' xs={12}>
            <ul style={listStyle}>
              <li>
                <h3 style={{ marginTop: 20 }}>Making Our Websites Load Faster</h3>
              </li>
              <li style={{ marginBottom: 0 }}>
                Propeller Health Lunch and Learn, Madison, WI
              </li>
              <li>Oct 7, 2020</li>
              <li>
                <a href='https://docs.google.com/presentation/d/1XPnWUbtv53SWdAvGDGhej9pSC75jremWJpcS7vbnna0/edit?usp=sharing' target="_blank" rel="noopener noreferrer">
                  More info
                </a>
              </li>
            </ul>
          </Grid>



          <Grid item key='011320' xs={12}>
            <ul style={listStyle}>
              <li>
                <h3 style={{ marginTop: 20 }}>PWAs with Angular</h3>
              </li>
              <li style={{ marginBottom: 0 }}>
                MadJS, Madison, WI
              </li>
              <li>Jan 13, 2020</li>
              <li>
                <a href='https://slides.today/decks/-Lxlgzybi9x9Cq1kT9PT' target="_blank" rel="noopener noreferrer">
                  More info
                </a>
              </li>
            </ul>
          </Grid>
          <Grid item key='103019' xs={12}>
            <ul style={listStyle}>
              <li>
                <h3 style={{ marginTop: 20 }}>Making Our Products Accessible</h3>
              </li>
              <li style={{ marginBottom: 0 }}>
                Propeller Health Lunch and Learn, Madison, WI
              </li>
              <li>Oct 30, 2019</li>
              <li>
                <a href='https://docs.google.com/presentation/d/1Z4jL1oY-guo5ZSt2uar1E6Bdk2FJPcZjfM6vfJBNpRM/edit?usp=sharing' target="_blank" rel="noopener noreferrer">
                  More info
                </a>
              </li>
            </ul>
          </Grid>

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
