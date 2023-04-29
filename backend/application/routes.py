import json
from application import app
from flask import request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required
from datetime import datetime, timedelta, timezone
from application.models import User, ClothingItem, Occasion
from flask_login import login_user, logout_user, current_user


@app.route('/')
def home() -> str:
    return 'Hello World'


@app.route('/token', methods=['POST'])
def create_token():
    request_content = request.get_json()

    email = request_content.get('email', None)
    password = request_content.get('password', None)

    # obviously never do this in a real application
    # no srsly guy, this bad
    if email != 'test' or password != 'test':
        response = jsonify({'error': 'wrong email or password'})
        return response

    user = User.query.filter_by(email=email).first()

    login_user(user)

    access_token = create_access_token(identity=email)
    response = jsonify({'token': access_token})

    return response, 200


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]

        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))

        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())

            data = response.get_json()

            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):  # if there is no valid JWT, just return the original respone
        return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "logged out succesfully"})
    unset_jwt_cookies(response)
    logout_user()
    return response


# CLOTHING ITEM ROUTES
# 1. Add
# 2. Remove
# 3. Get Information (ID)

@app.route('/add_cl_to_collection')
@jwt_required()
def add_cl_to_collection():
    """
    Searches for a clothing item given the payload information (see below); if
    the item is in the database, adds it to the user's collection. Else, does
    nothing.

    Expects the following in JSON format:
    - clothing_type: the type of clothing
    - colour: the colour of the clothing
    - pattern: the colour of the clothing

    Returns JSON with the following:
    - success: true if the item was found in the database and added to the
      current user's collection, false otherwise
    """
    json_content = request.get_json()

    information = (json_content.get('clothing_type', None), json_content.get(
        'colour', None), json_content.get('pattern', None))
    if any(info is None for info in information):
        return jsonify({'error': 'bad request'}), 400

    clothing_type, colour, pattern = information

    clothing_search_result = ClothingItem.query.filter_by(
        clothing_type=clothing_type, colour=colour, pattern=pattern).first()

    if clothing_search_result is None:
        return jsonify({'success': False}), 200
    else:
        assert isinstance(current_user, User)
        current_user.clothing_items.append(clothing_search_result)
        return jsonify({'success': True}), 200

# OCCASION ROUTES


@app.route('/get_all_occasions')
def get_all_occasions():
    """
    Returns a list of all possible occasions.
    """
    occasions = Occasion.query.all()

    result = [{'id': occasion.id, 'name': occasion.name}
              for occasion in occasions]

    return jsonify(result), 200
