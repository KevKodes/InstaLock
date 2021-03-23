import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const NavBar = ({ setAuthenticated, userName }) => {
  return (
    <nav className="liner">
      <div className="gif"></div>
      <ul id="nav">
        <li>

          {/* Added className navIcon */}
          <NavLink id="ez" to="/discoveryfeed" exact={true} className="navIcon" activeClassName="active"></NavLink>
        </li>
        <li>
          {/* Added className navIcon */}
          <NavLink id="ez2" to="/" exact={true} className="navIcon" activeClassName="active">

          </NavLink>
        </li>
        <li>
          {/* Added className navIcon */}
          <NavLink id="ez3" to="/login" exact={true} className="navIcon" activeClassName="active">

          </NavLink>
        </li>
        <li>
          {/* Added className navIcon */}
          <NavLink id="ez4" to="/signup" exact={true} className="navIcon" activeClassName="active">

          </NavLink>
        </li>
        <li>

          {/* Added className navIcon*/}
          <NavLink id="ez5" to={`/${userName}`} exact={true} className="navIcon" activeClassName="active">

          </NavLink>
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
