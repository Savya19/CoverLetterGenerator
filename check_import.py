import google.generativeai as genai

genai.configure(api_key="AIzaSyA3s9WWrMm1qLsmn4m3jgos_rIxphs1-oo")

models = genai.list_models()

for m in models:
    print(m.name)
