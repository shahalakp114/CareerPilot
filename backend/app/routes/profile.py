
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.profile import UserProfile
from app.models.user import User


# Create Profile Blueprint
profile_bp = Blueprint("profile", __name__)


# Helper function to format profile data
def profile_data(profile):
    return {
        "id": profile.id,
        "user_id": profile.user_id,
        "full_name": profile.full_name,
        "phone": profile.phone,
        "education": profile.education,
        "experience": profile.experience,
        "skills": profile.skills,
        "target_role": profile.target_role,
        "created_at": (
            profile.created_at.isoformat()
            if profile.created_at else None
        ),
        "updated_at": (
            profile.updated_at.isoformat()
            if profile.updated_at else None
        )
    }


# Create or Get User Profile
@profile_bp.route("/", methods=["GET", "POST"])
@jwt_required()
def manage_profile():

    user_id = int(get_jwt_identity())

    # Check whether user exists
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    # Find existing profile
    profile = UserProfile.query.filter_by(
        user_id=user_id
    ).first()

    # GET Profile
    if request.method == "GET":

        if not profile:
            return jsonify({
                "message": "Profile not found"
            }), 404

        return jsonify({
            "message": "Profile retrieved successfully",
            "profile": profile_data(profile)
        }), 200

    # POST - Create a profile or update the existing profile.
    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    is_update = profile is not None
    if not profile:
        profile = UserProfile(user_id=user_id)
        db.session.add(profile)

    allowed_fields = [
        "full_name",
        "phone",
        "education",
        "experience",
        "skills",
        "target_role"
    ]

    for field in allowed_fields:
        if field in data:
            setattr(profile, field, data[field])

    try:
        db.session.commit()

        return jsonify({
            "message": (
                "Profile updated successfully"
                if is_update else "Profile created successfully"
            ),
            "profile": profile_data(profile)
        }), 200 if is_update else 201

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "message": "Failed to save profile",
            "error": str(e)
        }), 500


# Update User Profile
@profile_bp.route("/", methods=["PUT"])
@jwt_required()
def update_profile():

    user_id = int(get_jwt_identity())

    profile = UserProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not profile:
        return jsonify({
            "message": "Profile not found. Create a profile first."
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    # Update only provided fields
    allowed_fields = [
        "full_name",
        "phone",
        "education",
        "experience",
        "skills",
        "target_role"
    ]

    for field in allowed_fields:
        if field in data:
            setattr(profile, field, data[field])

    try:
        db.session.commit()

        return jsonify({
            "message": "Profile updated successfully",
            "profile": profile_data(profile)
        }), 200

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "message": "Failed to update profile",
            "error": str(e)
        }), 500
