from flask import current_app as app, jsonify
from flask_security import auth_required, roles_required
from .models import User, db

@app.get('/')
def home():
    return "hello world"


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

