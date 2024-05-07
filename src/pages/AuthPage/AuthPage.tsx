import Logo from '../../shared/assets/images/logo.svg';
import AuthBackground from '../../shared/assets/images/auth_background.webp';

import cls from './AuthPage.module.scss';

export const AuthPage = () => {
  return (
    <main className={cls.main}>
      <img className={cls.background} src={AuthBackground} alt="background" />
      <Logo />
      <div className={cls.Card} />
    </main>
  );
};
