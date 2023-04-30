import json
from application import app, db
from flask import request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required
from datetime import datetime, timedelta, timezone
from application.models import User, ClothingItem, Occasion


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

    access_token = create_access_token(identity=user.id)
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
    return response


# CLOTHING ITEM ROUTES


@app.route('/add_cl_to_collection', methods=['POST'])
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
    - occasions: array of names of occasions for which this clothing is suitable

    Returns JSON with the following:
    - success: true if the item was found in the database and added to the
      current user's collection, false otherwise
    """
    json_content = request.get_json()

    information = (json_content.get('clothing_type', None), json_content.get(
        'colour', None), json_content.get('pattern', None))

    if any(info is None for info in information):
        print('teshtoieshithesiothiseoth')
        return jsonify({'error': 'bad request'}), 400

    clothing_type, colour, pattern = information

    clothing_search_result = ClothingItem.query.filter(
        ClothingItem.clothing_type == clothing_type, ClothingItem.colour ==
        colour, ClothingItem.pattern == pattern).first()

    if clothing_search_result is None:
        return jsonify({'success': False}), 200
    else:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        current_user.clothing_items.append(clothing_search_result)
        db.session.commit()
        return jsonify({'success': True}), 200


@ app.route('/upload_image')
def upload_image():
    """
    Uploads the image in the JSON payload to a S3 bucket on the cloud and returns a link to the asset.

    Expects the following in JSON format:
    - image: the image to upload

    Returns in JSON format:
    - asset_url: The link to the asset on the cloud
    """
    # TODO: unhardcode
    return jsonify({'asset_url': 'https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3'}), 200


@ app.route('/add_cl_to_database')
@ jwt_required()
def add_cl_to_database():
    """
    Adds a piece of clothing to the database with the given payload information (see below).
    This function assumes that the piece of clothing does not already exist in the database.

    Expects the following in JSON format:
    - image_url: a link to the image for this clothing
    - clothing_type: the type of clothing
    - colour: the colour of the clothing
    - pattern: the colour of the clothing
    - occasions: array of names of occasions for which this clothing is suitable

    Returns nothing.
    """
    json_content = request.get_json()

    information = (json_content.get('image_url', None), json_content.get('clothing_type', None), json_content.get(
        'colour', None), json_content.get('pattern', None), json_content.get('occasions', None))

    if any(info is None for info in information):
        return jsonify({'error': 'bad request'}), 400

    image_url, clothing_type, colour, pattern, occasions = information

    new_clothing_item = ClothingItem(
        image_url=image_url, clothing_type=clothing_type, colour=colour, pattern=pattern, occasions=occasions)

    db.session.add(new_clothing_item)
    db.session.commit()

    return jsonify({}), 200


@ app.route('/remove_cl_from_collection/<int:clothing_item_id>', methods=['POST'])
@ jwt_required()
def remove_cl_from_collection(clothing_item_id):
    """
    Parameters:
    - clothing_item_id: the id of the clothing item to remove from the user's collection

    Removes the clothing item with the given clothing_item_id from the current
    user's collection. This function assumes that a clothing item
    with the given clothing_item_id exists in the database and is in the
    current user's collection.
    """
    clothing_item = ClothingItem.query.get(clothing_item_id)

    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    assert clothing_item in current_user.clothing_items

    current_user.clothing_items.remove(clothing_item)

    return jsonify({}), 200


@ app.route('/get_cl_info/<int:clothing_item_id>')
@ jwt_required()
def get_cl_info(clothing_item_id):
    """
    Returns all possible information about the clothing item
    with the given clothing ID. This function assumes a
    clothing item with the given clothing ID exists in the
    database.

    Returns in JSON format:
    - image_url: a link to the image for this clothing
    - clothing_type: the type of clothing
    - colour: the colour of the clothing
    - pattern: the colour of the clothing
    - occasions: array of names of occasions for which this clothing is suitable
    """
    clothing_item = ClothingItem.query.get(clothing_item_id)

    return jsonify({
        'image_url': clothing_item.image_url,
        'clothing_type': clothing_item.clothing_type,
        'colour': clothing_item.colour,
        'pattern': clothing_item.pattern,
        'occasions': clothing_item.occasions,
    }), 200


@ app.route('/get_all_occasions')
def get_all_occasions():
    """
    Returns a list of all possible occasions.
    """
    occasions = Occasion.query.all()

    result = [{'id': occasion.id, 'name': occasion.name}
              for occasion in occasions]

    return jsonify(result), 200
