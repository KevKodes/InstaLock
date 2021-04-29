import React from "react";
import { useSelector } from 'react-redux';
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "../../index.css"


const NavBar = ({ setAuthenticated }) => {

  let history = useHistory();
  const handleSubmit = (that) => {
    const nameList = [
      "Aatrox",
      "Ahri",
      "Akali",
      "Alistar",
      "Amumu",
      "Anivia",
      "Annie",
      "Aphelios",
      "Ashe",
      "Aurelion-Sol",
      "Azir",
      "Bard",
      "Blitzcrank",
      "Brand",
      "Braum",
      "Caitlyn",
      "Camille",
      "Cassiopeia",
      "Cho'Gath",
      "Corki",
      "Darius",
      "Diana",
      "Dr.Mundo",
      "Draven",
      "Ekko",
      "Elise",
      "Evelynn",
      "Ezreal",
      "Fiddlesticks",
      "Fiora",
      "Fizz",
      "Galio",
      "Gangplank",
      "Garen",
      "Gnar",
      "Gragas",
      "Graves",
      "Hecarim",
      "Heimerdinger",
      "Illaoi",
      "Irelia",
      "Ivern",
      "Janna",
      "JarvanIV",
      "Jax",
      "Jayce",
      "Jhin",
      "Jinx",
      "Kai'Sa",
      "Kalista",
      "Karma",
      "Karthus",
      "Kassadin",
      "Katarina",
      "Kayle",
      "Kayn",
      "Kennen",
      "Kha'Zix",
      "Kindred",
      "Kled",
      "Kog'Maw",
      "LeBlanc",
      "Lee-Sin",
      "Leona",
      "Lillia",
      "Lissandra",
      "Lucian",
      "Lulu",
      "Lux",
      "Malphite",
      "Malzahar",
      "Maokai",
      "Master Yi",
      "Miss Fortune",
      "Mordekaiser",
      "Morgana",
      "Nami",
      "Nasus",
      "Nautilus",
      "Neeko",
      "Nidalee",
      "Nocturne",
      "Nunu",
      "Olaf",
      "Orianna",
      "Ornn",
      "Pantheon",
      "Poppy",
      "Pyke",
      "Qiyana",
      "Quinn",
      "Rakan",
      "Rammus",
      "Rek'Sai",
      "Rell",
      "Renekton",
      "Rengar",
      "Riven",
      "Rumble",
      "Ryze",
      "Samira",
      "Sejuani",
      "Senna",
      "Seraphine",
      "Sett",
      "Shaco",
      "Shen",
      "Shyvana",
      "Singed",
      "Sion",
      "Sivir",
      "Skarner",
      "Sona",
      "Soraka",
      "Swain",
      "Sylas",
      "Syndra",
      "Tahm-Kench",
      "Taliyah",
      "Talon",
      "Taric",
      "Teemo",
      "Thresh",
      "Tristana",
      "Trundle",
      "Tryndamere",
      "Twisted Fate",
      "Twitch",
      "Udyr",
      "Urgot",
      "Varus",
      "Vayne",
      "Veigar",
      "Vel'Koz",
      "Vi",
      "Viktor",
      "Vladimir",
      "Volibear",
      "Warwick",
      "Wukong",
      "Xayah",
      "Xerath",
      "Xin-Zhao",
      "Yasuo",
      "Yone",
      "Yorick",
      "Yuumi",
      "Zac",
      "Zed",
      "Ziggs",
      "Zilean",
      "Zoe",
      "Zyra"

    ]
    let drop = that.toLowerCase()
    let update = drop[0].toUpperCase() + drop.substring(1)
    if (nameList.includes(update)){
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
