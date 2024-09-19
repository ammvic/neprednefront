import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4 className="footer-heading">Product</h4>
          <ul className="footer-list">
            <li><a href="#client-gallery" className="footer-link">Client Gallery</a></li>
            <li><a href="#website" className="footer-link">Website</a></li>
            <li><a href="#studio-manager" className="footer-link">Studio Manager</a></li>
            <li><a href="#store" className="footer-link">Store</a></li>
            <li><a href="#mobile-app" className="footer-link">Mobile Gallery App</a></li>
            <li><a href="#pricing" className="footer-link">Pricing</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-list">
            <li><a href="#help-support" className="footer-link">Help & Support</a></li>
            <li><a href="#examples" className="footer-link">Examples</a></li>
            <li><a href="#plugins" className="footer-link">Plugins</a></li>
            <li><a href="#blog" className="footer-link">Pixieset Blog</a></li>
            <li><a href="#status" className="footer-link">Service Status</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-list">
            <li><a href="#about" className="footer-link">About Us</a></li>
            <li><a href="#careers" className="footer-link">Careers</a></li>
            <li><a href="#terms" className="footer-link">Terms of Service</a></li>
            <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-column footer-logo-column">
          <h4 className="footer-logo">Mielle</h4>
          <p className="footer-description">Your Story, Our Lens</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
