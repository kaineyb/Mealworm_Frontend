import React from "react";
import { Route, Routes } from "react-router-dom";
import http from "../services/httpService";
import Hero from "./hero";
import NotFound from "./notFound";
// Components
import SimpleForm from "./shopping/component/simpleForm";
// Shopping Components
import Ingredients from "./shopping/ingredients/ingredients";
import Meals from "./shopping/meals/meals";
import Plans from "./shopping/plans/plans";
import Recipes from "./shopping/recipes/recipes";
import Schedule from "./shopping/schedule/schedule";
import ShoppingList from "./shopping/shoppingList/shoppingList";
import LogOut from "./user/actions/logOut";
// User Components
import LoginForm from "./user/forms/loginForm";
import RegisterForm from "./user/forms/registerForm";
import UserProfile from "./user/userProfile";

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

      <Route path="plan/:plan_id/shopping-list" element={<ShoppingList />} />
      <Route path="plan/:plan_id/schedule" element={<Schedule />} />
      <Route path="plan/:plan_id/recipes" element={<Recipes />} />

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
