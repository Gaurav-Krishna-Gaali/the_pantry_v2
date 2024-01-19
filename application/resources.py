from flask_restful import Resource, Api, reqparse, marshal_with, fields
from .models import Products, Category, db
from flask import jsonify 
from flask_security import auth_required, roles_required, current_user
from sqlalchemy import or_

api = Api(prefix='/api')

# Store Products parsers
prodparser = reqparse.RequestParser()
prodparser.add_argument('name' , type=str, help='name must be an str')
prodparser.add_argument('quantity' , type=int, help='quantity must be an integer')
prodparser.add_argument('price', type=float, help='price must be a float')
# parser.add_argument('total_amount', type=float, help='total_amount must be a float')

# Store Categories parsers
parser = reqparse.RequestParser()
parser.add_argument('name', type=str, help='name must be a string')
parser.add_argument('description', type=str, help='description must be a string')
parser.add_argument('image', type=str, help='image must be a string')

# Store Cart parsers
cart_parser = reqparse.RequestParser()
cart_parser.add_argument('image', type=str, help='An image prefeably of the product')
cart_parser.add_argument('title', type=str, help='title must be a string')
cart_parser.add_argument('quantiy', type=str, help='quantiy must be a string')

class Creator(fields.Raw):
    def format(self, user):
        return user.email


products_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'quantity': fields.Integer,
    'price': fields.Float,
    'is_approved': fields.Boolean, 
    'creater': Creator
}

class StoreProducts(Resource):
    @marshal_with(products_fields)
    @auth_required("token")
    def get(self):
        if  "storemanager"  in current_user.roles:
            display_product = Products.query.all()
        else:
            display_product = Products.query.all()
            # display_product = Products.query.all(or_(Products.is_approved == True , Products.creator == current_user)).all()
            
        print(f"products are {display_product}")
        if len(display_product) < 0:
            return {'message': 'No products found'}, 404
        return display_product, 200
    
    @auth_required("token")
    @roles_required("storemanager")
    def post(self):
        args = prodparser.parse_args()
        products = Products(name= args.get('name'),quantity= args.get('quantity'),price= args.get('price'), creater_id= current_user.id)
        print(products) 
        db.session.add(products)
        db.session.commit()
        return {"message": "Study Resource Created"}

class StoreCategory(Resource):
    category_fields = {
        'id': fields.Integer,
        'name': fields.String,
        'description': fields.String,
        'image': fields.String,
    }

    @marshal_with(category_fields)
    @auth_required("token")
    def get(self):
        categories = Category.query.all()
        if not categories:
            return {'message': 'No categories found'}, 404
        return categories, 200
    
    @auth_required("token")
    @roles_required("storemanager")
    def post(self):
        args = parser.parse_args()
        category = Category(
            name=args.get('name'),
            description=args.get('description'),
            image=args.get('image')
        )
        db.session.add(category)
        db.session.commit()
        return {"message": "Category created"}
    

class CartResource(Resource):
    cart_fields = {
        'id': fields.Integer,
        'image': fields.String,
        'title': fields.String,
        'quantiy': fields.Integer,
    }

    @marshal_with(cart_fields)
    @auth_required("token")
    def get(self):
        return {"cart": self.cart}

    def post(self, item):
        self.cart.append(item)
        return {"message": f"{item} added to cart"}

api.add_resource(StoreCategory, '/categories')
api.add_resource(StoreProducts, '/products')
api.add_resource(CartResource, '/cart/<int:item>')