import { RouterProvider } from 'react-router-dom';
import { Approuter } from '@/app/providers/ui/AppRouter';

export const App = () => {
  return <RouterProvider router={Approuter} />;
};
