roles_users = db.Table('roles_users',
                       db.Column('user_id', db.Integer(),
                                 db.ForeignKey('user.id')),
                       db.Column('role_id', db.Integer(),
                                 db.ForeignKey('role.id')))


class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    wallet = db.Column(db.Integer, default= 1000)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    # roles = db.relationship('Role', secondary=roles_users,
    #                         backref=db.backref('users', lazy='dynamic'))
    role = db.relationship('Role')
    products_created = db.relationship('Products', backref='creater', lazy='dynamic')
    categorys = db.relationship('Category', backref='creater', lazy='dynamic')

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class Products(db.Model):
    id = db.Column(db.Integer, autoincrement = True, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'category.id'), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    creater_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    is_approved = db.Column(db.Boolean(), default=False)

    def __repr__(self):
        return f'<Products {self.name}>'

    def __str__(self):
        return self.name

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, autoincrement = True, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image = db.Column(db.String(255), nullable=True)
    products = db.relationship('Products', backref='category', lazy='dynamic')
    creater_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Category {self.name}>'

    def __str__(self):
        return self.name

class CartItem(db.Model):
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    product = db.relationship('Products', backref='cart_items')
    user = db.relationship('Users', backref='cart_items')


class Orders(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.Boolean, default=False)
    delivery_address = db.Column(db.Text, nullable=False)

    user = db.relationship('Users', backref='orders')
    def __repr__(self):
        return f'<Orders {self.id}>'

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    # Define relationships
    order = db.relationship('Orders', backref=db.backref('order_items', lazy='dynamic'))
    product = db.relationship('Products')

    def __repr__(self):
        return f'<OrderItem {self.id}>'
