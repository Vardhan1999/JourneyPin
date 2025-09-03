import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users, { loader as usersLoader } from "./user/pages/Users";
import NewPlace, { action as newPlaceAction } from "./places/pages/NewPlace";
import RootLayout from "./shared/components/Layout/RootLayout";
import UserPlaces, { loader as userPlacesLoader } from "./places/pages/UserPlaces";
import UpdatePlace,{loader as updatePlaceLoader, action as updatePlaceAction} from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContextProvider } from "./shared/store/AuthContext";
import ProtectedRoute from "./shared/components/Layout/ProtectedRoute";
import ErrorPage from "./shared/components/UIElements/ErrorPage";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
        action: newPlaceAction
      },
      {
        path: "places/:placeId",
        element: (
          <ProtectedRoute>
            <UpdatePlace />
          </ProtectedRoute>
        ),
        loader:updatePlaceLoader,
        action:updatePlaceAction,
      },
      {
        path: ":userId/places",
        element: (
          <ProtectedRoute>
            <UserPlaces />
          </ProtectedRoute>
        ),
        loader: userPlacesLoader
      },
    ],
  },
]);

const App = () => (
  <AuthContextProvider>
    <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
  </AuthContextProvider>
);

export default App;
