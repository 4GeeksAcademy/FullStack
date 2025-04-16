from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    # 1 -> N: lazy = dynamic por el hecho de poder llegar a poder filtrar o paginar
    # Para obtener todos los pagos user.payments.all()
    # Para filtrar y no traer todo los pagos EJEMPLO: user.payments.filter_by(currency='USD').all()
    # delete-orphan permite que al eliminar un payment directamente desde user.payment y al realizar session.commit() borra ese payment de la tabla en la BD
    # esto sirve para dejar hijos sin padres asociados, evitamos tener registros colgados
    payments = db.relationship('Payment', lazy='dynamic', cascade='all, delete-orphan')

    # Relacion 1 -> N
    reservations = db.relationship('Reservation', lazy='dynamic', cascade='all, delete-orphan')

    # Relacion 1 -> N con Service(serian los servicios publicados, no las reservas que se comprarian)
    services = db.relationship('Service', lazy='dynamic', cascade='all')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_active": self.is_active,
            "payments": [payment.serialize() for payment in self.payments]
        }
    
class Payment(db.Model):
    __tablename__ = 'payments'
    id = db.Column(db.Integer, primary_key=True)
    currency = db.Column(db.String(3), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    payment_data = db.Column(db.Date, nullable=False)
    paypal_payment_id = db.Column(db.Integer, nullable=False, unique=True)

    # Foreign Key N:1 con User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relacion 1:1 con Reservation
    reservation = db.relationship('Reservation', back_populates='payment', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "currency": self.currency,
            "amount": self.amount,
            "payment_data": self.payment_data,
            "user_id": self.user_id
        }

class Reservation(db.Model):
    __tablename__ = 'reservations'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.now)

    # Foreign Key N:1 con User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relacion 1:1 con Payment
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.id'), unique=True, nullable=False)
    payment = db.relationship('Payment', back_populates='reservation')

    #Relacion 1:1 con Service
    service = db.relationship('Service', back_populates='reservation', uselist=False)

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(240), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(120), nullable=False)
   
    # Foreign Key N:1 con User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    # Relacion 1:1 con Reservation
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservations.id'), unique=True, nullable=False)
    reservation = db.relationship('Reservation', back_populates='service')

    # Relacion N:1 con Category
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

    # Relacion 1:N con Service
    services = db.relationship('Service', lazy='dynamic', cascade='all, delete-orphan')