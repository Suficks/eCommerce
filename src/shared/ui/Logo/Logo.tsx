import { Link } from 'react-router-dom';

import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import LogoSVG from '@/shared/assets/images/logo.svg';
import cls from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link to={Routes.MAIN} className={cls.logo}>
      <LogoSVG />
    </Link>
  );
};
