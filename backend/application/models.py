from flask_login import UserMixin
from application import db, login_manager


@login_manager.user_loader
def load_user(user_id: str):
    return User.query.get(id=int(user_id))


user_clothing_item = db.Table('user_clothing_item', db.Column('user_id',
                                                              db.Integer,
                                                              db.ForeignKey(
                                                                  'user.id')),
                              db.Column('clothing_item_id',
                                        db.Integer,
                                        db.ForeignKey('clothing_item.id')))

clothing_item_outfit = db.Table('clothing_item_outfit', db.Column('clothing_item_id',
                                                                  db.Integer,
                                                                  db.ForeignKey(
                                                                      'clothing_item.id')),
                                db.Column('outfit_id',
                                          db.Integer,
                                          db.ForeignKey('outfit.id')))

clothing_item_occasion = db.Table('clothing_item_occasion', db.Column('clothing_item_id',
                                                                      db.Integer,
                                                                      db.ForeignKey(
                                                                          'clothing_item.id')),
                                  db.Column('occasion_id',
                                            db.Integer,
                                            db.ForeignKey('occasion.id')))

outfit_occasion = db.Table('outfit_occasion', db.Column('outfit_id',
                                                        db.Integer,
                                                        db.ForeignKey(
                                                            'outfit.id')),
                           db.Column('occasion_id',
                                     db.Integer,
                                     db.ForeignKey('occasion.id')))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    clothing_items = db.relationship(
        'ClothingItem', secondary=user_clothing_item, backref='users')
    outfits = db.relationship('Outfit', backref='user', lazy=True)

    def __repr__(self) -> str:
        return f"User('{self.username}')"


class ClothingItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    clothing_type = db.Column(db.String, nullable=False)
    colour = db.Column(db.String, nullable=False)
    pattern = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    occasions = db.relationship(
        'Occasion', secondary=clothing_item_occasion, backref='clothing_items')

    def __repr__(self) -> str:
        return f"ClothingItem('{self.colour} {self.pattern}')"


class Outfit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    favourite = db.Column(db.Boolean, nullable=False)
    image = db.Column(db.String, nullable=False)
    clothes = db.relationship(
        'ClothingItem', secondary=clothing_item_outfit, backref='outfits')
    occasions = db.relationship(
        'Occasion', secondary=outfit_occasion, backref='outfits')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


class Occasion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
