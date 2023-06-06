import { useRoutes } from "raviger";
import Home from "../components/pages/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AppContainer from "../components/AppContainer";
import Layout from "../components/layout/Layout";
import Boards from "../components/pages/Boards";
import KanbanBoard from "../components/pages/KanbanBoard";

const routes = {
  "/": () => (
    <Layout>
      <Home />
    </Layout>
  ),
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/boards": () => (
    <Layout>
      <Boards />
    </Layout>
  ),
  "/boards/:boardId": ({ boardId }: { boardId: string }) => (
    <Layout>
      <KanbanBoard boardId={Number(boardId)} />
    </Layout>
  ),
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
