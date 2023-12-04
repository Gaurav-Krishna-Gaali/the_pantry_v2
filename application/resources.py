from flask_restful import Resource, Api, reqparse, marshal_with, fields
from .models import Products, Category, db
from flask import jsonify 

api = Api(prefix='/api')

parser = reqparse.RequestParser()
parser.add_argument('name' , type=str, help='name must be an str')
parser.add_argument('quantity' , type=int, help='quantity must be an integer')
parser.add_argument('price', type=float, help='price must be a float')
# parser.add_argument('total_amount', type=float, help='total_amount must be a float')

products_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'quantity': fields.Integer,
    'price': fields.Float
}

class StoreProducts(Resource):
    @marshal_with(products_fields)
    def get(self):
        all_products = Products.query.all()
        if len(all_products) < 0:
            return {'message': 'No products found'}, 404
        return all_products, 200
    
    def post(self):
        args = parser.parse_args()
        products = Products(**args)
        db.session.add(products)
        db.session.commit()
        pass

api.add_resource(StoreProducts, '/products')




user_parser = reqparse.RequestParser()
user_parser.add_argument('username', type=str, help='Username must be a string')
user_parser.add_argument('email', type=str, help='Email must be a string')
user_parser.add_argument('password', type=str, help='Password must be a string')
user_parser.add_argument('active', type=bool, help='Active must be a boolean')
user_parser.add_argument('wallet', type=int, help='Wallet must be an integer')
user_parser.add_argument('role_id', type=int, help='Role ID must be an integer')

role_parser = reqparse.RequestParser()
role_parser.add_argument('name', type=str, help='Name must be a string')
role_parser.add_argument('description', type=str, help='Description must be a string')

products_parser = reqparse.RequestParser()
products_parser.add_argument('name', type=str, help='Name must be a string')
products_parser.add_argument('description', type=str, help='Description must be a string')
products_parser.add_argument('price', type=float, help='Price must be a float')
products_parser.add_argument('quantity', type=int, help='Quantity must be an integer')
products_parser.add_argument('image', type=str, help='Image must be a string')
products_parser.add_argument('is_approved', type=bool, help='Is approved must be a boolean')

category_parser = reqparse.RequestParser()
category_parser.add_argument('name', type=str, help='Name must be a string')
category_parser.add_argument('description', type=str, help='Description must be a string')
category_parser.add_argument('image', type=str, help='Image must be a string')

cart_item_parser = reqparse.RequestParser()
cart_item_parser.add_argument('user_id', type=int, help='User ID must be an integer')
cart_item_parser.add_argument('product_id', type=int, help='Product ID must be an integer')
cart_item_parser.add_argument('quantity', type=int, help='Quantity must be an integer')

orders_parser = reqparse.RequestParser()
orders_parser.add_argument('user_id', type=int, help='User ID must be an integer')
orders_parser.add_argument('total_amount', type=float, help='Total amount must be a float')
orders_parser.add_argument('status', type=bool, help='Status must be a boolean')
orders_parser.add_argument('delivery_address', type=str, help='Delivery address must be a string')

order_item_parser = reqparse.RequestParser()
order_item_parser.add_argument('order_id', type=int, help='Order ID must be an integer')
order_item_parser.add_argument('product_id', type=int, help='Product ID must be an integer')
order_item_parser.add_argument('quantity', type=int, help='Quantity must be an integer')

# Response Fields
user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
    'password': fields.String,
    'active': fields.Boolean,
    'wallet': fields.Integer,
    'date_added': fields.DateTime,
    'fs_uniquifier': fields.String,
    'role_id': fields.Integer
}

role_fields = {
    'id': fields.String,
    'name': fields.String,
    'description': fields.String
}

products_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'price': fields.Float,
    'quantity': fields.Integer,
    'image': fields.String,
    'is_approved': fields.Boolean
}

category_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'image': fields.String
}

cart_item_fields = {
    'id': fields.Integer,
    'user_id': fields.Integer,
    'product_id': fields.Integer,
    'quantity': fields.Integer
}

orders_fields = {
    'id': fields.Integer,
    'user_id': fields.Integer,
    'order_date': fields.DateTime,
    'total_amount': fields.Float,
    'status': fields.Boolean,
    'delivery_address': fields.String
}

order_item_fields = {
    'id': fields.Integer,
    'order_id': fields.Integer,
    'product_id': fields.Integer,
    'quantity': fields.Integer
}

api.add_resource(StoreProducts, '/products', endpoint='products', resource_class_kwargs={'parser': products_parser, 'fields': products_fields})
api.add_resource(StoreUsers, '/users', endpoint='users', resource_class_kwargs={'parser': user_parser, 'fields': user_fields})
api.add_resource(StoreRoles, '/roles', endpoint='roles', resource_class_kwargs={'parser': role_parser, 'fields': role_fields})
api.add_resource(StoreCategories, '/categories', endpoint='categories', resource_class_kwargs={'parser': category_parser, 'fields': category_fields})
api.add_resource(StoreCartItems, '/cart_items', endpoint='cart_items', resource_class_kwargs={'parser': cart_item_parser, 'fields': cart_item_fields})
api.add_resource(StoreOrders, '/orders', endpoint='orders', resource_class_kwargs={'parser': orders_parser, 'fields': orders_fields})
api.add_resource(StoreOrderItems, '/order_items', endpoint='order_items', resource_class_kwargs={'parser': order_item_parser, 'fields': order_item_fields})


from flask_restful import Resource, reqparse, fields, marshal_with, abort
from models import (
    OrderItems, Orders, CartItem, Category, Role, User, Products
)
from parsers import (
    order_item_parser, orders_parser, cart_item_parser,
    category_parser, role_parser, user_parser, products_parser
)
from fields import (
    order_item_fields, orders_fields, cart_item_fields,
    category_fields, role_fields, user_fields, products_fields
)

# Assume that you have an authentication mechanism, and the current_user variable is available
# You may need to modify this based on your actual authentication implementation

# Example authentication middleware
def authenticate(func):
    def wrapper(*args, **kwargs):
        if not current_user.has_permission(func.__name__):
            abort(403, message='You do not have permission to access this resource.')
        return func(*args, **kwargs)
    return wrapper

class StoreOrderItems(Resource):
    method_decorators = [authenticate]

    @marshal_with(order_item_fields)
    def get(self):
        all_order_items = OrderItems.query.all()
        return all_order_items, 200

    def post(self):
        args = order_item_parser.parse_args()
        order_item = OrderItems(**args)
        db.session.add(order_item)
        db.session.commit()
        return {'message': 'Order item added successfully'}, 201

class StoreOrders(Resource):
    method_decorators = [authenticate]

    @marshal_with(orders_fields)
    def get(self):
        all_orders = Orders.query.all()
        return all_orders, 200

    def post(self):
        args = orders_parser.parse_args()
        order = Orders(**args)
        db.session.add(order)
        db.session.commit()
        return {'message': 'Order added successfully'}, 201

class StoreCartItems(Resource):
    method_decorators = [authenticate]

    @marshal_with(cart_item_fields)
    def get(self):
        all_cart_items = CartItem.query.all()
        return all_cart_items, 200

    def post(self):
        args = cart_item_parser.parse_args()
        cart_item = CartItem(**args)
        db.session.add(cart_item)
        db.session.commit()
        return {'message': 'Cart item added successfully'}, 201

class StoreCategories(Resource):
    method_decorators = [authenticate]

    @marshal_with(category_fields)
    def get(self):
        all_categories = Category.query.all()
        return all_categories, 200

    def post(self):
        args = category_parser.parse_args()
        category = Category(**args)
        db.session.add(category)
        db.session.commit()
        return {'message': 'Category added successfully'}, 201

class StoreRoles(Resource):
    method_decorators = [authenticate]

    @marshal_with(role_fields)
    def get(self):
        all_roles = Role.query.all()
        return all_roles, 200

    def post(self):
        args = role_parser.parse_args()
        role = Role(**args)
        db.session.add(role)
        db.session.commit()
        return {'message': 'Role added successfully'}, 201

class StoreUsers(Resource):
    method_decorators = [authenticate]

    @marshal_with(user_fields)
    def get(self):
        all_users = User.query.all()
        return all_users, 200

    def post(self):
        args = user_parser.parse_args()
        user = User(**args)
        db.session.add(user)
        db.session.commit()
        return {'message': 'User added successfully'}, 201

class StoreProducts(Resource):
    method_decorators = [authenticate]

    @marshal_with(products_fields)
    def get(self):
        all_products = Products.query.all()
        return all_products, 200

    def post(self):
        args = products_parser.parse_args()
        product = Products(**args)
        db.session.add(product)
        db.session.commit()
        return {'message': 'Product added successfully'}, 201


