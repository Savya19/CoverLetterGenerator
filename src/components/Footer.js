import React from 'react';
import { Heart, Zap } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          Made with <Heart size={16} className="heart" /> by Savya
        </div>
        <div className="footer-divider">|</div>
        <div className="footer-text">
          <Zap size={16} className="zap" />
          Powered by AI
        </div>
        <div className="footer-divider">|</div>
        <a href="#" className="footer-link">Contact</a>
      </div>
      <div className="footer-copyright">
        © 2024 Cover Letter AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;