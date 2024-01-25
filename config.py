class Config(object):
    DEBUG = False
    TESTING = False

 

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    SECRET_KEY = "thisissecter"
    SECURITY_PASSWORD_SALT = "thisissaltt"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'
    SMTP_SERVER = 'localhost'
    SMTP_PORT = 1025
    SENDER_EMAIL = '21f2000631@study.iitm.ac.in'
