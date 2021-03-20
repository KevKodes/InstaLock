import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navigation/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/Userlist";
import User from "./components/User/index";
import DiscoveryFeed from "./components/DiscoveryFeed/index";
import { authenticate } from "./store/auth";
import Profile from "./components/Profile/index";
import PersonalFeed from "./components/PersonalFeed/index";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        {/* <ProtectedRoute
          path="/users"
          exact={true}
          authenticated={authenticated}
        >
          <UsersList />
        </ProtectedRoute> */}
        <ProtectedRoute
          path="/users/:userId"
          exact={true}
          authenticated={authenticated}
        >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <PersonalFeed />
        </ProtectedRoute>
        <ProtectedRoute
          path="/discoveryfeed"
          exact={true}
          authenticated={authenticated}
        >
          <DiscoveryFeed />
        </ProtectedRoute>
        <ProtectedRoute
          path="/:userName"
          exact={true}
          authenticated={authenticated}
        >
          <Profile />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
