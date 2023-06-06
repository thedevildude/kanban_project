import { useRoutes } from "raviger";
import Home from "../components/pages/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AppContainer from "../components/AppContainer";
import Header from "../components/layout/Layout";
import Boards from "../components/pages/Boards";

const routes = {
  "/": () => (
    <Header>
      <Home />
    </Header>
  ),
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/boards": () => (
    <Header>
      <Boards />
    </Header>
  ),
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
