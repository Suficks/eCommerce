import Logo from '@/shared/assets/images/logo.svg';
import AuthBackground from '@/shared/assets/images/auth_background.webp';
import { LoginFrom } from '@/features/Login/ui/LoginForm';

import cls from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <main className={cls.main}>
      <img className={cls.background} src={AuthBackground} alt="background" />
      <Logo />
      <div className={cls.Card}>
        <LoginFrom />
      </div>
    </main>
  );
};
