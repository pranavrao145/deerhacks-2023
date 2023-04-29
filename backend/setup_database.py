from application.models import *
from application import app, db

with app.app_context():
    db.drop_all()

    user = User(username="test", email="test", password="test")
    occasion = Occasion(name="Wedding")

    db.create_all()

    db.session.add(user)
    db.session.add(occasion)

    db.session.commit()
