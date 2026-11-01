import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getSession, clearSession } from '../../session';
import './Navbar.css';

const logo = `${import.meta.env.BASE_URL}favicon.svg`;

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getSession());
  const [menuOpen, setMenuOpen] = useState(false);

  // Re-read the session whenever Login / Sign Up / Logout change it.
  useEffect(() => {
    const sync = () => setUser(getSession());
    window.addEventListener('sessionchange', sync);
    return () => window.removeEventListener('sessionchange', sync);
  }, []);

  // Logout: drop the auth token and user details, clear booked appointments,
  // then send the visitor back to the landing page.
  const handleLogout = () => {
    clearSession();
    localStorage.removeItem('appointments');
    localStorage.removeItem('reviews');
    window.dispatchEvent(new Event('appointmentschange'));
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <img src={logo} alt="StayHealthy logo" />
          StayHealthy
        </Link>

        <button
          className="navbar__toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          &#9776;
        </button>

        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li className="navbar__dropdown">
            <button type="button" className="navbar__drop-toggle">Appointments &#9662;</button>
            <ul className="navbar__menu">
              <li><Link to="/instant-consultation" onClick={closeMenu}>Instant Consultation</Link></li>
              <li><Link to="/booking-consultation" onClick={closeMenu}>Book an Appointment</Link></li>
            </ul>
          </li>
          <li><NavLink to="/health-blog" onClick={closeMenu}>Health Blog</NavLink></li>
          <li><NavLink to="/reviews" onClick={closeMenu}>Reviews</NavLink></li>

          {user ? (
            <>
              <li className="navbar__dropdown">
                <button type="button" className="navbar__drop-toggle navbar__welcome">
                  Welcome, {user.name.split(' ')[0]} &#9662;
                </button>
                <ul className="navbar__menu navbar__menu--right">
                  <li><Link to="/profile" onClick={closeMenu}>Your Profile</Link></li>
                  <li><Link to="/reports" onClick={closeMenu}>Your Reports</Link></li>
                </ul>
              </li>
              <li>
                <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/signup" className="btn btn-outline btn-sm" onClick={closeMenu}>Sign Up</Link></li>
              <li><Link to="/login" className="btn btn-sm" onClick={closeMenu}>Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
