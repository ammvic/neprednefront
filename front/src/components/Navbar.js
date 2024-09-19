import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './nav.css';
import { UserContext } from '../contexts/UserContext'; // Pretpostavka da već koristiš UserContext

const Navbar = () => {
  const { user, employee } = useContext(UserContext); // Dodajemo employee uz user

  console.log('Current user in Navbar:', user); // Za debagovanje
  console.log('Current employee in Navbar:', employee); // Za debagovanje

  return (
    <nav className="navbar">
      <div className="navbar-item" id="navbar-logo">
        <NavLink to="/home">
          <img className="logo" src="./mielle_logo.jpeg" alt="logo" />
        </NavLink>
      </div>

      <div className="navbar-item" id="navbar-links">
        {/* Ako postoji user, prikazujemo user-ove linkove */}
        {user && (
          <>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/booking">Booking</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
          </>
        )}
        
        {/* Ako postoji employee, prikazujemo linkove za zaposlenog */}
        {employee && (
  <>
    {employee.role === 'Administrator' ? (
      <NavLink to="/employeeDash">Dashboard</NavLink>
    ) : (
      <>
        <NavLink to="/employeeDash">Dashboard</NavLink>
        <NavLink to="/upload-photo">Manage Media</NavLink>
      </>
    )}
  </>
)}

      </div>

      <div className="navbar-item" id="navbar-auth">
        {/* Ako nema user-a i employee-a, prikazujemo linkove za login/registraciju */}
        {!user && !employee && (
          <>
            <NavLink to="/login">Login</NavLink>
            <Link to="/register" className="auth-button">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
