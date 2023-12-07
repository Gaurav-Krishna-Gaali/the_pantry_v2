from flask import current_app as app, jsonify, request, render_template
from flask_security import auth_required, roles_required
from .models import User, db
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

customer_fields = {
    "id": fields.Integer,
    "email": fields.String,
    "active": fields.Boolean
}

@app.get('/customers')
@auth_required("token")
@roles_required("admin")
def all_customers():
    Allcustomers = User.query.all()
    if len(Allcustomers) == 0:
        return jsonify({'message': 'No customers found'}), 404
    return jsonify(marshal(Allcustomers, customer_fields))