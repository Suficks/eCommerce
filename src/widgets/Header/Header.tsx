import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaCartShopping, FaUser, FaUserPlus } from 'react-icons/fa6';
import { useCallback, useState } from 'react';
import classNames from 'classnames';

import { Button } from '@/shared/ui/button/button';
import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import Logo from '@/shared/assets/images/headerLogo.png';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/redux';

import cls from './Header.module.scss';

export const Header = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const dispatch = useAppDispatch();

  const exit = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('version');
    dispatch(userActions.logout());
  }, [dispatch]);

  const isLogged = () => {
    const login = false;
    if (!login) {
      return (
        <div className={cls.button__wrapper}>
          <Button
            text="Login"
            className={`${cls.header__button} ${cls.mobile__hidden}`}
            onClick={() => {
              navigate('/login');
            }}
          />
          <Button
            text="Registration"
            className={`${cls.header__button} ${cls.mobile__hidden}`}
            onClick={() => {
              navigate('/registration');
            }}
          />
          <AppLink
            to={Routes.LOGIN}
            className={classNames(cls.icon, cls.mobile__visible)}
          >
            <FaUserPlus size={30} />
          </AppLink>
        </div>
      );
    }
    return (
      <div className={cls.button__wrapper}>
        <Button
          text="Logout"
          className={cls.header__button}
          onClick={() => {
            navigate('/login');
          }}
        />
        <AppLink to={Routes.PROFILE} className={cls.icon}>
          <FaUser size={30} />
        </AppLink>
      </div>
    );
  }; // change to normal function, when we will have isLogged state
  return (
    <header className={cls.header}>
      <div className={cls.header__wrapper}>
        <AppLink to="/main" className={cls.logo}>
          <img src={Logo} alt="Prakriti Logo" className={cls.logo__image} />
        </AppLink>
        <nav className={`${cls.nav} ${nav ? cls.active : null}`}>
          <ul className={cls.nav__list}>
            <li>
              <AppLink to={Routes.MAIN} className={cls.nav__link}>
                Home
              </AppLink>
            </li>
            <li>
              <AppLink to={Routes.CATALOG} className={cls.nav__link}>
                Catalog
              </AppLink>
            </li>
            <li>
              <AppLink to={Routes.ABOUT} className={cls.nav__link}>
                About
              </AppLink>
            </li>
          </ul>
        </nav>
        <div className={cls.controls}>
          {isLogged()}{' '}
          <AppLink to="/cart" className={cls.icon}>
            <FaCartShopping size={30} />
          </AppLink>
          {!nav ? (
            <AiOutlineMenu
              className={`${cls.icon} ${cls.burger__icon}`}
              size={30}
              onClick={() => {
                setNav(!nav);
                document.body.style.overflow = 'hidden';
              }}
            />
          ) : (
            <AiOutlineClose
              className={`${cls.icon} ${cls.burger__icon}`}
              size={30}
              onClick={() => {
                setNav(!nav);
                document.body.style.overflow = 'unset';
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
};
