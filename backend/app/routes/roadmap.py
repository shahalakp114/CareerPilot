
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.resume import Resume
from app.models.job import JobDescription

from app.services.skill_extractor import extract_skills
from app.services.roadmap_service import generate_learning_roadmap


roadmap_bp = Blueprint("roadmap", __name__)


@roadmap_bp.route(
    "/<int:resume_id>/<int:job_id>",
    methods=["GET"]
)
@jwt_required()
def get_learning_roadmap(resume_id, job_id):

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

    # Find the user's job description
    job = JobDescription.query.filter_by(
        id=job_id,
        user_id=user_id
    ).first()

    if not job:
        return jsonify({
            "message": "Job description not found"
        }), 404

    if not resume.extracted_text:
        return jsonify({
            "message": "Please extract resume text first"
        }), 400

    # Extract skills
    resume_skills = extract_skills(
        resume.extracted_text
    )

    required_skills = extract_skills(
        job.description
    )

    # Identify missing skills
    resume_skill_set = {
        skill.lower() for skill in resume_skills
    }

    missing_skills = [
        skill for skill in required_skills
        if skill.lower() not in resume_skill_set
    ]

    # Generate learning roadmap
    roadmap = generate_learning_roadmap(
        missing_skills
    )

    return jsonify({
        "message": "Learning roadmap generated successfully",
        "resume_id": resume.id,
        "job_id": job.id,
        "missing_skills": missing_skills,
        "roadmap": roadmap
    }), 200
