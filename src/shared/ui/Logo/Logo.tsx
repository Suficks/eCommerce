import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import LogoSVG from '@/shared/assets/images/logo.svg';
import cls from './Logo.module.scss';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link to={Routes.MAIN} className={classNames(cls.logo, className)}>
      <LogoSVG />
    </Link>
  );
};
