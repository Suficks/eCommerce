import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import LogoSVG from '@/shared/assets/images/logo.svg';
import cls from './Logo.module.scss';

interface LogoProps {
  className?: string;
  left?: boolean;
}

export const Logo = ({ className, left }: LogoProps) => {
  return (
    <Link
      to={Routes.MAIN}
      className={classNames(cls.logo, { [cls.left]: left }, className)}
    >
      <LogoSVG />
    </Link>
  );
};
