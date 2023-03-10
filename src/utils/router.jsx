import { createBrowserRouter, createRoutesFromElements, Route, defer } from "react-router-dom";
import Root from "../routes/root/root";
import Page404 from "../components/Page404/Page404";
import Login from "../routes/login/login";
import Profile from "../routes/profile/profile";
import { AuthLayout } from "../components/AuthLayout/AuthLayout";
import { ProtectedLayout } from "../components/ProtectedLayout/ProtectedLayout";

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 1000)
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />} loader={() => defer({ userPromise: getUserData() })} >
      <Route path="/" element={<Root />} />
      <Route path="login" element={<Login />} />
      <Route path="/profile" element={<ProtectedLayout />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
)

export default router;