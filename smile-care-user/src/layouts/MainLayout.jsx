import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from '../components/AuthModal';

export default function MainLayout() {
  const location = useLocation();
  const topRef = useRef(null);

  // useEffect + useRef: scroll to top and update document title on every
  // route change (nested-route layout pattern from class: Layout -> Outlet).
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'instant' });
    const titles = {
      '/': 'SmileCare Dental Clinic',
      '/services': 'Our Services — SmileCare',
      '/doctors': 'Our Doctors — SmileCare',
      '/about': 'About Us — SmileCare',
      '/contact': 'Contact — SmileCare',
      '/book-appointment': 'Book an Appointment — SmileCare',
      '/profile': 'My Profile — SmileCare',
      '/payment': 'Payment — SmileCare',
    };
    document.title = titles[location.pathname] || 'SmileCare Dental Clinic';
  }, [location.pathname]);

  return (
    <div ref={topRef}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}
