from application.models import *
from application import app, db

with app.app_context():
    db.drop_all()

    user = User(username="test", email="test", password="test")
    occasion = Occasion(name="Wedding")
    clothing_item = ClothingItem(
        clothing_type="Sweater", colour="Black", pattern="Striped", image_url="seiofh")

    db.create_all()

    db.session.add(user)
    db.session.add(clothing_item)

    user.clothing_items.append(clothing_item)

    db.session.add(occasion)

    db.session.commit()
