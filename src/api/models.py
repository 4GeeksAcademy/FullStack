from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    telefono = db.Column(db.String(20))
    direccion_line1 = db.Column(db.String(120))
    direccion_line2 = db.Column(db.String(120), nullable=True)
    ciudad = db.Column(db.String(80))
    codigo_postal = db.Column(db.String(20))
    pais = db.Column(db.String(50))
    role = db.Column(db.String(50), default='cliente')
    is_active = db.Column(db.Boolean(), default=True)

    # Relación con los servicios
    viajes_list = db.relationship('Viajes', back_populates='user')
    top_list = db.relationship('Top', back_populates='user')
    belleza_list = db.relationship('Belleza', back_populates='user')
    gastronomia_list = db.relationship('Gastronomia', back_populates='user')
    ofertas_list = db.relationship('Ofertas', back_populates='user', lazy='dynamic')

    # Otras relaciones
    payments = db.relationship('Payment', lazy='dynamic', cascade='all, delete-orphan')
    reservations = db.relationship('Reservation', lazy='dynamic', cascade='all, delete-orphan')
    cart = db.relationship('Cart', back_populates='user', uselist=False)

    def __repr__(self):
        return f'<User {self.correo}>'

    def serialize(self):
        return {
            "id": self.id,
            "correo": self.correo,
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
class Ofertas(db.Model):
    __tablename__ = 'ofertas'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    descripcion = db.Column(db.String(500))
    image = db.Column(db.String(255))
    city = db.Column(db.String(100))
    category = db.Column(db.String(100))
    discountPrice = db.Column(db.Float)
    price = db.Column(db.Float)
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    buyers = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    user = db.relationship('User', back_populates='ofertas_list')
    category = db.relationship('Category', back_populates='ofertas_category')
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "descripcion": self.descripcion,
            "image": self.image,
            "city": self.city,
            "discountPrice": self.discountPrice,
            "price": self.price,
            "rating": self.rating,
            "reviews": self.reviews,
            "buyers": self.buyers,
            "user_id": self.user_id,
            "category_id": self.category_id
        }

class Viajes(db.Model):
    __tablename__ = 'viajes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    descripcion = db.Column(db.String(500))
    image = db.Column(db.String(255))
    city = db.Column(db.String(100))
    category = db.Column(db.String(100))
    discountPrice = db.Column(db.Float)
    price = db.Column(db.Float)
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    buyers = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    user = db.relationship('User', back_populates='viajes_list')
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.relationship('Category', back_populates='viajes_category')

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "descripcion": self.descripcion,
            "image": self.image,
            "city": self.city,
            "discountPrice": self.discountPrice,
            "price": self.price,
            "rating": self.rating,
            "reviews": self.reviews,
            "buyers": self.buyers,
            "user_id": self.user_id,
            "category_id": self.category_id
        }


class Top(db.Model):
    __tablename__ = 'top'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    descripcion = db.Column(db.String(500))
    image = db.Column(db.String(255))
    city = db.Column(db.String(100))
    category = db.Column(db.String(100))
    discountPrice = db.Column(db.Float)
    price = db.Column(db.Float)
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    buyers = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    user = db.relationship('User', back_populates='top_list')
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.relationship('Category', back_populates='top_category')

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "descripcion": self.descripcion,
            "image": self.image,
            "city": self.city,
            "discountPrice": self.discountPrice,
            "price": self.price,
            "rating": self.rating,
            "reviews": self.reviews,
            "buyers": self.buyers,
            "user_id": self.user_id,
            "category_id": self.category_id
        }


class Belleza(db.Model):
    __tablename__ = 'belleza'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    descripcion = db.Column(db.String(500))
    image = db.Column(db.String(255))
    city = db.Column(db.String(100))
    category = db.Column(db.String(100))
    discountPrice = db.Column(db.Float)
    price = db.Column(db.Float)
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    buyers = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    user = db.relationship('User', back_populates='belleza_list')
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.relationship('Category', back_populates='belleza_category')

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "descripcion": self.descripcion,
            "image": self.image,
            "city": self.city,
            "discountPrice": self.discountPrice,
            "price": self.price,
            "rating": self.rating,
            "reviews": self.reviews,
            "buyers": self.buyers,
            "user_id": self.user_id,
            "category_id": self.category_id
        }


class Gastronomia(db.Model):
    __tablename__ = 'gastronomia'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    descripcion = db.Column(db.String(500))
    image = db.Column(db.String(255))
    city = db.Column(db.String(100))
    category = db.Column(db.String(100))
    discountPrice = db.Column(db.Float)
    price = db.Column(db.Float)
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    buyers = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    user = db.relationship('User', back_populates='gastronomia_list')
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.relationship('Category', back_populates='gastronomia_category')

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "descripcion": self.descripcion,
            "image": self.image,
            "city": self.city,
            "discountPrice": self.discountPrice,
            "price": self.price,
            "rating": self.rating,
            "reviews": self.reviews,
            "buyers": self.buyers,
            "user_id": self.user_id,
            "category_id": self.category_id
        }


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False, unique=True)
    
    # Relaciones con las otras tablas
    viajes_category = db.relationship('Viajes', back_populates='category', lazy='dynamic')
    top_category = db.relationship('Top', back_populates='category', lazy='dynamic')
    belleza_category = db.relationship('Belleza', back_populates='category', lazy='dynamic')
    gastronomia_category = db.relationship('Gastronomia', back_populates='category', lazy='dynamic')
    
    # Relación con la nueva tabla Ofertas
    ofertas_category = db.relationship('Ofertas', back_populates='category', lazy='dynamic')

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
