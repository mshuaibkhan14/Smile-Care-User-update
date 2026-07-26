import { Link } from 'react-router-dom';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import logo from '../assets/green-logo.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">
            <img src={logo} alt="SmileCare logo" className="footer__logo" />
          </div>
          <p className="footer__tagline">
            Comprehensive dental care for a healthier smile and a brighter you.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/doctors">Doctors</Link>
        </div>

        <div>
          <h4>Our Services</h4>
          <Link to="/services/general-dentistry">General Dentistry</Link>
          <Link to="/services/cosmetic-dentistry">Cosmetic Dentistry</Link>
          <Link to="/services/dental-implants">Dental Implants</Link>
        </div>

        <div>
          <h4>Contact Us</h4>
          <p><EnvironmentOutlined /> 123 Smile Avenue, Suite 100, Karachi</p>
          <p><PhoneOutlined /> (021) 3555-1234</p>
          <p><MailOutlined /> hello@smilecare.example</p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          © {new Date().getFullYear()} SmileCare Dental Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
