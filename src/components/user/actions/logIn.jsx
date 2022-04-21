import { Component } from "react";
import auth from "../../../services/authService";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

import DataContext from "../../../context/dataContext";

class LogIn extends Component {
  async componentDidMount() {
    const { setUser } = this.props.user;
    this.context.updateData();

    const user = await auth.getCurrentUserObj();
    await setUser(user);

    toast.success("Logged in!");
  }

  render() {
    return <Navigate to="/" replace />;
  }
}

LogIn.contextType = DataContext;

export default LogIn;
