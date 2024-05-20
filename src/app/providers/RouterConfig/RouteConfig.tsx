import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { MainPage } from '@/pages/MainPage/MainPage';
import { NotFound } from '@/pages/NotFound/NotFound';
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';

export enum Routes {
  LOGIN = '/login',
  REGISTRATION = '/registration',
  MAIN = '/main',
  CATALOG = '/catalog',
  CATEGORY_ID = ':categoryId',
  PRODUCT_ID = ':productId',
  PROFILE = '/profile',
  CART = '/cart',
  ABOUT = '/about',
  ROOT = '/',
  NOT_FOUND = '/*',
}

type IndexRouteObjectWithPath = Exclude<
  IndexRouteObject,
  'path' | 'children'
> & {
  path: Routes;

  children?: RouteConfig[];
};

type NonIndexRouteObjectWithPath = Exclude<
  NonIndexRouteObject,
  'path' | 'children'
> & {
  path: Routes;

  children?: RouteConfig[];
};

type RouteConfig = NonIndexRouteObjectWithPath | IndexRouteObjectWithPath;

export const routeConfig: RouteConfig[] = [
  {
    path: Routes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: Routes.REGISTRATION,
    element: <RegistrationPage />,
  },
  {
    path: Routes.MAIN,
    element: <MainPage />,
  },
  {
    path: Routes.CATALOG,
    element: (
      <NotFound additionalMessage="The CATALOG page will be created during the next sprint" />
    ),

    children: [
      {
        path: Routes.CATEGORY_ID,
        element: (
          <NotFound additionalMessage="The CATEGORY_ID page will be created during the next sprint." />
        ),

        children: [
          {
            path: Routes.PRODUCT_ID,
            element: (
              <NotFound additionalMessage="The PRODUCT_ID page will be created during the next sprint." />
            ),
          },
        ],
      },
    ],
  },
  {
    path: Routes.PROFILE,
    element: (
      <NotFound additionalMessage="The PROFILE page will be created during the next sprint." />
    ),
  },
  {
    path: Routes.CART,
    element: (
      <NotFound additionalMessage="The CART page will be created during the next sprint." />
    ),
  },
  {
    path: Routes.ABOUT,
    element: (
      <NotFound additionalMessage="The ABOUT page will be created during the next sprint." />
    ),
  },
  {
    path: Routes.ROOT,
    element: <MainPage />,
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFound />,
  },
];
