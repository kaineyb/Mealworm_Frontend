import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./hero";
import NotFound from "./notFound";
import PrivateRoute from "./privateRoute";
// Shopping Components
import Ingredients from "./shopping/ingredients/ingredients";
import Meals from "./shopping/meals/meals";
import Plans from "./shopping/plans/plans";
import Recipes from "./shopping/recipes/recipes";
import Schedule from "./shopping/schedule/schedule";
import Sections from "./shopping/sections";
import ShoppingList from "./shopping/shoppingList/shoppingList";
import Stores from "./shopping/stores/stores";
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
        path="/logout"
        element={<LogOut user={userContextValue} data={dataContextValue} />}
      />
      <Route
        path="/register"
        element={<RegisterForm loggedIn={loggedIn} user={userContextValue} />}
      />
      <Route
        path="/stores"
        element={
          <PrivateRoute>
            <Stores />
          </PrivateRoute>
        }
      />
      <Route
        path="/sections"
        element={
          <PrivateRoute>
            <Sections />
          </PrivateRoute>
        }
      />
      <Route
        path="/ingredients"
        element={
          <PrivateRoute>
            <Ingredients />
          </PrivateRoute>
        }
      />
      <Route
        path="/meals"
        element={
          <PrivateRoute>
            <Meals />
          </PrivateRoute>
        }
      />
      <Route
        path="/plans"
        element={
          <PrivateRoute>
            <Plans />
          </PrivateRoute>
        }
      />

      <Route
        path="plan/:plan_id/shopping-list"
        element={
          <PrivateRoute>
            <ShoppingList />
          </PrivateRoute>
        }
      />
      <Route
        path="plan/:plan_id/schedule"
        element={
          <PrivateRoute>
            <Schedule />
          </PrivateRoute>
        }
      />
      <Route
        path="plan/:plan_id/recipes"
        element={
          <PrivateRoute>
            <Recipes />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteList;
