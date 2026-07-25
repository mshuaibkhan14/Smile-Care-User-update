import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './AboutSplit.css';

const points = [
  'State-of-the-art technology',
  'Comfortable & relaxing environment',
  'Highly experienced dental team',
  'Personalized treatment plans',
];

export default function AboutSplit() {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container about-split">
        <div className="about-split__images">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=900&auto=format&fit=crop"
            alt="Dentist treating a patient"
          />
          <img
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=500&auto=format&fit=crop"
            alt="SmileCare clinic room"
          />
          <img
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=500&auto=format&fit=crop"
            alt="SmileCare reception area"
          />
        </div>

        <div>
          <span className="eyebrow">— About Us</span>
          <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16 }}>
            Dedicated to Excellence in <span className="text-accent">Dental Care</span>
          </h2>
          <p>
            At SmileCare Dental Clinic, we combine advanced technology with a gentle
            touch to provide exceptional dental care for patients of all ages.
          </p>

          <ul className="about-split__checklist">
            {points.map((point) => (
              <li key={point}>
                <CheckCircleFilled /> {point}
              </li>
            ))}
          </ul>

          <Button type="primary" onClick={() => navigate('/about')}>
            Learn More About Us
          </Button>
        </div>
      </div>
    </section>
  );
}
