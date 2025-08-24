import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

import './SideDrawer.css';

export default function SideDrawer({ children, show, onClick }) {
  const drawerHook = document.getElementById('drawer-hook');
  const nodeRef = useRef(null);

  if (!drawerHook) return null;

  return createPortal(
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside ref={nodeRef} className="side-drawer" onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>,
    drawerHook
  );
}
