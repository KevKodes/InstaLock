import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { signUp, setUser } from "../../store/auth";
import { useDispatch } from "react-redux";
import "./index.css";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    const user = await signUp(username, firstName, lastName, email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setUser(user));
    }
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Big">
      <div className="flag1 flag"></div>
      <div className="flag2 flag"></div>
      <div className="signup-form">
        <form onSubmit={onSignUp}>
          <h1>InstaLock</h1>
          <h2>Sign up to see photos and videos from your friends.</h2>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </div>
          <div>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>
          <button type="submit">Sign up</button>
        </form>
        <div className="login-link-box">
          <div className="login-link-text">
            Have an account?&nbsp;
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              Log in
            </NavLink>
          </div>
        </div>
        <div className="banner1"></div>
      </div>
      <div className="flag3 flag"></div>
      <div className="flag4 flag"></div>
    </div>
  );
};

export default SignUpForm;
