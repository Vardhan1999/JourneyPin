import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import RootLayout from "./shared/components/Layout/RootLayout";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
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
      {
        path: "places/:placeId",
        element: <UpdatePlace />,
      },
      {
        path: ":userId/places",
        element: <UserPlaces />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
