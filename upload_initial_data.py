from main import app
from application.sec import datastore
from application.models import db, Role
from flask_security import hash_password
from werkzeug.security import generate_password_hash


with app.app_context():
    db.create_all()
    datastore.find_or_create_role(name="admin", description="Administrator")
    datastore.find_or_create_role(name="storemanager", description="StoreManager manages store")
    datastore.find_or_create_role(name="customer", description="Customer is a regular user")
    db.session.commit()
    if not datastore.find_user(email="admin@email.com"):
        datastore.create_user(
            email="admin@email.com",
            password=generate_password_hash("admin123"),
            roles=["admin"],
        )
    if not datastore.find_user(email="storemanager1@email.com"):
        datastore.create_user(
            email="storemanager1@email.com",
            password=generate_password_hash("storemanager123"),
            roles=["storemanager"],
            active=False
        )
    if not datastore.find_user(email="customer1@email.com"):
        datastore.create_user(
            email="customer1@email.com",
            password=generate_password_hash("customer123"),
            roles=["customer"],
        )

    db.session.commit()