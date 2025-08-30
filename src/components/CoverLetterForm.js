import React, { useState } from 'react';
import { Upload, Building, Briefcase, FileText, Loader2 } from 'lucide-react';
import axios from 'axios';
import './CoverLetterForm.css';

const CoverLetterForm = ({ onCoverLetterGenerated, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState({
    cv: null,
    company: '',
    role: '',
    companyDesc: ''
  });
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (file) => {
    if (file && file.type === 'application/pdf') {
      if (file.size > 2 * 1024 * 1024) {
        setError('File size must be less than 2MB');
        return;
      }
      setFormData(prev => ({ ...prev, cv: file }));
      setError('');
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.cv || !formData.company || !formData.role || !formData.companyDesc) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('cv', formData.cv);
      submitData.append('company', formData.company);
      submitData.append('job', formData.role);
      submitData.append('company_desc', formData.companyDesc);

      const response = await axios.post('/generate_cover_letter', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onCoverLetterGenerated(response.data.cover_letter, {
        company: formData.company,
        role: formData.role
      });
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to generate cover letter');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="cover-letter-form">
        <div className="form-section">
          <label className="form-label">
            <Upload size={20} />
            Upload your CV (PDF)
          </label>
          <div 
            className={`file-upload ${dragActive ? 'drag-active' : ''} ${formData.cv ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="file-input"
            />
            <div className="file-upload-content">
              {formData.cv ? (
                <>
                  <FileText size={24} />
                  <span>{formData.cv.name}</span>
                </>
              ) : (
                <>
                  <Upload size={24} />
                  <span>Drop your PDF here or click to browse</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-section">
            <label className="form-label">
              <Building size={20} />
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="e.g., Google"
              className="form-input"
            />
          </div>

          <div className="form-section">
            <label className="form-label">
              <Briefcase size={20} />
              Target Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g., Software Engineer"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">
            <FileText size={20} />
            Company Description
          </label>
          <textarea
            name="companyDesc"
            value={formData.companyDesc}
            onChange={handleInputChange}
            placeholder="Paste the company description or job posting here..."
            className="form-textarea"
            rows="4"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="spinner" />
              Generating...
            </>
          ) : (
            'Generate Cover Letter'
          )}
        </button>
      </form>
    </div>
  );
};

export default CoverLetterForm;