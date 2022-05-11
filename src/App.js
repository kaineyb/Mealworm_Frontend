// React
import { Container } from "@chakra-ui/react";
import React, { Component, Fragment } from "react";
// 3rd Party
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/footer";
// Top Level Components
import NavBar from "./components/navBar/navBar";
import RouteList from "./components/routes";
import DataContext from "./context/dataContext";
// Contexts
import UserContext from "./context/userContext";
// This needs to be imported at some level to get the JWT Token in Browser
import auth from "./services/authService";
// config
import config from "./services/config.json";
import dataService from "./services/dataService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedIn: false,
      data: {},
    };
  }

  async componentDidMount() {
    document.title = config.siteName;
    console.log("App.js CDM - Fired");

    const loggedIn = await auth.loggedIn();

    const { data } = this.state;

    if (loggedIn && Object.keys(data).length === 0) {
      this.updateData();
    }

    if (loggedIn) {
      var user = await auth.getCurrentUserObj();
      this.setState({ loggedIn, user });
    }
  }

  updateData = async () => {
    const promise = await toast.promise(dataService.getAll(), {
      pending: "Getting data from server 🧐",
      success: "Got latest data from server 🥰",
      error: "Couldn't get data from server! 🤬",
    });

    this.setState({ data: promise });
  };

  clearData = () => {
    this.setState({ data: {} });
  };

  /**
   * Look ma, my first docstring in JS.
   * @param {String} property - the key or property of the object to replace
   * @param {Object} payload - the object to replace
   */
  setData = (property, payload) => {
    const newData = { ...this.state.data };

    newData[property] = payload;
    // console.log("setData", property, payload);

    this.setState({ data: newData });
  };

  // Arrow functions ftw lol
  toggleLoggedIn = () => {
    if (this.state.loggedIn) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
  };

  setUser = (user) => {
    this.setState({ user: { ...user } });
  };

  clearUser = () => {
    this.setState({ user: null });
  };

  render() {
    const userContextValue = {
      user: this.state.user,
      loggedIn: this.state.loggedIn,
      toggleLoggedIn: this.toggleLoggedIn,
      clearUser: this.clearUser,
      setUser: this.setUser,
    };

    const dataContextValue = {
      data: this.state.data,
      updateData: this.updateData,
      clearData: this.clearData,
      setData: this.setData,
    };

    return (
      <Fragment>
        <Container maxWidth="3xl">
          <DataContext.Provider value={dataContextValue}>
            <UserContext.Provider value={userContextValue}>
              <ToastContainer
                theme="dark"
                newestOnTop={true}
                position="bottom-right"
              />
              <NavBar />
              <main>
                <RouteList
                  loggedIn={this.state.loggedIn}
                  dataContextValue={dataContextValue}
                  userContextValue={userContextValue}
                />
              </main>
              <Footer />
            </UserContext.Provider>
          </DataContext.Provider>
        </Container>
      </Fragment>
    );
  }
}

export default App;
