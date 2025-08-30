# Cover Letter Generator

A modern web application that generates personalized cover letters using AI based on your CV and job requirements.

## Features

- 🎨 Modern React frontend with elegant UI
- 📄 Upload PDF CV with drag & drop support
- 🏢 Enter company and role details
- 🤖 AI-powered cover letter generation using Cohere
- 📥 Download as Word document
- 🔐 User authentication modal
- 📱 Fully responsive design

## Setup

### Backend (Flask)
1. Install Python dependencies:
```bash
pip install flask flask-cors cohere pymupdf python-docx
```

### Frontend (React)
1. Install Node.js dependencies:
```bash
npm install
```

2. Build the React app:
```bash
npm run build
```

3. Run the Flask application:
```bash
python app.py
```

4. Open your browser and navigate to `http://localhost:5000`

## Development

To run in development mode:

1. Start the Flask backend:
```bash
python app.py
```

2. In a new terminal, start the React development server:
```bash
npm start
```

3. The React app will run on `http://localhost:3000` and proxy API calls to Flask

## Usage

1. Upload your CV in PDF format (drag & drop supported)
2. Enter the target company name
3. Enter the target role
4. Provide company description or job posting
5. Click "Generate Cover Letter"
6. Sign up/in to download the generated cover letter as a Word document

## Technologies Used

### Backend
- Flask (Web framework)
- Cohere AI (Cover letter generation)
- PyMuPDF (PDF processing)
- python-docx (Word document generation)
- Flask-CORS (Cross-origin requests)

### Frontend
- React 18 (UI framework)
- Axios (HTTP client)
- Lucide React (Icons)
- Modern CSS with glassmorphism effects
- Responsive design

## Project Structure

```
├── app.py                 # Flask backend
├── package.json          # React dependencies
├── public/               # React public files
├── src/                  # React source code
│   ├── components/       # React components
│   ├── App.js           # Main App component
│   └── index.js         # React entry point
├── build/               # React build output (generated)
├── templates/           # Original HTML templates (legacy)
├── static/              # Original static files (legacy)
└── uploads/             # Temporary file uploads
```
