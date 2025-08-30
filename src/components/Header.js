import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <FileText size={32} />
            <Sparkles size={20} className="sparkle" />
          </div>
          <h1 className="site-title">
            Cover Letter <span className="highlight">AI</span>
          </h1>
        </div>
        <p className="subtitle">Create professional cover letters in seconds</p>
      </div>
    </header>
  );
};

export default Header;