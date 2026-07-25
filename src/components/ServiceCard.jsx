import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import ServiceIcon from './ServiceIcon';
import './ServiceCard.css';

// Wrapped in React.memo so the whole services grid doesn't re-render every
// card when unrelated state changes (e.g. the search box value) — same
// optimization pattern as Child1.jsx/Child2.jsx in class, paired with
// useCallback on any handlers passed down from the parent list.
function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.id}`} className="service-card">
      <div className="service-card__image">
        <img src={service.image} alt={service.title} loading="lazy" />
      </div>
      <div className="service-card__body">
        <div className="service-card__icon">
          <ServiceIcon name={service.icon} />
        </div>
        <h4>{service.title}</h4>
        <p>{service.shortDesc}</p>
        <span className="service-card__link">
          Learn More <ArrowRightOutlined />
        </span>
      </div>
    </Link>
  );
}

export default memo(ServiceCard);
