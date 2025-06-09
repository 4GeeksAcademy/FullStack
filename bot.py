# bot.py
import os
from flask import Flask, request, Response
from twilio.twiml.messaging_response import MessagingResponse
import requests

from dotenv import load_dotenv
load_dotenv()

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_NUMBER = os.getenv("TWILIO_WHATSAPP_NUMBER")  # e.g. "whatsapp:+14155238886"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PORT = int(os.getenv("PORT", 5000))

app = Flask(__name__)

def obtener_respuesta_chatgpt(prompt: str) -> str:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "Eres un asistente útil para clientes de bodas."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 400,
        "temperature": 0.7
    }
    try:
        r = requests.post(url, json=payload, headers=headers)
        r.raise_for_status()
        data = r.json()
        return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print("Error llamando a OpenAI:", e)
        return "Lo siento, ha ocurrido un error y no puedo responder en este momento."

@app.route("/whatsapp", methods=["POST"])
def whatsapp_bot():
    texto_entrante = request.form.get("Body", "")
    from_number = request.form.get("From", "")
    print(f"Mensaje entrante de {from_number}: {texto_entrante}")

    respuesta_chatgpt = obtener_respuesta_chatgpt(texto_entrante)

    msg = MessagingResponse()
    msg.message(respuesta_chatgpt)
    return Response(str(msg), mimetype="text/xml")

@app.route("/")
def index():
    return "Bot de WhatsApp Camino al Sí activo."

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
