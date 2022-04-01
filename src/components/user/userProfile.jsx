import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";

function UserProfile(props) {
  const [user, setUser] = useState(auth.getCurrentUserObj());

  useEffect(async () => {}, []);

  return (
    <div>
      <h2>User Profile:</h2>
      <ul>
        <li>User ID:{user.id}</li>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
      </ul>
      <button>Reload Datas</button>
      <br />
      <hr />
      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </div>
  );
}

export default UserProfile;
