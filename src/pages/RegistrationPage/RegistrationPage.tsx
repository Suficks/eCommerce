import { memo } from 'react';
import { useNavigate } from 'react-router';

import { Navigate } from 'react-router-dom';

import { RegistrationFormUser } from '@/features/Registration/ui/RegistrationFormUser';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './RegistrationPage.module.scss';

import { Logo } from '@/shared/ui/Logo/Logo';
import { isLogged } from '@/shared/util/isLogged';

export const RegistrationPage = memo(() => {
  const navigate = useNavigate();
  if (isLogged()) {
    return <Navigate to="/main" replace />;
  }
  return (
    <main className={cls.registrationPage}>
      <Logo left />
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
