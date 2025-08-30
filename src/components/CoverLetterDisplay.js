import React from 'react';
import { Download, FileText, Building, Briefcase } from 'lucide-react';
import './CoverLetterDisplay.css';

const CoverLetterDisplay = ({ coverLetter, onDownloadRequest, jobDetails }) => {
  return (
    <div className="cover-letter-display">
      <div className="display-header">
        <div className="header-content">
          <div className="header-icon">
            <FileText size={24} />
          </div>
          <div className="header-text">
            <h2>Your Cover Letter</h2>
            <div className="job-details">
              <span className="job-detail">
                <Building size={16} />
                {jobDetails.company}
              </span>
              <span className="job-detail">
                <Briefcase size={16} />
                {jobDetails.role}
              </span>
            </div>
          </div>
        </div>
        <button 
          className="download-button"
          onClick={onDownloadRequest}
        >
          <Download size={18} />
          Download
        </button>
      </div>
      
      <div className="cover-letter-content">
        <div className="letter-text">
          {coverLetter.split('\n').map((paragraph, index) => (
            paragraph.trim() ? (
              <p key={index} className="letter-paragraph">
                {paragraph}
              </p>
            ) : (
              <br key={index} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterDisplay;