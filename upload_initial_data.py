from main import app
from application.models import db, Role

with app.app_context():
    db.create_all()
# Adminstator for the store
    admin = Role(id='admin', name='Admin' , description='Administrator')
    db.session.add(admin)
# Store Manager
    store_manager = Role(id='store_manager', name='Store Manager' , description='IAM Pivilege to manage store')
    db.session.add(store_manager)
# Customer for the store
    customer = Role(id='customer', name='Customer' , description='User in the store')
    db.session.add(customer)

    try:
        db.session.commit()
    except:
        pass


