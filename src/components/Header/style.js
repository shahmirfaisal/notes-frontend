import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    "& a": {
      color: "white",
      textDecoration: "none",
    },
    "& p": {
      cursor: "pointer",
    },
  },
});
