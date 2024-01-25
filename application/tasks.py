from celery import shared_task
from .models import Products
import flask_excel as excel

@shared_task(ignore_result=False)
def create_shop_csv():
    products_results = Products.query.with_entities(Products.name, Products.price).all()

    csv_output = excel.make_response_from_query_sets(products_results, ["name", "price"], 'csv')
    filename="products.csv"

    with open(filename, 'wb') as f:
        f.write(csv_output.data)
    return filename