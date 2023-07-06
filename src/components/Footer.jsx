import React from 'react';
import { faFacebookF, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/footer.css';

const Footer = () => {
  return (
        <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="footer-title">Benzema Cakes</h2>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Contáctanos:</h3>
          <ul className="footer-contact-list">
            <li className="footer-contact-item">Celular: 3147222389</li>
            <li className="footer-contact-item">Celular: 3122569874</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Síguenos en:</h3>
          <ul className="footer-social-icons">
            <li className="footer-social-icon">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} className="icons" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram}className="icons" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="icons"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2023 Benzema Cakes – Todos los derechos reservados.</div>
    </footer>
  );
};

export default Footer;
