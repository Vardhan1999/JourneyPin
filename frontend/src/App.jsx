import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import RootLayout from "./shared/components/Layout/RootLayout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Users />,
      },
      {
        path: "places/new",
        element: <NewPlace />,
      },
    ]
  }

]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
