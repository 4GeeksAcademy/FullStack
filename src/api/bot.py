import os
from flask import Flask, request, Response
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client
import openai
from dotenv import load_dotenv

# Carga variables de entorno desde .env
load_dotenv()

# Configuración de credenciales
TWILIO_ACCOUNT_SID   = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN    = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_FROM = os.getenv("TWILIO_WHATSAPP_NUMBER")
OPENAI_API_KEY       = os.getenv("OPENAI_API_KEY")
PORT                 = int(os.getenv("PORT", 3002))

# Inicializar clientes
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
openai.api_key = OPENAI_API_KEY

app = Flask(__name__)

@app.route("/webhook", methods=["GET", "POST"])
def whatsapp_webhook():
    # GET para health check
    if request.method == "GET":
        return "✅ Bot en línea", 200

    # **Deshabilitada la validación de firma para desarrollo**
    # En producción, implementa validación de firma con RequestValidator

    # Datos del mensaje entrante
    data = request.values
    incoming_msg = data.get("Body", "").strip()
    from_number  = data.get("From", "").strip()
    print(f"DEBUG - Mensaje de {from_number}: {incoming_msg}")

    # Prompt optimizado para ChatGPT
    SYSTEM_PROMPT = """
Eres un asistente de ventas de 'Camino al Sí'. Usa solo esta info:

Paquetes (máx. invitados / precio):
• Gold (50 pax / €26 825): 3 platos, cóctel 1,5 h, barra libre 3 h, DJ, coche clásico, noche recién casados.
• Platinum (100 pax / €35 299): Gold + menú gourmet/vegano, barra premium, 5 habitaciones, asesoría.
• Emerald (150 pax / €42 341): Platinum + 4 platos, maquillaje novia, fotógrafo, 5 hab. finca + 3 hotel.
• Diamond (250 pax / €71 124): Emerald + maquillaje acompañantes, 5 hab. noche antes + 8 boda, menú premium.

Proceso:
1. Pregunta estilo, invitados y zona.
2. Informa que precios son orientativos (varían por finca y número).
3. Ofrece cotización de finca y menú; si acepta, avanzamos.

Saluda, califica y propone el paquete más ajustado.
"""

    # Llamada a la API de OpenAI
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system",  "content": SYSTEM_PROMPT},
                {"role": "user",    "content": incoming_msg}
            ]
        )
        reply_text = response.choices[0].message.content.strip()
    except Exception as e:
        print("Error OpenAI:", e)
        reply_text = "Lo siento, no puedo procesar tu solicitud ahora."

    # Construir respuesta TwiML
    twiml = MessagingResponse()
    twiml.message(reply_text)
    return Response(str(twiml), mimetype="application/xml")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)
