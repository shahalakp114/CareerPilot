
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db
from app.models.user import User
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

# Create authentication Blueprint
auth_bp = Blueprint("auth", __name__)


# User Registration API
@auth_bp.route("/register", methods=["POST"])
def register():

    # Get JSON data from request
    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Please provide registration details"
        }), 400

    # Get user details
    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # Validate required fields
    if not username or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    # Validate email
    if "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({
            "message": "Please enter a valid email"
        }), 400

    # Validate password
    if len(password) < 8:
        return jsonify({
            "message": "Password must contain at least 8 characters"
        }), 400

    # Check duplicate username
    existing_user = User.query.filter_by(
        username=username
    ).first()

    if existing_user:
        return jsonify({
            "message": "Username already exists"
        }), 409

    # Check duplicate email
    existing_email = User.query.filter_by(
        email=email
    ).first()

    if existing_email:
        return jsonify({
            "message": "Email already exists"
        }), 409

    # Hash password
    hashed_password = generate_password_hash(password)

    # Create new user
    new_user = User(
        username=username,
        email=email,
        password_hash=hashed_password
    )

    try:
        # Save user in database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "Registration successful",
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email
            }
        }), 201

    except Exception:
        db.session.rollback()

        return jsonify({
            "message": "Registration failed"
        }), 500


# User Login API
@auth_bp.route("/login", methods=["POST"])
def login():

    # Get JSON data from request
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "message": "Please provide login details"
        }), 400

    # Get login details
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # Validate required fields
    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    # Find user using email
    user = User.query.filter_by(email=email).first()

    # Check user and password
    if not user or not check_password_hash(
        user.password_hash, password
    ):
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    # Generate JWT access token
    access_token = create_access_token(
        identity=str(user.id)
    )

    # Return successful response
    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200


# Protected User Profile API
@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    # Get logged-in user's ID from JWT
    user_id = int(get_jwt_identity())

    # Find user in database
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    # Return user details
    return jsonify({
        "message": "Profile fetched successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200

