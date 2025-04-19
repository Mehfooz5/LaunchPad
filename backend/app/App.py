from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import google.generativeai as genai
import re

frontend_path = r'D:\Hacakthon\EcoCart\frontend\pages'

app = Flask(__name__)
CORS(app)

api_key = "AIzaSyDtIm6DMPRGOGuToIeycAkLX3xBDMpTAfI"
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/')
def home():
    return send_from_directory(frontend_path, 'chatbot.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get('question', '')
    try:
        response = model.generate_content(question)
        cleaned_response = clean_response(response.text.strip())
        return jsonify({'answer': cleaned_response})
    except Exception as e:
        return jsonify({'answer': f"❌ Request error: {str(e)}"})

# 📍 Paste the new clean_response function here
# Function to clean and structure the response
def clean_response(text):
    # Remove markdown headers like ## or #
    text = re.sub(r'^#+\s*', '', text, flags=re.MULTILINE)

    # Add a new line before key sections
    text = re.sub(r'(?<!^)\s*(At Home:|Transportation:|Shopping & Consumption:|Other:)', r'\n\n\1', text)

    # Replace bullet points * or - with newline and dash
    text = re.sub(r'^\s*[\*\-]\s+', r'\n- ', text, flags=re.MULTILINE)

    # Remove asterisks used for emphasis
    text = re.sub(r'\*+', '', text)

    # Remove HTML tags
    text = re.sub(r'<.*?>', '', text)

    # Normalize spacing
    text = re.sub(r'\n{2,}', '\n\n', text)  # double line breaks between sections
    text = re.sub(r'[ \t]+', ' ', text)

    return text.strip()


if __name__ == '__main__':
    app.run(debug=True)