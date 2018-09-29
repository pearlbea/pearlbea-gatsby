import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import LanguageDot from "./LanguageDot";
import octocat from "../img/GitHub-Mark-32px.png";

const styles = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between"
};

export default ({ data }) => {
  return (
    <Card style={styles}>
      <CardContent>
        <div style={{ textAlign: "right", height: "32px" }}>
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundImage: "none" }}
          >
            <img src={octocat} alt="GitHub octocat" />
          </a>
        </div>
        <h2 style={{ marginTop: 0 }}>
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            {data.name}
          </a>
        </h2>
        <div>{data.description}</div>
      </CardContent>
      <CardActions>
        <div style={{ marginLeft: "12px" }}>
          <LanguageDot language={data.language} />
          {data.language}
        </div>
      </CardActions>
    </Card>
  );
};
