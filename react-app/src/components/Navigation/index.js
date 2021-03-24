import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./Navigation.css";

const NavBar = ({ setAuthenticated, userName }) => {
  return (
    <nav className="liner">
      <div className="gif"></div>
      <div className="title">InstaLock</div>
      <div className="search">
        <form action="/" method="get">
          <label htmlFor="header-search">
            <span className="visually-hidden"></span>
          </label>
          <input
            className="hidden2"
            type="text"
            id="header-search"
            placeholder="Search"
            name="s"
          />
          <button className="hidden" type="submit"></button>
        </form>
      </div>
      <ul id="nav">
        <li>
          {/* Added className navIcon */}
          <div className="tooltip">
            <NavLink
              id="ez"
              to="/discoveryfeed"
              exact={true}
              className="navIcon"
              activeClassName="active"
            ></NavLink>
            <span className="tooltiptext">Explore</span>
          </div>
        </li>
        <li>
          {/* Added className navIcon */}
          <div className="tooltip">
            <NavLink
              id="ez2"
              to="/"
              exact={true}
              className="navIcon"
              activeClassName="active"
            ></NavLink>
            <span className="tooltiptext2">Home</span>
          </div>
        </li>
        <li>
          {/* Added className navIcon */}
          <div className="tooltip">
            <NavLink
              id="ez3"
              to="/upload"
              exact={true}
              className="navIcon"
              activeClassName="active"
            ></NavLink>
            <span className="tooltiptext2">Upload</span>
          </div>
        </li>
        <li>
          {/* Added className navIcon*/}
          <div className="tooltip">
            <NavLink
              id="ez5"
              to={`/${userName}`}
              exact={true}
              className="navIcon"
              activeClassName="active"
            ></NavLink>
            <span className="tooltiptext2">Profile</span>
          </div>
        </li>
        <li>
          <div className="tooltip">
            <LogoutButton setAuthenticated={setAuthenticated} />
            <span className="tooltiptext">Logout</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
