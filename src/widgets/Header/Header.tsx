import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaCartShopping, FaUser, FaUserPlus } from 'react-icons/fa6';
import { useState } from 'react';
import classNames from 'classnames';
import cls from './Header.module.scss';
import { Button } from '@/shared/ui/button/button';
import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import Logo from '@/shared/assets/images/headerLogo.png';

export const Header = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

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
          <NavLink
            to={Routes.LOGIN}
            className={classNames(cls.icon, cls.mobile__visible)}
          >
            <FaUserPlus size={30} />
          </NavLink>
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
        <NavLink to={Routes.PROFILE} className={cls.icon}>
          <FaUser size={30} />
        </NavLink>
      </div>
    );
  }; // change to normal function, when we will have isLogged state
  return (
    <header className={cls.header}>
      <div className={cls.header__wrapper}>
        <NavLink to="/main" className={cls.logo}>
          <img src={Logo} alt="Prakriti Logo" className={cls.logo__image} />
        </NavLink>
        <nav className={`${cls.nav} ${nav ? cls.active : null}`}>
          <ul className={cls.nav__list}>
            <li>
              <NavLink to={Routes.MAIN} className={cls.nav__link}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={Routes.CATALOG} className={cls.nav__link}>
                Catalog
              </NavLink>
            </li>
            <li>
              <NavLink to={Routes.ABOUT} className={cls.nav__link}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={cls.controls}>
          {isLogged()}{' '}
          <NavLink to="/cart" className={cls.icon}>
            <FaCartShopping size={30} />
          </NavLink>
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