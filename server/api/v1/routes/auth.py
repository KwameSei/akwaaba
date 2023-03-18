#!/usr/bin/env python3
""" Authorizing user routes """

import datetime
from flask import jsonify, json, make_response, request
from models.engine.database import Session
from models.user import User
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
import jwt
from api.v1.routes import views

db=Session()

@views.route('/login', methods=['POST'], strict_slashes=False)
def login_user():
    """Login a user"""
    # Get the request data

    # auth = request.authorization
    email = request.json.get('email')
    password = request.json.get('password')
    public_id = request.json.get('public_id')

    user = db.query(User).filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        token = create_access_token(identity=user.public_id, expires_delta=datetime.timedelta(minutes=30))
        refresh_token = create_refresh_token(identity=user.public_id, expires_delta=datetime.timedelta(days=30))
        return jsonify({'token':token, 'refresh_token':refresh_token}), 200
    else:
        return jsonify({'message':'Invalid email or password'}), 401
    
    # if not auth or not auth.email or not auth.password:
    #     return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
    
    # user = db.query(User).filter_by(email=auth.email).first()

    # if not user:
    #     return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    # if check_password_hash(user.password, auth.password):
    #     token = create_access_token(identity=user.public_id, expires_delta=datetime.timedelta(minutes=30))
    #     return jsonify({'token': token}), 200
    # else:
    #     return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    # email = request.json.get('email')
    # password = request.json.get('password')

    # if not email or not password:
    #     return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    # # Query the database for the user with the provided email
    # user = db.query(User).filter_by(email=email).first()

    # if user is None:
    #     return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    # # If the user exists and the password is correct, return the user
    # if user is not None and check_password_hash(user.password, password):
    #     user_dict = user.to_dict()
    #     token = jwt.encode({'public_id': user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, views.config['SECRET_KEY'])
        
    #     return jsonify({'user': user_dict, 'token' : token.decode('UTF-8')}), 200
    # else:
    #     return jsonify({'error': 'Invalid email or password'}), 401