import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  heading: {
    fontWeight: "600",
    marginTop: "30px",
  },
  form: {
    marginTop: "25px",
    padding: "10px",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    "& input": {
      display: "block",
    },
    "& > div": {
      display: "flex",
      marginBottom: "10px",
    },
    "& button": {
      marginTop: "20px",
    },
    "& a": {
      display: "block",
      marginTop: "15px",
    },
  },
});
