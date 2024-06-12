import { useRef } from 'react';
import { createBrowserRouter, useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { routeConfig } from '../RouterConfig/RouteConfig';

import '@/app/providers/ui/AppRouterTransitions.scss';

function TransitionWrapper() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const nodeRef = useRef(null);
  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <div ref={nodeRef} className="page">
          {currentOutlet}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <TransitionWrapper />,
    children: [...routeConfig],
  },
]);
