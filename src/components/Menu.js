import React from "react";
import { Link } from "react-router-dom";

const Menu = () => (
  <div className="main-div-menu">
    <Link to="/profile">
      <div className="indiv-menu">
        <p>Profile -</p>
      </div>
    </Link>
    <Link to="/favorite">
      <div className="indiv-menu">
        <p>Favorite -</p>
      </div>
    </Link>
    <Link to="/characters">
      <div className="indiv-menu">
        <p>Characters -</p>
      </div>
    </Link>
    <Link to="/comics">
      <div className="indiv-menu">
        <p>Comics -</p>
      </div>
    </Link>
    <Link to="/">
      <div className="indiv-menu" onClick={() => localStorage.clear()}>
        <p>Log out </p>
      </div>
    </Link>
  </div>
);

export default Menu;
