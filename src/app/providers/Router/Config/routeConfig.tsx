import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { AppRoutesProps } from '@/shared/types/router';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { NotFound } from '@/pages/NotFound/NotFound';

export enum AppRoutes {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  MAIN = 'main',
  CATALOG = 'catalog',
  PROFILE = 'profile',
  BASKET = 'basket',
  ABOUT = 'about',
  BASE = 'base',
  NOT_FOUND = 'notFound',
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.LOGIN]: {
    path: `/login`,
    element: <LoginPage />,
  },
  [AppRoutes.REGISTRATION]: {
    path: `/registration`,
    element: <RegistrationPage />,
  },
  [AppRoutes.MAIN]: {
    path: `/main`,
    element: <RegistrationPage />,
  },
  [AppRoutes.CATALOG]: {
    path: `/catalog`,
    element: <RegistrationPage />,
  },
  [AppRoutes.PROFILE]: {
    path: `/profile`,
    element: <RegistrationPage />,
  },
  [AppRoutes.BASKET]: {
    path: `/basket`,
    element: <RegistrationPage />,
  },
  [AppRoutes.ABOUT]: {
    path: `/about`,
    element: <RegistrationPage />,
  },
  [AppRoutes.BASE]: {
    path: '/',
    element: <LoginPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: `/*`,
    element: <NotFound />,
  },
};
