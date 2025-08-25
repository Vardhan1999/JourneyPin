import './NavLinks.css';
import { NavLink } from 'react-router-dom';

export default function NavLinks() {
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to="/u1/places" className={({ isActive }) => isActive ? 'active' : ''}>MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/places/new" className={({ isActive }) => isActive ? 'active' : ''}>ADD PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/auth" className={({ isActive }) => isActive ? 'active' : ''}>AUTHENTICATE</NavLink>
            </li>
        </ul>
    )
}