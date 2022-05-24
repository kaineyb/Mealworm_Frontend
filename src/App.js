// React
import { Container } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
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
import auth from "./services/authService";
// config
import config from "./services/config.json";
import dataService from "./services/dataService";

function App(props) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mainData, setMainData] = useState({});

  useEffect(() => {
    document.title = config.siteName;
    console.log("App.js Fired");
  }, []);

  useEffect(() => {
    async function setAuth() {
      const loggedIn = await auth.loggedIn();

      if (loggedIn) {
        var user = await auth.getCurrentUserObj();
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
        setUser({});
      }
    }
    setAuth();
  }, []);

  useEffect(() => {
    if (loggedIn && Object.keys(mainData).length === 0) {
      updateData();
    }
  }, [loggedIn]);

  const updateData = async () => {
    const promise = await toast.promise(dataService.getAll(), {
      pending: "Getting data from server 🧐",
      success: "Got latest data from server 🥰",
      error: "Couldn't get data from server! 🤬",
    });

    setMainData(promise);
  };

  const clearData = () => {
    setMainData({});
  };

  const setData = (property, payload) => {
    const newData = { ...mainData };

    newData[property] = payload;

    setData(newData);
  };

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  const clearUser = () => {
    setUser(null);
  };

  const userContextValue = {
    user,
    loggedIn,
    toggleLoggedIn,
    clearUser,
    setUser,
  };

  const dataContextValue = {
    data: mainData,
    updateData,
    clearData,
    setData,
  };

  return (
    <Fragment>
      <Container maxWidth="container.md">
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
                loggedIn={loggedIn}
                dataContextValue={dataContextValue}
                userContextValue={userContextValue}
              />
            </main>
          </UserContext.Provider>
        </DataContext.Provider>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default App;
