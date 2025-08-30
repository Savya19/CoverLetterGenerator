import google.generativeai as genai

genai.configure(api_key="AIzaSyA3s9WWrMm1qLsmn4m3jgos_rIxphs1-oo")

model = genai.GenerativeModel(model_name="gemini-1.5-flash-latest")


response = model.generate_content("Write a short poem about the moon.")
print(response.text)
