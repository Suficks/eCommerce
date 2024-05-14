import { memo } from 'react';

import Logo from '@/shared/assets/images/logo.svg';
import { LoginForm } from '@/features/Login';
import { Icon } from '@/shared/ui/Icon/Icon';

import cls from './LoginPage.module.scss';

export const LoginPage = memo(() => {
  return (
    <main className={cls.loginPage}>
      <div className={cls.background} />
      <Icon Svg={Logo} className={cls.logo} />
      <div className={cls.card}>
        <LoginForm />
      </div>
    </main>
  );
});
