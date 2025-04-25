from api.models import db, Factura
from datetime import datetime

def crear_factura(user_id, servicio, monto, metodo_pago):
    nueva_factura = Factura(
        user_id=user_id,
        servicio=servicio,
        monto=monto,
        metodo_pago=metodo_pago,
        fecha=datetime.utcnow()
    )
    db.session.add(nueva_factura)
    db.session.commit()
    return nueva_factura
