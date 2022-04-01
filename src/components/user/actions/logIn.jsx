import { Fragment, Component } from "react";
import auth from "../../../services/authService";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

import UserContext from "../../../context/userContext";

class LogIn extends Component {
  async componentDidMount() {
    toast.success("Logged in!");
  }

  render() {
    return <Navigate to="/" replace />;
  }
}

LogIn.contextType = UserContext;

export default LogIn;
