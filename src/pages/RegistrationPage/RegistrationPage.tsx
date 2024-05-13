import { memo } from 'react';

import { Link } from 'react-router-dom';
import Logo from '@/shared/assets/images/logo.svg';

import cls from './RegistrationPage.module.scss';
import { RegistrationFormUser } from '@/features/Registration/ui/RegistrationFormUser';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

export const RegistrationPage = memo(() => {
  return (
    <main className={cls.registrationPage}>
      <Link to="/main" className={`${cls.link__image}`}>
        <Logo />
      </Link>
      <div className={cls.card}>
        <div>
          <h1 className={cls.title}>Registration</h1>
          <div className={cls.wrapper}>
            <h2 className={cls.subtitle}> Have an Account?</h2>
            <AppLink to="/login" text="Log in" className={cls.link} />
          </div>
        </div>
        <RegistrationFormUser />
      </div>
    </main>
  );
});
