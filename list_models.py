import google.generativeai as genai
from flask.cli import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("api_key")

genai.configure(api_key=API_KEY)

print("Available models:")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"  - {m.name}")
except Exception as e:
    print(f"Error: {e}")
    print("\nPlease check:")
    print("1. Your API key is valid")
    print("2. You're using a Google AI Studio API key (not Vertex AI)")
    print("3. Get your key from: https://makersuite.google.com/app/apikey")
