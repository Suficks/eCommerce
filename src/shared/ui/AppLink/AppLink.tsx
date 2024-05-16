import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import cls from './AppLink.module.scss';

interface AppLinkProps {
  to: string;
  text: string;
  className?: string;
}

export const AppLink = ({ to, text, className = '' }: AppLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(cls.AppLink, { [cls.active]: isActive }, className)
      }
    >
      {text}
    </NavLink>
  );
};
