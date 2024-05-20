import { memo } from 'react';
import { useNavigate } from 'react-router';

import { Link, Navigate } from 'react-router-dom';
import Logo from '@/shared/assets/images/logo.svg';
import { LoginForm } from '@/features/Login';
import { Icon } from '@/shared/ui/Icon/Icon';

import cls from './LoginPage.module.scss';
import { isLogged } from '@/shared/util/isLogged';

export const LoginPage = memo(() => {
  const navigate = useNavigate();
  if (isLogged()) {
    return <Navigate to="/main" replace />;
  }
  return (
    <main className={cls.loginPage}>
      <Link to="/main" className={`${cls.link__image}`}>
        <Logo />
      </Link>
      <div className={cls.background} />
      <div className={cls.card}>
        <LoginForm onSuccess={() => navigate('/')} />
      </div>
    </main>
  );
});
