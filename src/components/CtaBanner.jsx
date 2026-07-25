import { Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './CtaBanner.css';

export default function CtaBanner() {
  const navigate = useNavigate();

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="cta-banner">
          <div className="cta-banner__left">
            <div className="cta-banner__icon">
              <CalendarOutlined />
            </div>
            <div>
              <h3>Ready for a Healthier Smile?</h3>
              <p>Schedule your appointment today and take the first step towards a brighter, healthier smile!</p>
            </div>
          </div>
          <Button size="large" onClick={() => navigate('/book-appointment')}>
            Book an Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
