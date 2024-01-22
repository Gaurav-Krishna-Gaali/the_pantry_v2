from flask import current_app as app, jsonify, request, render_template
from flask_security import auth_required, roles_required
from .models import User, db, Products, Category, RolesUsers, Role
from .sec import datastore
from werkzeug.security import check_password_hash
from flask_restful import marshal, fields

@app.get('/')
def home():
    return render_template('index.html')

@app.get('/admin')
@auth_required("token")
@roles_required("admin")
def admin():
    return "Hello admin"

@app.get('/activate/storemanager/<int:storemanager_id>')
@auth_required("token")
@roles_required("admin")
def activate_storemanager(storemanager_id):
    storemanager = User.query.get(storemanager_id)
    if not storemanager or 'storemanager' not in storemanager.roles:
        return jsonify({'message': 'storemanager not found'}), 404
    
    storemanager.active = True
    db.session.commit()
    return jsonify({'message': 'storemanager activated'}), 200

@app.get('/activate/category/<int:category_id>')
@auth_required("token")
@roles_required("admin")
def activate_category(category_id):
    category = Category.query.get(category_id)
    if not category :
        return jsonify({'message': 'category not found'}), 404
    
    category.is_approved = True
    db.session.commit()
    return jsonify({'message': 'category activated'}), 200

@app.get('/activate/product/<int:product_id>')
@auth_required("token")
@roles_required("admin")
def activate_product(product_id):
    product = Products.query.get(product_id)
    if not product :
        return jsonify({'message': 'Product not found'}), 404
    
    product.is_approved = True
    db.session.commit()
    return jsonify({'message': 'Product activated'}), 200

@app.post('/user-login')
def Userlogin():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'message': 'email is required'}), 400
    user = datastore.find_user(email=email)

    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    if check_password_hash(user.password, data.get('password')):
        return { "token" : user.get_auth_token(), "email": user.email , "role": user.roles[0].name }
    
    else:
        return jsonify({'message': 'Invalid credentials'}), 400
    

@app.put('/update_product/<int:product_id>')
@auth_required("token")
@roles_required('admin' or 'storemanager') 
def update_product(product_id):
    product = Products.query.get_or_404(product_id)

    data = request.get_json()
    product.name = data.get('name', product.name)
    product.quantity = data.get('quantity', product.quantity)
    product.price = data.get('price', product.price)
    product.image = data.get('image', product.image)

    db.session.commit()

    return jsonify({'message': 'Product updated successfully'})

@app.put('/update_category/<int:category_id>')
@auth_required("token")
@roles_required('admin' or 'storemanager') 
def update_category(category_id):
    category = Category.query.get_or_404(category_id)

    data = request.get_json()
    category.name = data.get('name', category.name)
    category.description = data.get('description', category.description)
    category.image = data.get('image', category.image)

    db.session.commit()

    return jsonify({'message': 'Category updated successfully'})



customer_fields = {
    "id": fields.Integer,
    "username": fields.String,
    "wallet": fields.Integer,
    "email": fields.String,
    "active": fields.Boolean,
    "role": fields.String,

}

@app.get('/customers')
@auth_required("token")
@roles_required("admin")
def all_customers():
    query_result = db.session.query(User, RolesUsers, Role) \
        .join(RolesUsers, User.id == RolesUsers.user_id) \
        .join(Role, RolesUsers.role_id == Role.id) \
        .order_by(User.date_added.desc()).all()

    formatted_results = []
    for user, roles_users, role in query_result:
        user_info = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'wallet': user.wallet,
            'active': user.active,
            'roles': [r.name for r in user.roles],  
        }
        formatted_results.append(user_info)
    
    if len(formatted_results) == 0:
        return jsonify({'message': 'No customers found'}), 404

    return jsonify(formatted_results)

@app.route('/delete/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    current_user_id = User.query.get_or_404(user_id)
    db.session.delete(current_user_id)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})


@app.get('/allproducts')
def test():
    allPro = Products.query.all()
    print(f"products are {allPro}")
    return jsonify(marshal(allPro, customer_fields))
