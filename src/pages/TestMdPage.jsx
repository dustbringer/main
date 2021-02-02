import React from "react";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

// https://levelup.gitconnected.com/adding-katex-and-markdown-in-react-7b70694004ef
// https://stackoverflow.com/questions/42928530/how-do-i-load-a-markdown-file-into-a-react-component

const TestMdPage = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Redirecting...
        </Typography>
        <Redirect to="/posts/test"/>
      </Container>
    </>
  );
};

export default TestMdPage;
