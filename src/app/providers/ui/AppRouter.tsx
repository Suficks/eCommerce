import { createBrowserRouter } from 'react-router-dom';
import { routeConfig } from '@/app/providers/Router/Config/routeConfig';

const {
  login,
  registration,
  main,
  catalog,
  profile,
  basket,
  about,
  base,
  notFound,
} = routeConfig;

export const router = createBrowserRouter([
  {
    path: login.path,
    element: login.element,
  },
  {
    path: registration.path,
    element: registration.element,
  },
  {
    path: main.path,
    element: main.element,
  },
  {
    path: catalog.path,
    element: catalog.element,
    children: [
      {
        path: `:categoryId`,
        element: catalog.element,
        children: [
          {
            path: `:productId`,
            element: catalog.element,
          },
        ],
      },
    ],
  },
  {
    path: profile.path,
    element: profile.element,
  },
  {
    path: basket.path,
    element: basket.element,
  },
  {
    path: about.path,
    element: about.element,
  },
  {
    path: notFound.path,
    element: notFound.element,
  },
  {
    path: base.path,
    element: base.element,
  },
]);
