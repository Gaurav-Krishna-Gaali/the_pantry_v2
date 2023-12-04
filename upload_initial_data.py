from main import app, datastore
from application.models import db, Role
from flask_security import hash_password


with app.app_context():
    db.create_all()
    datastore.find_or_create_role(name="admin", description="Administrator")
    datastore.find_or_create_role(name="storemanager", description="StoreManager manages store")
    datastore.find_or_create_role(name="customer", description="Customer is a regular user")
    db.session.commit()
    if not datastore.find_user(email="admin@email.com"):
        datastore.create_user(
            email="admin@email.com",
            password=hash_password("admin123"),
            roles=["admin"],
        )
    if not datastore.find_user(email="storemanager1@email.com"):
        datastore.create_user(
            email="storemanager1@email.com",
            password=hash_password("storemanager123"),
            roles=["storemanager"],
            active=False
        )
    if not datastore.find_user(email="customer1@email.com"):
        datastore.create_user(
            email="customer1@email.com",
            password=hash_password("customer123"),
            roles=["customer"],
        )

    db.session.commit()