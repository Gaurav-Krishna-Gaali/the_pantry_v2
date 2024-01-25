from celery import shared_task
from .models import Products, Category, User, db
import flask_excel as excel
from .mail_service import send_message
from .models import User, Role, OrderItem, Orders
from jinja2 import Template

@shared_task(ignore_result=False)
def create_shop_csv():
    products_results = Products.query.with_entities(Products.name, Products.price, Products.quantity, Products.category_id, Products.creater_id).all()

    csv_output = excel.make_response_from_query_sets(products_results, ["name", "price", "quantity", "category_id", "creater_id"], 'csv')
    filename="product.csv"

    with open(filename, 'wb') as f:
        f.write(csv_output.data)
    return filename

@shared_task(ignore_result=False)
def create_shop_category_csv():
    category_results = Category.query.with_entities(Category.name, Category.description, Products.creater_id).all()
    csv_output = excel.make_response_from_query_sets(category_results, ["name", "description", "creater_id"], 'csv')
    filename="category.csv"

    with open(filename, 'wb') as f:
        f.write(csv_output.data)
    return filename

@shared_task(ignore_result=False)
def create_customer_csv():
    customer_results = User.query.with_entities(User.date_added,User.username, User.email, User.wallet, User.active).all()
    csv_output = excel.make_response_from_query_sets(customer_results, ["date_added", "username", "email", "wallet", "active"], 'csv')
    filename="Users.csv"

    with open(filename, 'wb') as f:
        f.write(csv_output.data)
    return filename

@shared_task(ignore_result=True)
def daily_reminder(to, subject):
    # send_message(to, subject, "hello")
    users = User.query.filter(User.roles.any(Role.name == 'admin')).all()
    for user in users:
        with open('test.html', 'r') as f:
            template = Template(f.read())
            send_message(user.email, subject,
                         template.render(email=user.email))
    return "OK"


def Myorders(user_id):
    all_orders = []
    order_data = db.session.query(Orders, OrderItem, Products)\
    .join(OrderItem, Orders.id == OrderItem.order_id)\
    .join(Products, OrderItem.product_id == Products.id)\
    .filter(Orders.user_id == user_id)\
    .all()
    print(order_data)

    for order, order_item, product in order_data:
    # Access the data from each table
        order_id = order.id
        order_date = order.order_date
        total_amount = order.total_amount
        status = order.status
        delivery_address = order.delivery_address

        order_item_id = order_item.id
        quantity = order_item.quantity

        product_id = product.id
        product_name = product.name
        product_description = product.description
        product_price = product.price

        order_object = {
            "order_id": order_id,
            "order_date": order_date,
            "total_amount": total_amount,
            "status": status,
            "delivery_address": delivery_address,
            "order_item_id": order_item_id,
            "quantity": quantity,
            "product_id": product_id,
            "product_name": product_name,
            "product_description": product_description,
            "product_price": product_price
        }

        all_orders.append(order_object)
        
    return all_orders

@shared_task(ignore_result=True)
def orders_summary(to, subject):
    # users = User.query.filter(User.roles.any(Role.name == 'customer')).all()
    users = User.query.all()
    for user in users:
        upcoming = Myorders(user.id)
        with open('test.html', 'r') as f:
            template = Template(f.read())
            send_message(user.email, subject,
                         template.render(upcoming=upcoming, user = user))

