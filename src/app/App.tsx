import { RouterProvider, useLocation } from 'react-router-dom';
import './AppRouterTransitions.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { AppRouter } from '@/app/providers/ui/AppRouter';

export const App = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={2000}>
        <RouterProvider router={AppRouter} />
      </CSSTransition>
    </TransitionGroup>
  );
};
