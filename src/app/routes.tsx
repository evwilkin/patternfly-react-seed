import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Automations } from '@app/Automations/Automations';
import { Dashboard } from '@app/Dashboard/Dashboard';
import { Builder } from '@app/Builder/Builder';
import { Approvals } from '@app/Approvals/Approvals';
import { Configuration } from '@app/Configuration/Configuration';
import { Support } from '@app/Support/Support';
import { GeneralSettings } from '@app/Settings/General/GeneralSettings';
import { ProfileSettings } from '@app/Settings/Profile/ProfileSettings';
import { NotFound } from '@app/NotFound/NotFound';

export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  element: React.ReactElement;
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
  isDisabled?: boolean;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    element: <Dashboard />,
    exact: true,
    label: 'Dashboard',
    path: '/',
    title: 'Dashboard',
    isDisabled: true,
  },
  {
    element: <Builder />,
    exact: true,
    label: 'Builder',
    path: '/builder',
    title: 'Builder',
    isDisabled: true,
  },
  {
    element: <Automations />,
    exact: true,
    label: 'Automations',
    path: '/automations',
    title: 'Automations',
  },
  {
    element: <Approvals />,
    exact: true,
    label: 'Approvals',
    path: '/approvals',
    title: 'Approvals',
    isDisabled: true,
  },
  {
    element: <Configuration />,
    exact: true,
    label: 'Configuration',
    path: '/configuration',
    title: 'Configuration',
  },
  {
    element: <Support />,
    exact: true,
    label: 'Support',
    path: '/support',
    title: 'Support - Glossary',
  },
  {
    label: 'Settings',
    routes: [
      {
        element: <GeneralSettings />,
        exact: true,
        label: 'General',
        path: '/settings/general',
        title: 'General Settings',
        isDisabled: true,
      },
      {
        element: <ProfileSettings />,
        exact: true,
        label: 'Profile',
        path: '/settings/profile',
        title: 'Profile Settings',
        isDisabled: true,
      },
    ],
  },
];

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[],
);

const AppRoutes = (): React.ReactElement => (
  <Routes>
    {flattenedRoutes.map(({ path, element }, idx) => (
      <Route path={path} element={element} key={idx} />
    ))}
    <Route element={<NotFound />} />
  </Routes>
);

export { AppRoutes, routes, flattenedRoutes };
