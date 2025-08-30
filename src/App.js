import React, { useState } from 'react';
import Header from './components/Header';
import CoverLetterForm from './components/CoverLetterForm';
import CoverLetterDisplay from './components/CoverLetterDisplay';

import Footer from './components/Footer';
import './App.css';

function App() {
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [jobDetails, setJobDetails] = useState({ company: '', role: '' });

  const handleCoverLetterGenerated = (letter, details) => {
    setCoverLetter(letter);
    setJobDetails(details);
  };

  const handleDownloadRequest = async () => {
    try {
      const response = await fetch('/download_cover_letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cover_letter: coverLetter
        })
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cover_letter.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download cover letter. Please try again.');
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <CoverLetterForm 
          onCoverLetterGenerated={handleCoverLetterGenerated}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {coverLetter && (
          <CoverLetterDisplay 
            coverLetter={coverLetter}
            onDownloadRequest={handleDownloadRequest}
            jobDetails={jobDetails}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;