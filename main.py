from flask import Flask
from application.models import db, User, Role
from config import DevelopmentConfig
from application.resources import api
from flask_security import Security, SQLAlchemyUserDatastore
from application.sec import datastore
from application.worker import celery_init_app
import flask_excel as excel
from celery.schedules import crontab
from application.tasks import daily_reminder, orders_summary


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app)
    api.init_app(app)
    excel.init_excel(app)
    app.Security = Security(app, datastore)
    with app.app_context():
        import application.views

    return app

app = create_app()
celery_app = celery_init_app(app)

@celery_app.on_after_configure.connect
def send_email(sender, **kwargs):
     sender.add_periodic_task(
        # change based on time
        crontab(hour=10, minute=60, day_of_month=1),
        orders_summary.s('gaali.gk19@gmail.com', 'Order Summary'),
    )

if __name__ == "__main__":
    app.run(debug=True, port=5000)