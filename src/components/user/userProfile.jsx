import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../context/dataContext";
import auth from "../../services/authService";
import jwtService from "../../services/jwtService";

function UserProfile(props) {
  const [user, setUser] = useState({});
  const context = useContext(DataContext);

  const { access, refresh } = jwtService.getJwtTokens();

  const rT = jwtService.tokenTimeOut(refresh);
  const aT = jwtService.tokenTimeOut(access);

  // console.log("accessTime", aT);
  // console.log("refreshTime", rT);

  useEffect(() => {
    async function getUser() {
      const userInfo = await auth.getCurrentUserObj();
      setUser(userInfo);
    }
    getUser();
  }, []);

  function setStores() {
    const array1 = [
      { id: 99990, name: "Boris Johnson" },
      { id: 99991, name: "Kaine Bruce" },
      { id: 99992, name: "Lucy Clarke" },
    ];
    context.setData("stores", array1);
  }

  return (
    <div>
      <h2>User Profile:</h2>
      <ul>
        <li>User ID:{user.id}</li>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
      </ul>
      <button onClick={context.updateData}>Reload Data from Server</button>
      <br />
      <button onClick={setStores}>Set Stores to Faux Data</button>
      <br />
      <hr />
      <h2>Token Details:</h2>
      <strong>Access Token Time</strong>
      <br />
      {`${aT.hours} hours, ${aT.minutes} minutes, ${aT.seconds} seconds`}
      <br />
      <br />
      <strong>Refresh Token Time</strong>
      <br />
      {`${rT.hours} hours, ${rT.minutes} minutes, ${rT.seconds} seconds`}
      <hr />

      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </div>
  );
}

export default UserProfile;
