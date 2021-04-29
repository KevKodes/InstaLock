import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "../../index.css"


const NavBar = ({ setAuthenticated }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`/api/users/`).then(response => response.json().then(data=> {
      let usernameArray = []
      const names = Object.values(data)
      const userinfo = names[0]
      const supervalues = Object.values(userinfo)

      for(let i = 0; i < supervalues.length; i++){
        const valuepoint = Object.values(supervalues[i])
        usernameArray.push(valuepoint[5])
      }
      setUsers(usernameArray)

    }))
  }, [])


  let history = useHistory();
  const handleSubmit = (that) => {
    let drop = that.toLowerCase()
    let update = drop[0].toUpperCase() + drop.substring(1)
    if (users.includes(update)){
      return history.push(`/${update}`)
    }
    else {
      alert("user doesn't exist")
    }

  }
  const sessionUser = useSelector((state) => state?.session?.user);

  return (
    <nav className="liner">
      <div className="gif"></div>
      <Link to='/' className="link">
      <div className="title">InstaLock</div>
      </Link>
      <div className="search">
        <form action="" method="get">
          <label htmlFor="header-search">
            <span className="visually-hidden"></span>
          </label>
          <input
            className="hidden2"
            type="text"
            id="header-search"
            placeholder="Search"

          />
          <button className="hidden" type="submit" onClick={() => handleSubmit(document.getElementById('header-search').value)} ></button>
        </form>
      </div>
      <ul id="nav">
        <li>
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
