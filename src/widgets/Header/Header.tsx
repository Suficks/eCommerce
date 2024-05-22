import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { AiOutlineClose, AiOutlineIdcard, AiOutlineMenu } from 'react-icons/ai';
import { FaCartShopping, FaUser, FaUserPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import { userActions } from '@/entities/User';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { useAppDispatch } from '@/shared/hooks/redux';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Button } from '@/shared/ui/button/button';

import { Logo } from '@/shared/ui/Logo/Logo';
import cls from './Header.module.scss';

export const Header = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const dispatch = useAppDispatch();

  const logOut = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.USER);
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageKeys.VERSION);
    dispatch(userActions.logout());
  }, [dispatch]);

  const setControls = () => {
    const login = localStorage.getItem(LocalStorageKeys.USER) || false;
    return (
      <div className={cls.button__wrapper}>
        {login ? (
          <Button
            text="Logout"
            className={cls.header__button}
            onClick={() => {
              logOut();
              navigate('/login');
            }}
          />
        ) : (
          false
        )}
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
        <AppLink
          to={Routes.REGISTRATION}
          className={classNames(cls.icon, cls.mobile__visible)}
        >
          <AiOutlineIdcard size={30} />
        </AppLink>
        <AppLink to={Routes.PROFILE} className={cls.icon}>
          <FaUser size={25} />
        </AppLink>
      </div>
    );
  }; // change to normal function, when we will have isLogged state
  return (
    <header className={cls.header}>
      <div className={cls.header__wrapper}>
        <Logo className={cls.logo} />
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
          {setControls()}
          <AppLink to="/cart" className={cls.icon}>
            <FaCartShopping size={25} />
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
