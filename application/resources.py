from flask_restful import Resource, Api, reqparse, marshal_with, fields
from .models import Products, Category, db
from flask import jsonify 
from flask_security import auth_required, roles_required, current_user

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
    @auth_required("token")
    def get(self):
        all_products = Products.query.all()
        if len(all_products) < 0:
            return {'message': 'No products found'}, 404
        return all_products, 200
    
    @auth_required("token")
    @roles_required("storemanager")
    def post(self):
        args = parser.parse_args()
        products = Products(name= args.get('name'),quantity= args.get('quantity'),price= args.get('price'), creater_id= current_user.id)
        print(products) 
        db.session.add(products)
        db.session.commit()
        return {"message": "Study Resource Created"}

api.add_resource(StoreProducts, '/products')