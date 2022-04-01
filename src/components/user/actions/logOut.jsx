import { Fragment, Component } from "react";
import auth from "../../../services/authService";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

import UserContext from "../../../context/userContext";

class LogOut extends Component {
  componentDidMount() {
    const userContext = this.context;
    auth.logout(); // Removes from LocalStorage
    userContext.clearUser(); // Removes from State
    this.context.toggleLoggedIn();
    toast.success("Logged out!");
  }

  render() {
    return <Navigate to="/" replace />;
  }
}

LogOut.contextType = UserContext;

export default LogOut;
