import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../services/authService";
import { en } from "./../../../services/textService";

function LogIn(props) {
  const { setUser } = props.user;

  useEffect(() => {
    async function getUser() {
      const user = await auth.getCurrentUserObj();
      setUser(user);
    }
    getUser();
    toast.success(en.user.loggedIn);
  }, [setUser]);

  return <Navigate to="/" replace />;
}

export default LogIn;
