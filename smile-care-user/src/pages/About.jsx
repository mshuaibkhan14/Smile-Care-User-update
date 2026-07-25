import { Button } from 'antd';
import { TeamOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AboutSplit from '../components/AboutSplit';
import CtaBanner from '../components/CtaBanner';
import '../styles/PageHero.css';
import './About.css';

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">— About SmileCare</span>
          <h1>
            Caring for Smiles <span className="text-accent">Since 2010</span>
          </h1>
          <p style={{ maxWidth: 560, margin: '0 auto' }}>
            SmileCare Dental Clinic was founded on a simple idea: dental care should feel
            calm, personal, and genuinely comfortable.
          </p>
          <div className="stat-strip" style={{ justifyContent: 'center', marginTop: 32 }}>
            <div className="stat-strip__item">
              <h3>14+</h3>
              <p>Years of Service</p>
            </div>
            <div className="stat-strip__item">
              <h3>8,000+</h3>
              <p>Happy Patients</p>
            </div>
            <div className="stat-strip__item">
              <h3>4</h3>
              <p>Specialist Doctors</p>
            </div>
          </div>
        </div>
      </div>

      <AboutSplit />

      <section className="section section--tint">
        <div className="container">
          <div className="cta-banner" style={{ background: 'var(--color-white)', boxShadow: 'var(--shadow-soft)' }}>
            <div className="cta-banner__left">
              <div className="cta-banner__icon" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <TeamOutlined />
              </div>
              <div>
                <h3 style={{ color: 'var(--color-text-primary)' }}>Meet Our Doctors</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Four specialists, one shared goal — your comfort and confidence.
                </p>
              </div>
            </div>
            <Button size="large" type="primary" onClick={() => navigate('/doctors')}>
              View Doctors <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

