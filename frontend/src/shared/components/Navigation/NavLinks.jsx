import './NavLinks.css';
import { NavLink } from 'react-router-dom';

export default function NavLinks() {
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to="/">ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to="/ui/places">MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">ADD PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
        </ul>
    )
}