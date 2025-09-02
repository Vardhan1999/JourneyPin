import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users, { loader as usersLoader } from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import RootLayout from "./shared/components/Layout/RootLayout";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContextProvider } from "./shared/store/AuthContext";
import ProtectedRoute from "./shared/components/Layout/ProtectedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Public routes
      { index: true, element: <Users />, loader: usersLoader },
      { path: "auth", element: <Auth /> },

      // Protected routes
      {
        path: "places/new",
        element: (
          <ProtectedRoute>
            <NewPlace />
          </ProtectedRoute>
        ),
      },
      {
        path: "places/:placeId",
        element: (
          <ProtectedRoute>
            <UpdatePlace />
          </ProtectedRoute>
        ),
      },
      {
        path: ":userId/places",
        element: (
          <ProtectedRoute>
            <UserPlaces />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => (
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);

export default App;
