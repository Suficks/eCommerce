import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { ReactNode } from 'react';

import cls from './AppLink.module.scss';

interface AppLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const AppLink = ({ to, children, className = '' }: AppLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(cls.AppLink, { [cls.active]: isActive }, className)
      }
    >
      {children}
    </NavLink>
  );
};
