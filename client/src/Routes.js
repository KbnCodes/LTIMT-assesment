/* eslint-disable react/no-array-index-key */
import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/login" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  },
  {
    exact: true,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    layout: DashboardLayout,
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/addevent" />
      },
      {
        exact: true,
        path: '/app/viewevent',
        component: lazy(() => import('src/views/events/ViewEvents'))
      },
      {
        exact: true,
        path: '/app/addevent',
        component: lazy(() => import('src/views/events/AddEvent/index'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

const renderRoutes = routes =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={props => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
