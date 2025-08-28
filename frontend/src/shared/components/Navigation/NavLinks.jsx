import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import './NavLinks.css';

export default function NavLinks() {
  const authContext = useContext(AuthContext);

  const navLinkClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <ul className='nav-links'>
      {/* Public Link */}
      <li>
        <NavLink to="/" className={navLinkClass} end>
          ALL USERS
        </NavLink>
      </li>

      {/* Links visible only when logged in */}
      {authContext.isLoggedIn && (
        <>
          <li>
            <NavLink to="/u1/places" className={navLinkClass}>
              MY PLACES
            </NavLink>
          </li>
          <li>
            <NavLink to="/places/new" className={navLinkClass}>
              ADD PLACES
            </NavLink>
          </li>
          <li>
            <button onClick={authContext.logout}>
              LOGOUT
            </button>
          </li>
        </>
      )}

      {/* Link visible only when NOT logged in */}
      {!authContext.isLoggedIn && (
        <li>
          <NavLink to="/auth" className={navLinkClass}>
            AUTHENTICATE
          </NavLink>
        </li>
      )}
    </ul>
  );
}
