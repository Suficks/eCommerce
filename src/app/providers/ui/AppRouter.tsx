import { createBrowserRouter } from 'react-router-dom';

import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { NotFound } from '@/pages/NotFound/NotFound';

export const Approuter = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: `/registration`,
    element: <RegistrationPage />,
  },
  {
    path: `/main`,
    element: <RegistrationPage />,
  },
  {
    path: `/catalog`,
    element: <RegistrationPage />,
    children: [
      {
        path: `:categoryId`,
        element: <NotFound />,
        children: [
          {
            path: `:productId`,
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: `/profile`,
    element: <RegistrationPage />,
  },
  {
    path: `/basket`,
    element: <RegistrationPage />,
  },
  {
    path: `/about`,
    element: <RegistrationPage />,
  },
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: `/*`,
    element: <NotFound />,
  },
]);
