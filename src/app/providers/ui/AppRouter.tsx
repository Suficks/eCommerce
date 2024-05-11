import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/app/providers/Router/Config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <Suspense>{route.element}</Suspense>;
    return <Route path={route.path} element={element} key={route.path} />;
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
      <Route path="*" element={routeConfig.login.element} />
    </Routes>
  );
});
