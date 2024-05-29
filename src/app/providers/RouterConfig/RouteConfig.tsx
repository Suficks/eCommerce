import { LegacyRef, createRef } from 'react';
import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { MainPage } from '@/pages/MainPage/MainPage';
import { NotFound } from '@/pages/NotFound/NotFound';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { ProfilePage } from '@/pages/ProfilePage/ui/ProfilePage';
import { loadClient } from '@/features/Loader/LoadClient';
import { CatalogPage } from '@/pages/CatalogPage';

export enum Routes {
  LOGIN = '/login',
  REGISTRATION = '/registration',
  MAIN = '/main',
  CATALOG = '/catalog',
  CATEGORY_ID = ':categoryId',
  PRODUCT_ID = ':productId',
  PRODUCT = '/product',
  PROFILE = '/profile',
  CART = '/cart',
  ABOUT = '/about',
  ROOT = '/',
  NOT_FOUND = '/*',
}
export enum PageIDs {
  PROFILE = 'profile',
}

type IndexRouteObjectWithPath = Exclude<
  IndexRouteObject,
  'path' | 'children'
> & {
  path: Routes;
  nodeRef: LegacyRef<HTMLDivElement> | undefined;
  children?: RouteConfig[];
};

type NonIndexRouteObjectWithPath = Exclude<
  NonIndexRouteObject,
  'path' | 'children'
> & {
  path: Routes;
  nodeRef: LegacyRef<HTMLDivElement> | undefined;
  children?: RouteConfig[];
};

type RouteConfig = NonIndexRouteObjectWithPath | IndexRouteObjectWithPath;

export const routeConfig: RouteConfig[] = [
  {
    path: Routes.LOGIN,
    element: <LoginPage />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: Routes.REGISTRATION,
    element: <RegistrationPage />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: Routes.MAIN,
    element: <MainPage />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: Routes.CATALOG,
    element: <CatalogPage />,
    nodeRef: createRef<HTMLDivElement>(),
    children: [
      {
        path: Routes.CATEGORY_ID,
        element: (
          <NotFound additionalMessage="The CATEGORY_ID page will be created during the next sprint." />
        ),
        nodeRef: createRef<HTMLDivElement>(),
        children: [
          {
            path: Routes.PRODUCT_ID,
            element: (
              <NotFound additionalMessage="The PRODUCT_ID page will be created during the next sprint." />
            ),
            nodeRef: createRef<HTMLDivElement>(),
          },
        ],
      },
    ],
  },
  {
    path: Routes.PRODUCT,
    element: <ProductPage />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: Routes.PROFILE,
    id: 'profile',
    loader: loadClient,
    element: <ProfilePage />,
    errorElement: <NotFound additionalMessage="Some error occured!" />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: Routes.CART,
    element: (
      <NotFound additionalMessage="The CART page will be created during the next sprint." />
    ),
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: Routes.ABOUT,
    element: (
      <NotFound additionalMessage="The ABOUT page will be created during the next sprint." />
    ),
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: Routes.ROOT,
    element: <MainPage />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFound />,
    nodeRef: createRef<HTMLDivElement>(),
  },
];
