import { useEffect } from "react";
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import { Header } from "./components/Header/";
import { Route, Switch, useHistory } from "react-router-dom";
import { routes } from "./routes";
import { NotificationContainer } from "react-notifications";
import { setHistory } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "./store/slices/userSlice";

export const App = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Spartan", "sans-serif"],
    },
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.contentLoading);

  useEffect(() => {
    setHistory(history);
    dispatch(isLogin());
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />{" "}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Header />

            <Switch>
              {routes.map((route) => (
                <Route {...route} />
              ))}
            </Switch>
          </>
        )}
        <NotificationContainer />
      </ThemeProvider>
    </div>
  );
};
