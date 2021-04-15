import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  container: {
    marginTop: "30px",
  },
  table: {
    "& th": {
      fontWeight: "bold",
    },
    "& a": {
      color: "inherit",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
});
