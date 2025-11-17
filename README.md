# Cover Letter Generator

A web application that generates personalized cover letters using AI based on your CV and job requirements.

## Features

- 📄 Upload PDF CV with drag & drop support
- 🏢 Enter company and role details
- 🤖 AI-powered cover letter generation using Google Gemini
- 📥 Download as Word document
- � Fiwrebase authentication (sign in/sign up)
- � FResponsive design

## Architecture

This project has **two separate frontends**:
1. **Flask Templates** (templates/*.html) - The main production app with vanilla JS
2. **React App** (src/*) - An alternative modern frontend (separate, not integrated)

## Setup

### Prerequisites
- Python 3.7+
- Node.js 14+
- Google Gemini API key
- Firebase project (for authentication)

### Backend (Flask)
1. Install Python dependencies:
```bash
pip install flask flask-cors google-generativeai pymupdf python-docx
```

2. Create a `.env` file in the root directory:
```
api_key=your_google_gemini_api_key_here
```

### Frontend (React)
1. Install Node.js dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Copy your Firebase config to `static/firebase-config.js`

## Running the Application

### Option 1: Flask Templates (Main App)
1. Run the Flask application:
```bash
python app.py
```

2. Open your browser and navigate to `http://localhost:5000`
3. Sign in/sign up and use the dashboard

### Option 2: React Frontend (Alternative)
The React app is a separate frontend that's **not integrated** with Flask routing.

1. Start the Flask backend (for API only):
```bash
python app.py
```

2. In a new terminal, start the React development server:
```bash
npm start
```

3. The React app will run on `http://localhost:3000` and make API calls to Flask on port 5000

## Usage

1. Sign up or sign in using Firebase authentication
2. Upload your CV in PDF format (drag & drop supported)
3. Enter the target company name
4. Enter the target role
5. Provide company description and/or job posting details
6. Click "Generate Cover Letter"
7. Review the AI-generated cover letter
8. Download as a Word document (.docx)

## Technologies Used

### Backend
- Flask (Web framework)
- Google Gemini AI (gemini-1.5-flash-latest for cover letter generation)
- PyMuPDF (fitz - PDF text extraction)
- python-docx (Word document generation)
- Flask-CORS (Cross-origin requests)

### Frontend (Flask Templates - Main)
- Vanilla JavaScript
- Firebase Authentication (User sign in/sign up)
- HTML/CSS with glassmorphism effects
- Responsive design

### Frontend (React - Alternative/Unused)
- React 18
- Axios (HTTP client)
- Lucide React (Icons)
- Modern CSS

## Project Structure

```
├── app.py                      # Flask backend API
├── .env                        # Environment variables (API keys)
├── package.json               # React dependencies
├── public/                    # React public files
│   └── index.html            # React HTML template
├── src/                       # React source code
│   ├── components/           # React components
│   │   ├── Header.js        # App header
│   │   ├── Footer.js        # App footer
│   │   ├── CoverLetterForm.js    # Upload and input form
│   │   ├── CoverLetterDisplay.js # Generated letter display
│   │   └── AuthModal.js     # Authentication modal
│   ├── App.js               # Main App component
│   ├── App.css              # Main styles
│   └── index.js             # React entry point
├── build/                    # React build output (generated)
├── templates/                # Flask HTML templates (legacy/fallback)
│   ├── signin.html          # Sign in page
│   ├── signup.html          # Sign up page
│   └── index.html           # Dashboard page
├── static/                   # Static assets
│   ├── firebase-config.js   # Firebase configuration
│   ├── content.css          # Legacy styles
│   └── ran.js               # Legacy scripts
└── uploads/                  # Temporary CV uploads (auto-deleted)
```

## API Endpoints

- `GET /` - Serves sign in page
- `GET /signin` - Sign in page
- `GET /signup` - Sign up page
- `GET /dashboard` - Main dashboard (requires auth)
- `POST /generate_cover_letter` - Generates cover letter from CV and job details
- `POST /download_cover_letter` - Downloads cover letter as Word document

## Environment Variables

Create a `.env` file with:
```
api_key=your_google_gemini_api_key
```

## Notes

- CV files are temporarily stored in `uploads/` and automatically deleted after processing
- Maximum file size: 2MB
- Supported format: PDF only
- **The Flask app serves HTML templates, not the React app**
- The React frontend is a separate implementation that would need additional integration to work with Flask routing
