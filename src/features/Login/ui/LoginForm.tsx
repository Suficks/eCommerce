import { AppLink } from '@/shared/ui/AppLink/AppLink';

import cls from './LoginForm.module.scss';

export const LoginForm = () => {
  return (
    <form className={cls.form}>
      <h1 className={cls.title}>Login</h1>
      <div className={cls.wrapper}>
        <h2 className={cls.subtitle}> Do not have an Account yet?</h2>
        <AppLink to="/registration" text="Sign Up" className={cls.link} />
      </div>
    </form>
  );
};
