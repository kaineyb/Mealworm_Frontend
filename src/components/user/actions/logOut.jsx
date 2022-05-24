import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import auth from "../../../services/authService";
import userContext from "./../../../context/userContext";

function LogOut(props) {
  const data = useContext(dataContext);
  const user = useContext(userContext);

  useEffect(() => {
    auth.logout(); // Removes from LocalStorage
    user.clearUser(); // Removes from State
    data.clearData(); // Removes from State
    user.toggleLoggedIn();
    toast.success("Logged out!");
  }, []);

  return <Navigate to="/" replace />;
}

export default LogOut;
