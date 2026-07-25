import { useState, useMemo, useCallback } from 'react';
import { Input, Skeleton, Alert, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetServicesQuery } from '../store/apiSlice';
import { useDebounce } from '../hooks/useDebounce';
import ServiceCard from '../components/ServiceCard';
import CtaBanner from '../components/CtaBanner';
import '../styles/PageHero.css';

export default function Services() {
  const { data: services, isLoading, isError } = useGetServicesQuery();
  const [search, setSearch] = useState('');

  // useDebounce custom hook — filtering only recomputes 400ms after the user
  // stops typing, instead of on every keystroke.
  const debouncedSearch = useDebounce(search, 400);

  // useCallback so this handler reference stays stable across re-renders,
  // relevant if it were passed down to a memoized child input.
  const handleSearchChange = useCallback((e) => setSearch(e.target.value), []);

  // useMemo — only recompute the filtered list when the debounced term or
  // the source data actually changes.
  const filtered = useMemo(() => {
    if (!services) return [];
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return services;
    return services.filter(
      (s) => s.title.toLowerCase().includes(term) || s.shortDesc.toLowerCase().includes(term),
    );
  }, [services, debouncedSearch]);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">— Our Services</span>
          <h1>
            Comprehensive Dental <span className="text-accent">Services</span>
          </h1>
          <p style={{ maxWidth: 560, margin: '0 auto' }}>
            From preventive care to complete smile makeovers, explore the full range of
            treatments we offer.
          </p>

          <div style={{ maxWidth: 420, margin: '28px auto 0' }}>
            <Input
              size="large"
              placeholder="Search services (e.g. implants, whitening...)"
              prefix={<SearchOutlined />}
              value={search}
              onChange={handleSearchChange}
              allowClear
            />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
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
            />
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <Empty description={`No services match "${debouncedSearch}"`} />
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className="services-grid">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
