import React from "react";
import { Route, Routes } from "react-router-dom";

import http from "../services/httpService";

// Components
import SimpleForm from "./shopping/component/simpleForm";
import NotFound from "./notFound";
import Hero from "./hero";

// User Components
import LoginForm from "./user/forms/loginForm";
import RegisterForm from "./user/forms/registerForm";
import LogOut from "./user/actions/logOut";
import UserProfile from "./user/userProfile";

// Shopping Components
import Meals from "./shopping/meals";
import Ingredients from "./shopping/ingredients";
import Plans from "./shopping/plans";

function RouteList(props) {
  const { loggedIn, userContextValue, dataContextValue } = props;
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route
        path="/login"
        element={<LoginForm loggedIn={loggedIn} user={userContextValue} />}
      />
      <Route
        path="/stores"
        element={
          <SimpleForm
            name="stores"
            singularTitle="Store"
            pluralTitle="Stores"
            endpoint={http.storesEP}
          />
        }
      />
      <Route
        path="/sections"
        element={
          <SimpleForm
            name="sections"
            singularTitle="Section"
            pluralTitle="Sections"
            endpoint={http.sectionsEP}
          />
        }
      />
      <Route path="/plans" element={<Plans />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route
        path="/logout"
        element={<LogOut user={userContextValue} data={dataContextValue} />}
      />
      <Route
        path="/register"
        element={<RegisterForm loggedIn={loggedIn} user={userContextValue} />}
      />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteList;
