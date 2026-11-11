import React from 'react';
import { Link } from 'react-router-dom';

function NavbarItem({ render, destino, label }) {
  const location = window.location.pathname;
  const isActive = location === destino;

  if (render) {
    return (
      <li className='nav-item'>
        <Link to={destino} className={`p-2 nav-link curvatura border ${isActive ? "active" : undefined}`}>
          {label}
        </Link>
      </li>
    );
  } else {
    return false;
  }
}

export default NavbarItem;