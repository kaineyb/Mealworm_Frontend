// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "./../context/userContext";

const PrivateRoute = ({ children }) => {
  const context = useContext(userContext);

  // Add your own authentication on the below line.
  const isLoggedIn = context.loggedIn;

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
