import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../services/auth";
import './LogIn.css'

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form">
      <form onSubmit={onLogin}>
        <h1>Photohaven</h1>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="signup-link-box">
        <div className="signup-link-text">
        Don't have an account?
          <NavLink to="/signup">
            Sign up
          </NavLink>
        </div>
        </div>
    </div>
  );
};

export default LoginForm;
