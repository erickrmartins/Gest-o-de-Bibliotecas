import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavbarItem({ render, destino, label }) {
  const location = useLocation();
  const path = location.pathname;
  const isActive = path === destino;

  return render ? (
    <li className="nav-item">
      <Link
        to={destino}
        className={`nav-link ${isActive ? 'active' : ''}`}
      >
        {label}
      </Link>
    </li>
  ) : null;
}

export default NavbarItem;
