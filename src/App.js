// React
import React, { Fragment, Component } from "react";

// 3rd Party
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This needs to be imported at some level to get the JWT Token in Browser
import auth, { loggedIn } from "./services/authService";

// Contexts
import UserContext from "./context/userContext";

// Top Level Components
import NotFound from "./components/notFound";
import NavBar from "./components/navBar/navBar";
import Hero from "./components/hero";

// User Components
import LoginForm from "./components/user/forms/loginForm";
import RegisterForm from "./components/user/forms/registerForm";
import LogOut from "./components/user/actions/logOut";
import UserProfile from "./components/user/userProfile";

// Shopping Components
import Meals from "./components/shopping/meals";
import Ingredients from "./components/shopping/ingredients";
import Stores from "./components/shopping/stores";
import Sections from "./components/shopping/sections";
import Plans from "./components/shopping/plans";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...auth.getCurrentUserObj() },
      loggedIn: auth.loggedIn(),
      data: {
        stores: {},
        sections: {},
        plans: {},
        ingredients: {},
        meals: {},
      },
    };
  }

  // Arrow functions ftw lol
  toggleLoggedIn = () => {
    if (this.state.loggedIn) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
  };

  setUser = (user) => {
    const newUser = { ...user };
    this.setState({ user: { ...user } });
    console.log("Received:", user);
    console.log("App User Set to:");
    console.log(this.state.user);
  };

  clearUser = () => {
    this.setState({ user: {} });
    console.log("App User Cleared!");
  };

  render() {
    const userContextValue = {
      user: this.state.user,
      loggedIn: this.state.loggedIn,
      toggleLoggedIn: this.toggleLoggedIn,
      clearUser: this.clearUser,
      setUser: this.setUser,
    };
    return (
      <Fragment>
        <UserContext.Provider value={userContextValue}>
          <ToastContainer
            theme="dark"
            newestOnTop={true}
            position="bottom-right"
          />
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route
                path="/login"
                element={<LoginForm loggedIn={this.state.loggedIn} />}
              />
              <Route path="/stores" element={<Stores />} />
              <Route path="/sections" element={<Sections />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/meals" element={<Meals />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </UserContext.Provider>
      </Fragment>
    );
  }
}

export default App;
