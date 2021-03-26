import React from "react";
import { useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "../../index.css"



const NavBar = ({ setAuthenticated }) => {
  const sessionUser = useSelector((state) => state?.session?.user);

  return (
    <nav className="liner">
      <div className="gif"></div>
      <Link to='/' className="link">
      <div className="title">InstaLock</div>
      </Link>
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
              to={`/${sessionUser?.userName}`}
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
            <span className="tooltiptext3">Logout</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
