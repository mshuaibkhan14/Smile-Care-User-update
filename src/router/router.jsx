import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import MainLayout from '../layouts/MainLayout';
import RouteError from './RouteError';
import RequireAuth from './RequireAuth';

// Code splitting via React.lazy + Suspense — taught as the alternative to
// eagerly importing every route component up front. Each page only loads
// its JS bundle when the user actually navigates there.
const Home = lazy(() => import('../pages/Home'));
const Services = lazy(() => import('../pages/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'));
const Doctors = lazy(() => import('../pages/Doctors'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const BookAppointment = lazy(() => import('../pages/BookAppointment'));
const Profile = lazy(() => import('../pages/Profile'));
const Payment = lazy(() => import('../pages/Payment'));
const NotFound = lazy(() => import('../pages/NotFound'));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '160px 0' }}>
    <Spin size="large" />
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: 'services', element: withSuspense(Services) },
      { path: 'services/:serviceId', element: withSuspense(ServiceDetail) },
      { path: 'doctors', element: withSuspense(Doctors) },
      { path: 'about', element: withSuspense(About) },
      { path: 'contact', element: withSuspense(Contact) },
      {
        path: 'book-appointment',
        element: <RequireAuth>{withSuspense(BookAppointment)}</RequireAuth>,
      },
      {
        path: 'profile',
        element: <RequireAuth>{withSuspense(Profile)}</RequireAuth>,
      },
      {
        path: 'payment',
        element: <RequireAuth>{withSuspense(Payment)}</RequireAuth>,
      },
      { path: '*', element: withSuspense(NotFound) },
    ],
  },
]);
