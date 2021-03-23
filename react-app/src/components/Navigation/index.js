import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const NavBar = ({ setAuthenticated, userName }) => {
  return (
    <nav className="liner">
      <div className="gif"></div>
      <ul id="nav">
        <li>
          <NavLink
            id="ez"
            to="/discoveryfeed"
            exact={true}
            activeClassName="active"
          ></NavLink>
        </li>
        <li>
          <NavLink
            id="ez2"
            to="/"
            exact={true}
            activeClassName="active"
          ></NavLink>
        </li>
        <li>
          <NavLink
            id="ez3"
            to="/login"
            exact={true}
            activeClassName="active"
          ></NavLink>
        </li>
        <li>
          <NavLink
            id="ez4"
            to="/signup"
            exact={true}
            activeClassName="active"
          ></NavLink>
        </li>
        <li>
          <NavLink
            id="ez5"
            to={`/${userName}`}
            exact={true}
            activeClassName="active"
          ></NavLink>
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
