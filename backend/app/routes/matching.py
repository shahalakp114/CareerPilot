
from datetime import datetime, timedelta, timezone

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db

from app.models.resume import Resume
from app.models.job import JobDescription
from app.models.analysis import ResumeAnalysis

from app.services.resume_matcher import calculate_similarity
from app.services.skill_extractor import extract_skills


matching_bp = Blueprint("matching", __name__)


def matching_response(analysis, resume, job):
    resume_skills = analysis.resume_skills or []
    required_skills = analysis.required_skills or []
    missing_skills = analysis.missing_skills or []

    return {
        "message": "Resume matching completed successfully",
        "analysis_id": analysis.id,
        "resume": {"id": resume.id, "file_name": resume.file_name},
        "job": {
            "id": job.id,
            "job_title": job.job_title,
            "company_name": job.company_name
        },
        "matching_score": analysis.matching_score,
        "resume_skills": resume_skills,
        "required_skills": required_skills,
        "missing_skills": missing_skills,
        "total_missing_skills": len(missing_skills)
    }


@matching_bp.route(
    "/compare/<int:resume_id>/<int:job_id>",
    methods=["POST"]
)
@jwt_required()
def compare_resume_job(resume_id, job_id):

    user_id = int(get_jwt_identity())

    # Find user's resume
    resume = Resume.query.filter_by(
        id=resume_id,
        user_id=user_id
    ).first()

    if not resume:
        return jsonify({
            "message": "Resume not found"
        }), 404

    # Find user's job description
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

    # A matching request can be replayed by React StrictMode or a quick
    # remount. Reuse the just-created analysis to avoid duplicate history rows.
    latest_analysis = ResumeAnalysis.query.filter_by(
        user_id=user_id,
        resume_id=resume.id,
        job_id=job.id
    ).order_by(ResumeAnalysis.id.desc()).first()

    if latest_analysis and latest_analysis.created_at:
        created_at = latest_analysis.created_at
        if created_at.tzinfo is None:
            created_at = created_at.replace(tzinfo=timezone.utc)
        if datetime.now(timezone.utc) - created_at <= timedelta(seconds=10):
            return jsonify(matching_response(latest_analysis, resume, job)), 200

    try:

        # Calculate matching score
        match_score = calculate_similarity(
            resume.extracted_text,
            job.description
        )

        # Extract resume skills
        resume_skills = extract_skills(
            resume.extracted_text
        )

        # Extract required skills
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

        # Save analysis in database
        analysis = ResumeAnalysis(
            user_id=user_id,
            resume_id=resume.id,
            job_id=job.id,
            matching_score=match_score,
            resume_skills=resume_skills,
            required_skills=required_skills,
            missing_skills=missing_skills
        )

        db.session.add(analysis)
        db.session.commit()

        return jsonify(matching_response(analysis, resume, job)), 200

    except ValueError:

        db.session.rollback()

        return jsonify({
            "message": "Unable to calculate similarity"
        }), 400

    except Exception:

        db.session.rollback()

        return jsonify({
            "message": "Resume matching failed"
        }), 500
