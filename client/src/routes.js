import React from 'react';
import { Navigate } from 'react-router-dom';
import CalculationPremium from './views/premiums/CalculationPremium';
import CalculationSumInsured from './views/premiums/CalculationSumInsured';
import CalculationDisplay from './views/premiums/CalculationDisplay';
import History from './views/premiums/History';
import DashboardLayout from 'src/layouts/DashboardLayout';
import NotFoundView from 'src/views/errors/NotFoundView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'calpremium', element: <CalculationPremium /> },
      { path: 'calsuminsured', element: <CalculationSumInsured /> },
      { path: 'display', element: <CalculationDisplay /> },
      { path: 'history', element: <History /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/calpremium" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
