# payment.py
from flask import Blueprint, request, jsonify
import stripe
from api.models import db, Payment, Reservation, User
from datetime import datetime

# Definir el blueprint para pagos
payment_bp = Blueprint('payment_bp', __name__)

# Ruta para procesar el pago con Stripe
@payment_bp.route('/api/stripe/pay', methods=['POST'])
def stripe_payment():
    data = request.get_json()

    # Recoger los datos enviados por el cliente
    user_id = data.get('user_id')
    amount = data.get('amount')  # En centavos
    currency = data.get('currency', 'usd')  # Por defecto USD
    stripe_token = data.get('stripe_token')
    service_type = data.get('service_type')
    service_id = data.get('service_id')
    telefono = data.get('telefono')
    direccion = data.get('direccion')

    # Validar que todos los datos necesarios están presentes
    if not all([user_id, amount, stripe_token, service_type, service_id]):
        return jsonify({"error": "Faltan datos requeridos"}), 400

    try:
        # Procesar el pago con Stripe
        charge = stripe.Charge.create(
            amount=amount,
            currency=currency,
            description=f"{service_type.capitalize()} ID {service_id}",
            source=stripe_token
        )

        # Guardar el pago en la base de datos
        payment = Payment(
            currency=currency,
            amount=amount,
            paypal_payment_id=charge.id,  # Usamos el ID de Stripe como "paypal_payment_id"
            user_id=user_id
        )
        db.session.add(payment)
        db.session.flush()

        # Crear la reserva para el usuario
        reservation = Reservation(
            user_id=user_id,
            payment_id=payment.id,
            service_type=service_type,
            service_id=service_id
        )
        db.session.add(reservation)

        # Actualizar los datos del usuario con teléfono y dirección
        user = User.query.get(user_id)
        if user and direccion:
            user.telefono = telefono
            user.direccion_line1 = direccion.get('line1')
            user.direccion_line2 = direccion.get('line2')
            user.ciudad = direccion.get('city')
            user.codigo_postal = direccion.get('postal_code')
            user.pais = direccion.get('country')


        # Guardar todos los cambios
        db.session.commit()

        return jsonify({
            "message": "Pago procesado correctamente",
            "stripe_charge": charge.id,
            "payment": payment.serialize(),
            "reservation": reservation.serialize()
        }), 201

    except stripe.error.StripeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

