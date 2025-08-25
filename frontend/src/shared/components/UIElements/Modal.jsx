import { useRef } from 'react';
import './Modal.css';
import Backdrop from './Backdrop';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';

function ModalOverlay({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer
}) {
  const content = (
    <div className={`modal ${className || ''}`} style={style}>
      <header className={`modal__header ${headerClass || ''}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${contentClass || ''}`}>
          {children}
        </div>
        <footer className={`modal__footer ${footerClass || ''}`}>
          {footer}
        </footer>
      </form>
    </div>
  );

  return createPortal(content, document.getElementById('modal-hook'));
}

export default function Modal({ show, onCancel, ...props }) {
  const nodeRef = useRef(null);

  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <ModalOverlay {...props} />
        </div>
      </CSSTransition>
    </>
  );
}
