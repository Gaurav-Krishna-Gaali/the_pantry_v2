from celery import shared_task

@shared_task(ignore_result=False)
def send_email():
    return "Say Hello"