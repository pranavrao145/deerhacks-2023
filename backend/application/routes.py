import json
from application import app
from flask import request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies
from datetime import datetime, timedelta, timezone
from application.models import User
from flask_login import login_user, logout_user

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
