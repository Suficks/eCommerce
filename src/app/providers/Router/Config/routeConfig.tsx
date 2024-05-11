import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { AppRoutesProps } from '@/shared/types/router';
import { LoginPage } from '@/pages/LoginPage/LoginPage';

import {
  AppRoutes,
  getRouteLogin,
  getRouteRegistration,
} from '@/shared/const/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
  },
  [AppRoutes.REGISTRATION]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
  },
  [AppRoutes.MAIN]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
  },
  [AppRoutes.CATALOG]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
  },
  [AppRoutes.BASKET]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
  },
  [AppRoutes.ABOUT]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
  },
};
