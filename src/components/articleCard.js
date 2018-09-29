import React from "react";
import { Link } from "gatsby";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const styles = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between"
};

export default ({ data, articlePath }) => {
  return (
    <Card style={styles}>
      <CardContent>
        <h2>{data.frontmatter.title}</h2>
        <div>{data.frontmatter.summary}</div>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Link to={data.fields.slug}>Read more</Link>
      </CardActions>
    </Card>
  );
};
