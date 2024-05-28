import { memo } from 'react';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';

import { LoginForm } from '@/features/Login';
import { Logo } from '@/shared/ui/Logo/Logo';
import { useAppSelector } from '@/shared/hooks/redux';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { isLogged } from '@/shared/util/isLogged';

import cls from './LoginPage.module.scss';

export const LoginPage = memo(() => {
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.loginForm);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isLogged()) {
    return <Navigate to="/main" replace />;
  }

  return (
    <main className={cls.loginPage}>
      <div className={cls.background} />
      <Logo className={cls.logo} left />
      <div className={cls.card}>
        <LoginForm onSuccess={() => navigate('/')} />
      </div>
    </main>
  );
});
