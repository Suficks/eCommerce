import { memo } from 'react';

import Logo from '@/shared/assets/images/logo.svg';

import cls from './RegistrationPage.module.scss';
import { RegistrationFormUser } from '@/features/Registration/ui/RegistrationFormUser';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

export const RegistrationPage = memo(() => {
  return (
    <main className={cls.loginPage}>
      <div className={cls.background} />
      <Logo />
      <div className={cls.card}>
        <div>
          <h1 className={cls.title}>Registration</h1>
          <div className={cls.wrapper}>
            <h2 className={cls.subtitle}> Have an Account?</h2>
            <AppLink to="/login" text="Sign In" className={cls.link} />
          </div>
        </div>
        <RegistrationFormUser />
      </div>
    </main>
  );
});
