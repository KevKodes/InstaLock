import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navigation/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DiscoveryFeed from "./components/DiscoveryFeed/index";
import { authenticate } from "./store/auth";
import Profile from "./components/Profile/index";
import PersonalFeed from "./components/PersonalFeed/index";
import Upload from "./components/Upload";
import * as sessionActions from "./store/auth";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(sessionActions.restoreUser());
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {authenticated && <NavBar setAuthenticated={setAuthenticated} />}

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
          path="/upload"
          exact={true}
          authenticated={authenticated}
        >
          <Upload />
        </ProtectedRoute>
        <ProtectedRoute
          path="/:userName"
          exact={true}
          authenticated={authenticated}
        >
          <Profile />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
