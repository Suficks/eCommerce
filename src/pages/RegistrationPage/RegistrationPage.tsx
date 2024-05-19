import { memo } from 'react';
import { useNavigate } from 'react-router';

import { Link, Navigate } from 'react-router-dom';
import Logo from '@/shared/assets/images/logo.svg';

import cls from './RegistrationPage.module.scss';
import { RegistrationFormUser } from '@/features/Registration/ui/RegistrationFormUser';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

import { isLogged } from '@/shared/util/isLogged';

export const RegistrationPage = memo(() => {
  const navigate = useNavigate();
  if (isLogged()) {
    return <Navigate to="/main" replace />;
  }
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
            <AppLink to="/login" className={cls.link}>
              Log in
            </AppLink>
          </div>
        </div>
        <RegistrationFormUser onSuccess={() => navigate('/')} />
      </div>
    </main>
  );
});
