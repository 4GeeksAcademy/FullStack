from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    correo = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(50), default='cliente')
    is_active = db.Column(db.Boolean(), default=True)

    payments = db.relationship('Payment', lazy='dynamic', cascade='all, delete-orphan')
    reservations = db.relationship('Reservation', lazy='dynamic', cascade='all, delete-orphan')

    cart = db.relationship('Cart', back_populates='user', uselist=False)

    def __repr__(self):
        return f'<User {self.correo}>'

    def serialize(self):
        return {
            "id": self.id,
            "correo": self.correo,
            "nombre": self.nombre,
            "role": self.role,
            "is_active": self.is_active
        }
    
class Newsletter(db.Model):
    __tablename__ = 'newsletter'

    id = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "correo": self.correo
        }

class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    currency = db.Column(db.String(3), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    paypal_payment_id = db.Column(db.String(255), unique=True, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reservation = db.relationship('Reservation', back_populates='payment', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "currency": self.currency,
            "amount": self.amount,
            "payment_date": self.payment_date,
            "user_id": self.user_id
        }

class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.id'), unique=True)
    payment = db.relationship('Payment', back_populates='reservation')

    # Relación polimórfica
    service_type = db.Column(db.String(50), nullable=False)  # 'viajes', 'top', 'belleza', 'gastronomia'
    service_id = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "user_id": self.user_id,
            "service_type": self.service_type,
            "service_id": self.service_id
        }

class Viajes(db.Model):
    __tablename__ = 'viajes'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(240), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    ubicacion = db.Column(db.String(120), nullable=False)
    horarios = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "ubicacion": self.ubicacion,
            "horarios": self.horarios,
            "user_id": self.user_id,
            "category_id": self.category_id
        }

class Top(db.Model):
    __tablename__ = 'top'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(240), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    ubicacion = db.Column(db.String(120), nullable=False)
    horarios = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "ubicacion": self.ubicacion,
            "horarios": self.horarios,
            "user_id": self.user_id,
            "category_id": self.category_id
        }

class Belleza(db.Model):
    __tablename__ = 'belleza'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(240), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    ubicacion = db.Column(db.String(120), nullable=False)
    horarios = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "ubicacion": self.ubicacion,
            "horarios": self.horarios,
            "user_id": self.user_id,
            "category_id": self.category_id
        }

class Gastronomia(db.Model):
    __tablename__ = 'gastronomia'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(240), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    ubicacion = db.Column(db.String(120), nullable=False)
    horarios = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "ubicacion": self.ubicacion,
            "horarios": self.horarios,
            "user_id": self.user_id,
            "category_id": self.category_id
        }


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False, unique=True)
    
    viajes = db.relationship('Viajes', backref='category', lazy='dynamic')
    top = db.relationship('Top', backref='category', lazy='dynamic')
    belleza = db.relationship('Belleza', backref='category', lazy='dynamic')
    gastronomia = db.relationship('Gastronomia', backref='category', lazy='dynamic')

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre
        }

class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    
    user = db.relationship('User', back_populates='cart')

    cart_services = db.relationship('CartService', back_populates='cart', cascade='all, delete-orphan')
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "items": [cs.serialize() for cs in self.cart_services]
        }

class CartService(db.Model):
    __tablename__ = 'cart_services'

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    service_type = db.Column(db.String(50), nullable=False)
    service_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    cart = db.relationship('Cart', back_populates='cart_services')
    
    def serialize(self):
        return {
            "id": self.id,
            "cart_id": self.cart_id,
            "service_type": self.service_type,
            "service_id": self.service_id,
            "quantity": self.quantity
        }