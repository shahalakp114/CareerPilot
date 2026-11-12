
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.resume import Resume
from app.services.skill_extractor import extract_skills
from app.services.job_recommendation import recommend_job_roles


recommendation_bp = Blueprint(
    "recommendation",
    __name__
)


@recommendation_bp.route(
    "/<int:resume_id>",
    methods=["GET"]
)
@jwt_required()
def get_recommendations(resume_id):

    user_id = int(get_jwt_identity())

    # Find the user's resume
    resume = Resume.query.filter_by(
        id=resume_id,
        user_id=user_id
    ).first()

    if not resume:
        return jsonify({
            "message": "Resume not found"
        }), 404

    if not resume.extracted_text:
        return jsonify({
            "message": "Please extract resume text first"
        }), 400

    # Extract skills from resume
    resume_skills = extract_skills(
        resume.extracted_text
    )

    if not resume_skills:
        return jsonify({
            "message": "No skills found in the resume"
        }), 400

    # Generate job role recommendations
    recommendations = recommend_job_roles(
        resume_skills
    )

    return jsonify({
        "message": "Job recommendations generated successfully",
        "resume_id": resume.id,
        "resume_skills": resume_skills,
        "recommendations": recommendations
    }), 200
