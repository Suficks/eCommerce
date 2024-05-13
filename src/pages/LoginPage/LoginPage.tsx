import { memo } from 'react';

import Logo from '@/shared/assets/images/logo.svg';
import { LoginForm } from '@/features/Login';

import cls from './LoginPage.module.scss';

export const LoginPage = memo(() => {
  return (
    <main className={cls.loginPage}>
      <div className={cls.background} />
      <div className={cls.logo}>
        <Logo />
      </div>
      <div className={cls.card}>
        <LoginForm />
      </div>
    </main>
  );
});
