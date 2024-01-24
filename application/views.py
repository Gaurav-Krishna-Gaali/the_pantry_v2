from flask import current_app as app, jsonify, request, render_template, flash
from flask_security import auth_required, roles_required, current_user, roles_accepted
from .models import User, db, Products, Category, RolesUsers, Role, OrderItem, Orders, CartItem, User
from .sec import datastore
from werkzeug.security import check_password_hash, generate_password_hash
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
        print(f" ( 'token' : {user.get_auth_token()}, 'email': {user.email} , 'role': {user.roles[0].name }")
        return { "token" : user.get_auth_token(), "email": user.email , "role": user.roles[0].name }
    
    else:
        print(f" ( 'token' : {user.get_auth_token()}, 'email': {user.email} , 'role': {user.roles[0].name }")
        return jsonify({'message': 'Invalid credentials'}), 400

@app.post('/create_user')
def create_user_func():
    data = request.get_json()
    password = data.get('password')
    email = data.get('email')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = datastore.find_user(email=email)
    
    if user:
        return jsonify({'message': 'User already exists'}), 409
    user = datastore.create_user(
        email=data.get('email'),
        username = data.get('username'),
        password=generate_password_hash(data.get('password')),
        roles=[data.get('role')],
        active=True if data.get('role') == 'customer' else False

    )
    datastore.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.put('/update_product/<int:product_id>')
@auth_required("token")
@roles_accepted('storemanager', 'admin') 
def update_product(product_id):
    product = Products.query.get_or_404(product_id)
    product.is_approved = False

    data = request.get_json()
    product.name = data.get('name', product.name)
    product.quantity = data.get('quantity', product.quantity)
    product.category_id = data.get('category_id', product.category_id)
    product.price = data.get('price', product.price)
    product.image = data.get('image', product.image)

    db.session.commit()

    return jsonify({'message': 'Product updated successfully'})

@app.put('/update_category/<int:category_id>')
@auth_required("token")
@roles_accepted('storemanager', 'admin') 
def update_category(category_id):
    category = Category.query.get_or_404(category_id)
    category.is_approved = False

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

@auth_required("token")
@app.route('/remove_from_cart/<int:item_id>', methods=['POST'])
def remove_from_cart(item_id):
    item_in_cart = CartItem.query.filter_by(
        user_id=current_user.id, product_id=item_id).all()
    cart_items_to_delete = []

    # Add cart items to the list
    for cart_item in item_in_cart:
        cart_items_to_delete.append(cart_item)

    print(item_in_cart)

    for cart_item in cart_items_to_delete:
        db.session.delete(cart_item)
    db.session.commit()
    return jsonify({'message': 'Item removed successfully'})

@auth_required("token")
@app.route('/Checkout', methods=['POST', 'GET'])
def Checkout():
    user = User.query.get(current_user.id)
    wallet = user.wallet
    cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
    print(f"The placed items are: {cart_items}")

    for cart_item in cart_items:
        product = Products.query.get(cart_item.product_id)
        if product.quantity < cart_item.quantity:
            flash(f'Insufficient inventory for product: {product.name}', 'error')
            return jsonify({'message': 'Order placement failed due to insufficient inventory.'}), 400


    total_amount = sum(cart_item.product.price * cart_item.quantity for cart_item in cart_items)
    print(f"Total amount: {total_amount}")

    if wallet >= total_amount:
        wallet -= total_amount
        user.wallet = wallet
        db.session.commit()

        if cart_items:
            order = Orders(
                user_id=current_user.id,
                total_amount=total_amount,
                status=False, 
                delivery_address='home'# You can set the delivery address as needed
            )

            db.session.add(order)
            db.session.commit()

            for cart_item in cart_items:
                order_item = OrderItem(
                    order_id=order.id,  
                    product_id=cart_item.product_id,
                    quantity=cart_item.quantity
                )
                db.session.add(order_item)
                db.session.commit()

                # reducing inventory
                product = Products.query.get(cart_item.product_id)
                product.quantity -= cart_item.quantity
                db.session.commit()

            # Clear the cart after placing the order
            CartItem.query.filter_by(user_id=current_user.id).delete()
            db.session.commit()

            flash('Order placed successfully!', 'success')
        else:
            flash('Your cart is empty.', 'info')

    else:
        flash('No Sufficient balance')
    return jsonify({'message': 'Order placed successfully!'}), 200

@app.get('/allproducts')
def test():
    allPro = Products.query.all()

    print(f"products are {allPro}")
    return jsonify(marshal(allPro, customer_fields))

