from celery import shared_task
from .models import Products, Category, User
import flask_excel as excel

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

@shared_task(ignore_result=False)
def daily_reminder(message):
    # users = User.query.filter(User.roles.any(Role.name == 'admin')).all()
    # for user in users:
    #     with open('test.html', 'r') as f:
    #         template = Template(f.read())
    #         send_message(user.email, subject,
    #                      template.render(email=user.email))
    # return "OK"
    return message