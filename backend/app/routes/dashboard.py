
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func

from app.extensions import db
from app.models.resume import Resume
from app.models.job import JobDescription
from app.models.analysis import ResumeAnalysis


dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/", methods=["GET"])
@jwt_required()
def get_dashboard():

    user_id = int(get_jwt_identity())

    # 1. Total uploaded resumes
    total_resumes = Resume.query.filter_by(
        user_id=user_id
    ).count()

    # 2. Total job descriptions
    total_jobs = JobDescription.query.filter_by(
        user_id=user_id
    ).count()

    # 3. Total successful analyses
    total_analyses = ResumeAnalysis.query.filter_by(
        user_id=user_id
    ).count()

    # 4. Average matching score
    average_score = db.session.query(
        func.avg(ResumeAnalysis.matching_score)
    ).filter_by(
        user_id=user_id
    ).scalar()

    average_score = round(float(average_score or 0), 2)

    # 5. Get recent analyses
    recent_analyses = (
        db.session.query(
            ResumeAnalysis,
            Resume.file_name,
            JobDescription.job_title,
            JobDescription.company_name
        )
        .outerjoin(
            Resume,
            Resume.id == ResumeAnalysis.resume_id
        )
        .outerjoin(
            JobDescription,
            JobDescription.id == ResumeAnalysis.job_id
        )
        .filter(ResumeAnalysis.user_id == user_id)
        .order_by(ResumeAnalysis.created_at.desc())
        .limit(5)
        .all()
    )

    recent_data = []

    for analysis, file_name, job_title, company_name in recent_analyses:

        recent_data.append({
            "id": analysis.id,
            "analysis_id": analysis.id,

            "resume_id": analysis.resume_id,
            "file_name": file_name or "Resume",

            "job_id": analysis.job_id,
            "job_title": job_title or "Untitled Job",
            "company_name": company_name or "Company unavailable",

            "matching_score": float(analysis.matching_score or 0),

            "missing_skills": analysis.missing_skills or [],

            "created_at": (
                analysis.created_at.isoformat()
                if analysis.created_at else None
            )
        })

    # 6. Return dashboard information
    return jsonify({

        "message": "Dashboard data retrieved successfully",

        "total_resumes": total_resumes,

        "total_jobs": total_jobs,

        "total_analyses": total_analyses,

        "average_score": average_score,

        "recent_analyses": recent_data

    }), 200
