import { createBrowserRouter } from "react-router-dom";
import Root from "../routes/root/root";
import Page404 from "../components/Page404/Page404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Page404 />,
  }
])

export default router;