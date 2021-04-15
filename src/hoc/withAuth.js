import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const withAuth = (auth) => {
  return (WrappedComponent) => {
    return (props) => {
      const history = useHistory();
      const user = useSelector((state) => state.user.user);

      useEffect(() => {
        if (auth && !user) {
          history.replace("/login");
        }
        if (!auth && user) {
          history.replace("/");
        }
      }, [user]);

      return <WrappedComponent {...props} />;
    };
  };
};
