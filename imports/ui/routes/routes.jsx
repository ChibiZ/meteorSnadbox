import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import { Layout } from '../components/Layout/layout';
import { SignInPage } from '../pages/auth/sign-in-page';
import { NotFoundPage } from '../pages/not-found/not-found-page';
import { RequireAuth } from '../components/RequireAuth';
import { RoadMapPage } from '../pages/roadmap';

export const routes = {
  root: '/',
  login: '/login',
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
              <NotFoundPage />
            </Layout>
          }
          path={routes.notFound}
        />
      </ReactRoutes>
    </BrowserRouter>
  );
}
