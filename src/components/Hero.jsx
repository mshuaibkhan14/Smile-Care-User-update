import { Button } from "antd";
import {
  PhoneOutlined,
  SafetyCertificateOutlined,
  ExperimentOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const badges = [
  { icon: <SafetyCertificateOutlined />, label: "Experienced Dentists" },
  { icon: <ExperimentOutlined />, label: "Advanced Technology" },
  { icon: <HeartOutlined />, label: "Personalized Care" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div>
          <h1>
            Your Smile, <span className="text-accent">Our Passion</span>
          </h1>
          <p style={{ marginTop: 18, fontSize: 16, maxWidth: 460 }}>
            Comprehensive dental care for a healthier smile and a brighter you —
            from routine check-ups to complete smile makeovers.
          </p>

          <div className="hero__eyebrow-badges">
            {badges.map((b) => (
              <div className="hero__badge" key={b.label}>
                <span className="hero__badge-icon">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>

          <div className="hero__actions">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/book-appointment")}
            >
              Book an Appointment
            </Button>
            <Button
              size="large"
              icon={<PhoneOutlined />}
              href="tel:+922135551234"
            >
              Call (021) 3555-1234
            </Button>
          </div>
        </div>

        <div className="hero__image-wrap">
          <img
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=900&auto=format&fit=crop"
            alt="Patient smiling at SmileCare Dental Clinic"
          />
        </div>
      </div>
    </section>
  );
}
