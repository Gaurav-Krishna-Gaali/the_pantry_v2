class Config(object):
    DEBUG = False
    TESTING = False

    # SECRET_KEY = "thisissecter"
    # SECURITY_PASSWORD_SALT = "thisissaltt"
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
    # WTF_CSRF_ENABLED = False
    # SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'

class DevelopmentConfig(Config): 
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'

