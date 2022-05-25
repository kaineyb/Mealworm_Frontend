import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { default as dataContext } from "../../../context/dataContext";
import auth from "../../../services/authService";

function LogIn(props) {
  const { updateData } = useContext(dataContext);

  const { setUser } = props.user;

  useEffect(() => {
    async function getUser() {
      const user = await auth.getCurrentUserObj();
      setUser(user);
    }
    getUser();
    toast.success("Logged in!");
  }, []);

  return <Navigate to="/" replace />;
}

export default LogIn;
