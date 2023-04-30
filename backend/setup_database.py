from application.models import *
from application import app, db

with app.app_context():
    db.drop_all()

    user = User(username="test", email="test", password="test")
    occasion = Occasion(name="Wedding")
    clothing_item_1 = ClothingItem(
        clothing_type="Sweater", colour="Black", pattern="Striped", image_url="seiofh")
    clothing_item_2 = ClothingItem(
        clothing_type="T-Shirt", colour="Black", pattern="Striped", image_url="seiofh")

    db.create_all()

    db.session.add(user)
    db.session.add(clothing_item_1)
    db.session.add(clothing_item_2)

    user.clothing_items.append(clothing_item_1)
    user.clothing_items.append(clothing_item_2)

    outfit = Outfit(favourite=True, image_url="https://static.wikia.nocookie.net/amogus/images/c/cb/Susremaster.png/",
                    clothes=[clothing_item_1, clothing_item_2])

    user.outfits.append(outfit)

    db.session.add(occasion)

    db.session.commit()
