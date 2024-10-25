import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import { Layout } from '/imports/ui/components/Layout/layout';
import { SignInPage } from '/imports/ui/pages/auth/sign-in-page';
import { RequireAuth } from '/imports/ui/components/RequireAuth';
import { RoadMapPage } from '/imports/ui/pages/roadmap';
import { RoleAccess } from '/imports/ui/components/RoleAccess';
import { Roles } from '/imports/ui/shared';
import { Page404 } from '/imports/ui/pages/page404';
import { Loading } from '/imports/ui/components/loading';

const UserStatistics = React.lazy(
  () => import('/imports/ui/pages/userStatistics/UserStatistics'),
);
const Statistics = React.lazy(
  () => import('/imports/ui/pages/statistics/Statistics'),
);

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
