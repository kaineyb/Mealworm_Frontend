import { Component } from "react";
import auth from "../../../services/authService";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

class LogOut extends Component {
  componentDidMount() {
    const { user: userContext, data: dataContext } = this.props;

    auth.logout(); // Removes from LocalStorage
    userContext.clearUser(); // Removes from State
    dataContext.clearData(); // Removes from State
    userContext.toggleLoggedIn();
    toast.success("Logged out!");
  }

  render() {
    return <Navigate to="/" replace />;
  }
}

export default LogOut;
