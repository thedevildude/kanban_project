import { useRoutes, Redirect } from "raviger";
import Login from "../components/Login";
import Signup from "../components/Signup";

const routes = {
  "/": () => <Redirect to="/login" />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
}

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return routeResult;
}