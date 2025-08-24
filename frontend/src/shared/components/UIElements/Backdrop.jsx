import { createPortal } from 'react-dom';

import './Backdrop.css';

export default function Backdrop({ onClick }) {
    const backdropHook = document.getElementById('backdrop-hook');
    if(!backdropHook) return null;

    return createPortal(<div className='backdrop' onClick={onClick}></div>, backdropHook)
}