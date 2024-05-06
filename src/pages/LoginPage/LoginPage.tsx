import Logo from '../../shared/assets/images/logo.svg';
import Modal from '../../shared/ui/Modal/Modal';
import AuthBackground from '../../shared/assets/images/auth_background.webp';
import cls from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <main className={cls.main}>
      <img className={cls.background} src={AuthBackground} alt="background" />
      <Logo />
      <Modal>hello</Modal>
    </main>
  );
};
