import cohere
import fitz  # PyMuPDF
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS  # For cross-origin requests
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app)  # Enable CORS for all routes

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024  # 2MB limit

# Initialize Cohere client (replace with your actual API key)
co = cohere.Client("6V1TNJ50hhBgD2my1Iyn1xmdyxAKQ0PIzH6pmVpa")  # Add your key here

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def extract_pdf(pdf_path):
    """Extract text from PDF using PyMuPDF"""
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        print(f"PDF extraction error: {e}")
        raise

import traceback

@app.route('/generate_cover_letter', methods=['POST'])
def generate_cover_letter():
    try:
        print("Request received!")

        if 'cv' not in request.files:
            print("No file in request")
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['cv']
        job = request.form.get('job', '').strip()
        company = request.form.get('company', '').strip()

        print("File:", file.filename)
        print("Job:", job)
        print("Company:", company)

        # Check if file is allowed
        if not file or file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Only PDF files are allowed"}), 400

        # Save file temporarily
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        print(f"File saved to {filepath}")

        # Extract PDF
        cv_text = extract_pdf(filepath)
        print("Extracted CV Text:", cv_text[:200], "...")  # print preview

    
        # Generate using Cohere
        prompt = f"""
        Write a professional, tailored cover letter based on the following information:

        Applicant's CV:
        {cv_text}

        Target Position: {job}
        Target Company: {company}

        The cover letter should:
        1. Address the hiring manager directly if possible
        2. Should properly use the correct name of the college where the candidate has studied in/is currently enrolled in. It is usually under the education section.
        2. Highlight relevant skills from the CV
        3. Show enthusiasm for the specific role
        4. Be 3-4 paragraphs long

        Cover Letter:
        """

        response = co.generate(
            model='command',
            prompt=prompt,
            max_tokens=700,
            temperature=0.7,
            k=0,
            stop_sequences=[],
            return_likelihoods='NONE'
        )

        cover_letter = response.generations[0].text.strip()

        print("Cover letter:", cover_letter)


        return jsonify({
            "success": True,
            "cover_letter": cover_letter,
            "job": job,
            "company": company
        }), 200, {'Content-Type': 'application/json'}

    except Exception as e:
        print("Exception occurred:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
