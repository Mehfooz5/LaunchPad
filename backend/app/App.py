from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import google.generativeai as genai
import re
import requests
import tempfile
from PyPDF2 import PdfReader
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Path to your frontend
frontend_path = r'D:\projects\LaunchPad\frontend\src\pages'  # Ensure this path is correct

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)

# Configure Gemini AI
api_key = os.getenv('GOOGLE_API_KEY')
if not api_key:
    raise ValueError("API key not found. Please set GOOGLE_API_KEY in your .env file")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/generate-signed-url', methods=['GET'])
def generate_signed_url():
    file_url = request.args.get('fileName')
    if not file_url:
        return jsonify({'error': 'No file URL provided'}), 400
    
    try:
        # For direct download, just return the URL itself
        # In a production environment, you might want to generate actual signed URLs
        # with expiration for security if using a cloud provider like AWS or GCP
        return jsonify({'signedUrl': file_url})
    except Exception as e:
        return jsonify({'error': f'Error generating signed URL: {str(e)}'}), 500

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    print("Received Data:", data)  # Log the received data

    pdf_url = data.get("pdfUrl")  # Make sure this matches your frontend key name

    if not pdf_url:
        return jsonify({'summary': "❌ PDF URL is missing"}), 400

    try:
        # Download PDF from Cloudinary URL
        pdf_response = requests.get(pdf_url)
        pdf_response.raise_for_status()

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
            tmp_file.write(pdf_response.content)
            tmp_file_path = tmp_file.name

        # Extract text from PDF
        reader = PdfReader(tmp_file_path)
        pdf_text = ""
        for page in reader.pages:
            pdf_text += page.extract_text() or ""

        if not pdf_text.strip():
            return jsonify({'summary': "❌ No text found in PDF."})

        # Summarize using Gemini
        gemini_response = model.generate_content(f"Summarize this PDF content:\n\n{pdf_text}")
        cleaned = clean_response(gemini_response.text.strip())

        return jsonify({'summary': cleaned})

    except Exception as e:
        return jsonify({'summary': f"❌ Error processing PDF: {str(e)}"}), 500
    finally:
        # Clean up temporary file
        if 'tmp_file_path' in locals() and os.path.exists(tmp_file_path):
            os.unlink(tmp_file_path)

def clean_response(text):
    """
    Cleans and structures the AI response text.
    """
    text = re.sub(r'^#+\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'(?<!^)\s*(At Home:|Transportation:|Shopping & Consumption:|Other:)', r'\n\n\1', text)
    text = re.sub(r'^\s*[\*\-]\s+', r'\n- ', text, flags=re.MULTILINE)
    text = re.sub(r'\*+', '', text)
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'\n{2,}', '\n\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()

if __name__ == '__main__':
    app.run(debug=True)