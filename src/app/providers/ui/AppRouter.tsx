import { createBrowserRouter } from 'react-router-dom';
import { routeConfig } from '../RouterConfig/RouteConfig';

// import '@/app/providers/ui/AppRouterTransitions.scss';

export const AppRouter = createBrowserRouter(routeConfig);

// export const AppPage = () => {
//   const location = useLocation();
//   const nodeRef = useRef<HTMLDivElement>(null);

//   const selectedRoute = routeConfig.find(
//     (route) => route.path === location.pathname,
//   );
//   const element = selectedRoute?.element || <NotFound />;

//   return (
//     <SwitchTransition>
//       <CSSTransition
//         key={location.pathname}
//         nodeRef={nodeRef}
//         timeout={200}
//         classNames="page"
//         unmountOnExit
//       >
//         {() => (
//           <div ref={nodeRef} className="page">
//             {element}
//           </div>
//         )}
//       </CSSTransition>
//     </SwitchTransition>
//   );
// };

// export const AppRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <AppPage />,
//     children: [
//       ...routeConfig.map((route) => ({
//         index: route.path === '/',
//         path: route.path === '/' ? undefined : route.path,
//         element: route.element,
//       })),
//       {
//         path: '/*',
//         element: <NotFound />,
//       },
//     ],
//   },
// ]);
