import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  header: {
    margin: "30px 0",
    display: "flex",
    justifyContent: "space-between",
    "& h4": {
      fontWeight: "bold",
    },
  },
  renameIcon: {
    cursor: "pointer",
  },
});
