import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { NotFound } from '@/pages/NotFound/NotFound';

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
> & { path: Routes; children?: RouteConfig[] };

type NonIndexRouteObjectWithPath = Exclude<
  NonIndexRouteObject,
  'path' | 'children'
> & { path: Routes; children?: RouteConfig[] };

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
    element: <NotFound />,
  },
  {
    path: Routes.CATALOG,
    element: <NotFound />,
    children: [
      {
        path: Routes.CATEGORY_ID,
        element: <NotFound />,
        children: [
          {
            path: Routes.PRODUCT_ID,
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: Routes.PROFILE,
    element: <NotFound />,
  },
  {
    path: Routes.CART,
    element: <NotFound />,
  },
  {
    path: Routes.ABOUT,
    element: <NotFound />,
  },
  {
    path: Routes.ROOT,
    element: <LoginPage />, // change for Main page
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFound />,
  },
];
