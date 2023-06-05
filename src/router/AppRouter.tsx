import { useRoutes } from "raviger";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AppContainer from "../components/AppContainer";
import Header from "../components/base/Header";

const routes = {
  "/": () => (
    <Header>
      <Home />
    </Header>
  ),
  "/login": () => <Login />,
  "/signup": () => <Signup />,
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
