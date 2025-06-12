from flask import Flask, request, Response
from twilio.twiml.messaging_response import MessagingResponse
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route("/webhook", methods=["GET", "POST"])
def whatsapp_webhook():
    if request.method == "GET":
        return "✅ Bot en línea", 200

    # Procesa SIN validar firma
    body = request.values.get("Body", "").strip()
    frm  = request.values.get("From", "").strip()
    print(f"DEBUG – de {frm}: {body}")

    # Aquí tu prompt y llamada a OpenAI...
    reply = "Aquí iría la respuesta de tu bot"

    twiml = MessagingResponse()
    twiml.message(reply)
    return Response(str(twiml), mimetype="application/xml")

if __name__ == "__main__":
    app.run(port=int(os.getenv("PORT", 3002)), host="0.0.0.0", debug=True)

