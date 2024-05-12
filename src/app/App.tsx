import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/providers/ui/AppRouter';

export const App = () => {
  return <RouterProvider router={router} />;
};
