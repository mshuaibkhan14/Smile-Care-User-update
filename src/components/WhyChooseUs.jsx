import { UserOutlined, ThunderboltOutlined, HeartOutlined, TagOutlined } from '@ant-design/icons';
import './WhyChooseUs.css';

const reasons = [
  { icon: <UserOutlined />, title: 'Expert Dentists', desc: 'Our team has years of experience & expertise' },
  { icon: <ThunderboltOutlined />, title: 'Advanced Technology', desc: 'We use the latest dental technologies' },
  { icon: <HeartOutlined />, title: 'Patient Comfort', desc: 'Our priority is your comfort and care' },
  { icon: <TagOutlined />, title: 'Affordable Pricing', desc: 'Quality care that fits your budget' },
];

export default function WhyChooseUs() {
  return (
    <section className="section section--tint">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">— Why Choose Us</span>
          <h2>
            Why Patients Choose <span className="text-accent">SmileCare</span>
          </h2>
        </div>

        <div className="why-grid">
          {reasons.map((r) => (
            <div className="why-card" key={r.title}>
              <div className="why-card__icon">{r.icon}</div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
