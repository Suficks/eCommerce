import { Link } from 'react-router-dom';
import classNames from 'classnames';

import cls from './AppLink.module.scss';

interface AppLinkProps {
  to: string;
  text: string;
  className?: string;
}

export const AppLink = ({ to, text, className = '' }: AppLinkProps) => {
  return (
    <Link to={to} className={classNames(cls.AppLink, className)}>
      {text}
    </Link>
  );
};
