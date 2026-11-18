import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavbarItem({ render, destino, label }) {
  const location = useLocation();
  const path = location.pathname;
  const isActive = path === destino;

  if (render) {
    return (
      <li className='nav-item'>
        <Link to={destino} className={`p-2 nav-link curvatura ${isActive ? "navbar-item-selected" : "navbar-item-new"}`}>
          {label}
        </Link>
      </li>
    );
  } else {
    return false;
  }
}

export default NavbarItem;