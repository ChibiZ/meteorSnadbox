import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import { Layout } from '../components/Layout/layout';
import { SignInPage } from '../pages/auth/sign-in-page';
import { RequireAuth } from '../components/RequireAuth';
import { RoadMapPage } from '../pages/roadmap';
import { RoleAccess } from '../components/RoleAccess';
import { Roles } from '../shared';
import { Page404 } from '../pages/page404';
import { Loading } from '../components/loading';

const UserStatistics = React.lazy(
  () => import('../pages/userStatistics/UserStatistics'),
);
const Statistics = React.lazy(() => import('../pages/statistics/Statistics'));

export const routes = {
  root: '/',
  login: '/login',
  statistics: '/statistics',
  userStatistics: '/statistics/:id',
  notFound: '*',
};

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route
          element={
            <RequireAuth>
              <Layout>
                <RoadMapPage />
              </Layout>
            </RequireAuth>
          }
          path={routes.root}
        />

        <Route
          element={
            <Layout loggedOnly={false}>
              <SignInPage />
            </Layout>
          }
          path={routes.login}
          index
        />

        <Route
          element={
            <Layout loggedOnly={false}>
              <Page404 />
            </Layout>
          }
          path={routes.notFound}
        />

        <Route
          element={
            <RequireAuth>
              <Layout>
                <RoleAccess roles={[Roles.Admin]}>
                  <React.Suspense fallback={<Loading />}>
                    <Statistics />
                  </React.Suspense>
                </RoleAccess>
              </Layout>
            </RequireAuth>
          }
          path={routes.statistics}
        />

        <Route
          element={
            <RequireAuth>
              <Layout>
                <RoleAccess roles={[Roles.Admin]}>
                  <React.Suspense fallback={<Loading />}>
                    <UserStatistics />
                  </React.Suspense>
                </RoleAccess>
              </Layout>
            </RequireAuth>
          }
          path={routes.userStatistics}
        />
      </ReactRoutes>
    </BrowserRouter>
  );
}
