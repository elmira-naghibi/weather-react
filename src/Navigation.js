import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./Navigation.css";
import "./App.css";

export default function Navigation() {
  return (
    <header className="App-header">
      <ul className="navigation-items">
        <li className="navigation-item">
          <Link to="/">Lisbon</Link>
        </li>
        <li className="navigation-item">
          <Link to="/paris">Paris</Link>
        </li>
        <li className="navigation-item">
          <Link to="/sydney">Sydney</Link>
        </li>
        <li className="navigation-item">
          <Link to="/san-francisco">San Francisco</Link>
        </li>
      </ul>
      <Outlet />
    </header>
  );
}
