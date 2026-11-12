
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.analysis import ResumeAnalysis
from app.models.resume import Resume
from app.models.job import JobDescription


history_bp = Blueprint("history", __name__)


def format_analysis(analysis, resume, job):
    return {
        "id": analysis.id,
        "analysis_id": analysis.id,

        "resume_id": analysis.resume_id,
        "file_name": resume.file_name if resume else "Resume",

        "job_id": analysis.job_id,
        "job_title": job.job_title if job else "Job",
        "company_name": job.company_name if job else "Company unavailable",

        "matching_score": analysis.matching_score,

        "resume_skills": analysis.resume_skills or [],
        "required_skills": analysis.required_skills or [],
        "missing_skills": analysis.missing_skills or [],

        "total_missing_skills": len(analysis.missing_skills or []),

        "created_at": (
            analysis.created_at.isoformat()
            if analysis.created_at else None
        )
    }


# Get all previous resume analyses
@history_bp.route("/", methods=["GET"])
@jwt_required()
def get_analysis_history():

    user_id = int(get_jwt_identity())

    results = (
        ResumeAnalysis.query
        .outerjoin(Resume, Resume.id == ResumeAnalysis.resume_id)
        .outerjoin(
            JobDescription,
            JobDescription.id == ResumeAnalysis.job_id
        )
        .filter(ResumeAnalysis.user_id == user_id)
        .order_by(ResumeAnalysis.created_at.desc())
        .all()
    )

    history = []

    for analysis in results:
        resume = Resume.query.get(analysis.resume_id)
        job = JobDescription.query.get(analysis.job_id)

        history.append(
            format_analysis(analysis, resume, job)
        )

    average_score = (
        sum(float(item["matching_score"] or 0) for item in history)
        / len(history)
        if history else 0
    )

    return jsonify({
        "message": "Analysis history retrieved successfully",
        "total_analyses": len(history),
        "average_match_score": round(average_score, 2),
        "analyses": history,
        "history": history
    }), 200


# Get one particular analysis
@history_bp.route("/<int:analysis_id>", methods=["GET"])
@jwt_required()
def get_single_analysis(analysis_id):

    user_id = int(get_jwt_identity())

    analysis = ResumeAnalysis.query.filter_by(
        id=analysis_id,
        user_id=user_id
    ).first()

    if not analysis:
        return jsonify({
            "message": "Analysis not found"
        }), 404

    resume = Resume.query.get(analysis.resume_id)
    job = JobDescription.query.get(analysis.job_id)

    return jsonify(
        format_analysis(analysis, resume, job)
    ), 200
