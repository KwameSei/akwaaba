#!/usr/bin/env python3
""" Creating user routes """

import datetime
from flask import jsonify, json, make_response, request
from sqlalchemy.exc import IntegrityError
from models.engine.database import Session
from models.user import User
import uuid
# from token import token_required, current_user
from api.v1.routes.token import token_required
from werkzeug.security import generate_password_hash, check_password_hash
from api.v1.routes import views

db=Session()

@views.route('/users', methods=['GET'], strict_slashes=False)
# @token_required
def get_users():
    """Get all users"""

    # if not current_user.is_admin:
    #     return jsonify({'error': 'Not authorized to perform this action'})
    
    users = db.query(User).order_by(User.id.asc()).all()

    user_list = []
    for user in users:
        user_dict = user.to_dict()
        user_list.append(user_dict)

    # Serialize the list of dictionaries to JSON and return the response
    response_data = json.dumps(user_list, default=str)
    return make_response(response_data, 200)

@views.route('/single_user/<int:id>', methods=['GET'], strict_slashes=False)
@token_required
def get_user(current_user, public_id):
    """Get a single user by their id"""

    if not current_user.is_admin:
        return jsonify({'error': 'Not authorized to perform this action'})
    
    user=db.query(User).get(public_id)
    if user is not None:
        user_dict = user.to_dict()
        return jsonify(user_dict)
    else:
        return jsonify({'error': 'User not found'})

@views.route('/sign-up', methods=["POST"], strict_slashes=False)
# @token_required
def create_user():
    """Create a new user"""

    # if not current_user.is_admin:
    #     return jsonify({'error': 'Not authorized to perform this action'})

    # Validate the input data
    email = request.json.get('email')
    password = request.json.get('password')
    username = request.json.get('username')

    user = db.query(User).filter_by(email=email).first()

    if user is not None:
        return make_response(jsonify({"message": f"Email address {email} with username {username} already in exists"}), 409)
    
    if not email or not password or not username:
        return make_response(jsonify({"message": "Missing required fields"}), 400)

    # Hash the password
    hashed_password = generate_password_hash(password, method='sha256')

    # Create the new user
    public_id = str(uuid.uuid4())
    current_timestamp = datetime.datetime.utcnow()
    new_user = User(
        public_id=public_id,
        email=email,
        password=hashed_password,
        username=username,
        phone=request.json.get('phone'),
        address=request.json.get('address'),
        status=request.json.get('status'),
        is_active=request.json.get('is_active'),
        is_admin=request.json.get('is_admin'),
        created_at=current_timestamp,
        updated_at=current_timestamp
    )

    # Add the new user to the database
    try:
        db.add(new_user)
        db.commit()

        # Return the new user's information
        response_object = {
            'message': 'User created successfully',
            'id': new_user.id,
            'email': new_user.email,
            'username': new_user.username,
            'phone': new_user.phone,
            'address': new_user.address,
            'status': new_user.status,
            'created_at': new_user.created_at,
            'updated_at': new_user.updated_at
        }
        return make_response(jsonify(response_object), 201)
    except IntegrityError:
        db.rollback()
        return make_response(jsonify({"message": "Email address already in use"}), 409)
    except:
        db.rollback()
        return make_response(jsonify({"message": "Unable to create user"}), 500)
    
@views.route('/update_user/<int:id>', methods=['PUT'], strict_slashes=False)
@token_required
def update_user(current_user, public_id):
    """Update a user by their id"""

    if not current_user.is_admin:
        return jsonify({'error': 'Not authorized to perform this action'})
    
    user = db.query(User).get(public_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # get the request data
    data = request.get_json()

    # update the user attributes
    user.email = data.get('email', user.email)
    user.is_active = data.get('is_active', user.is_active)
    user.is_admin = data.get('is_admin', user.is_admin)
    user.password = data.get('password', user.password)
    user.username = data.get('first_name', user.username)
    user.phone = data.get('phone', user.phone)
    user.address = data.get('address', user.address)
    user.status = data.get('status', user.status)
    user.updated_at = data.get('updated_at', user.updated_at)

    db.add(user)
    # db.rollback()
    db.commit()

    return jsonify({'message': 'User updated successfully', 'user': user.to_dict()})

@views.route('/delete_user/<int:id>', methods=['DELETE'], strict_slashes=False)
@token_required
def single_user(current_user, public_id):
    """Delete a user by their id"""

    if not current_user.is_admin:
        return jsonify({'error': 'Not authorized to perform this action'})
    
    user = db.query(User).get(public_id)
    user.delete()
    return user