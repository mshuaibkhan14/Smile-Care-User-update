import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Skeleton, Result } from 'antd';
import { CheckCircleFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { useGetServiceByIdQuery } from '../store/apiSlice';
import ServiceIcon from '../components/ServiceIcon';
import CtaBanner from '../components/CtaBanner';
import '../styles/PageHero.css';
import '../components/AboutSplit.css';
import '../components/ServiceCard.css';

export default function ServiceDetail() {
  // useParams — reads the :serviceId dynamic segment from the URL.
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { data: service, isLoading, isError } = useGetServiceByIdQuery(serviceId);

  if (isLoading) {
    return (
      <div className="container section">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (isError || !service) {
    return (
      <Result
        status="404"
        title="Service not found"
        subTitle="We couldn't find the service you're looking for."
        extra={<Button type="primary" onClick={() => navigate('/services')}>Back to Services</Button>}
      />
    );
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/services" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            <ArrowLeftOutlined /> All Services
          </Link>
          <h1 style={{ marginTop: 14 }}>{service.title}</h1>
          <p style={{ maxWidth: 560, margin: '0 auto' }}>{service.shortDesc}</p>
        </div>
      </div>

      <section className="section">
        <div className="container about-split">
          <img
            src={service.image}
            alt={service.title}
            style={{ width: '100%', borderRadius: 'var(--radius-lg)', aspectRatio: '4/3.4', objectFit: 'cover' }}
          />

          <div>
            <div className="service-card__icon" style={{ marginBottom: 20 }}>
              <ServiceIcon name={service.icon} />
            </div>
            <p style={{ fontSize: 16, marginBottom: 20 }}>{service.longDesc}</p>

            <ul className="about-split__checklist">
              {service.features.map((f) => (
                <li key={f}>
                  <CheckCircleFilled /> {f}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-primary)' }}>
                {service.price}
              </span>
              <Button type="primary" size="large" onClick={() => navigate('/book-appointment')}>
                Book This Service
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
