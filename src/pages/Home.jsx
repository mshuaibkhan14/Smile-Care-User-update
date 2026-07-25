import { useMemo } from 'react';
import { Alert, Skeleton, Button } from 'antd';
import { useGetServicesQuery } from '../store/apiSlice';
import Hero from '../components/Hero';
import QuickInfoStrip from '../components/QuickInfoStrip';
import AboutSplit from '../components/AboutSplit';
import WhyChooseUs from '../components/WhyChooseUs';
import ServiceCard from '../components/ServiceCard';
import CtaBanner from '../components/CtaBanner';
import { Link } from 'react-router-dom';

export default function Home() {
  // RTK Query auto-generated hook: gives loading/error/data state for free,
  // no manual useEffect + fetch + useState juggling needed.
  const { data: services, isLoading, isError } = useGetServicesQuery();

  // useMemo — only take the first 6 for the homepage grid, recompute only
  // when the underlying `services` reference actually changes.
  const featured = useMemo(() => (services ? services.slice(0, 6) : []), [services]);

  return (
    <>
      <Hero />
      <QuickInfoStrip />
      <AboutSplit />
      <WhyChooseUs />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">— Our Services</span>
            <h2>
              Comprehensive Dental <span className="text-accent">Services</span>
            </h2>
            <p>From preventive care to complete smile makeovers, we offer a full range of dental services.</p>
          </div>

          {isLoading && (
            <div className="services-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton active key={i} paragraph={{ rows: 3 }} />
              ))}
            </div>
          )}

          {isError && (
            <Alert
              type="warning"
              showIcon
              message="Couldn't load services"
              description="Make sure the mock API is running (npm run server) — see README."
              style={{ marginBottom: 24 }}
            />
          )}

          {!isLoading && !isError && (
            <div className="services-grid">
              {featured.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services">
              <Button size="large" type="primary">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
