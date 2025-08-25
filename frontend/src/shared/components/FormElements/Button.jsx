import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  href,
  to,
  size = 'default',
  inverse,
  danger,
  type = 'button',
  onClick,
  disabled,
  children
}) {
  const classNames = [
    'button',
    `button--${size}`,
    inverse ? 'button--inverse' : '',
    danger ? 'button--danger' : ''
  ].join(' ').trim();

  if (href) {
    return (
      <a className={classNames} href={href}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
