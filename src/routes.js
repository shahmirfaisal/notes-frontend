import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup/";
import { Home } from "./pages/Home/";
import { Note } from "./pages/Note/";

export const routes = [
  {
    path: "/",
    key: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/login",
    key: "/login",
    component: Login,
  },
  {
    path: "/signup",
    key: "/signup",
    component: Signup,
  },
  {
    path: "/note/:id",
    key: "/note/:id",
    component: Note,
  },
];
