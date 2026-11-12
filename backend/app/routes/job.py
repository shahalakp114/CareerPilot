
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.job import JobDescription


# Create Job Blueprint
job_bp = Blueprint("job", __name__)


# Helper function to format job data
def job_data(job):

    return {
        "id": job.id,
        "user_id": job.user_id,
        "job_title": job.job_title,
        "company_name": job.company_name,
        "location": job.location,
        "job_type": job.job_type,
        "description": job.description,
        "created_at": job.created_at.isoformat()
    }


# --------------------------------------------------
# 1. ADD JOB DESCRIPTION API
# --------------------------------------------------

@job_bp.route("/", methods=["POST"])
@jwt_required()
def add_job():

    user_id = int(get_jwt_identity())

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "message": "Please provide job details"
        }), 400

    job_title = data.get("job_title")
    company_name = data.get("company_name")
    location = data.get("location")
    job_type = data.get("job_type")
    description = data.get("description")

    # Validate required fields
    if not isinstance(job_title, str) or not job_title.strip():
        return jsonify({
            "message": "Job title is required"
        }), 400

    if not isinstance(description, str) or not description.strip():
        return jsonify({
            "message": "Job description is required"
        }), 400

    # Create new job
    new_job = JobDescription(
        user_id=user_id,
        job_title=job_title.strip(),
        company_name=company_name,
        location=location,
        job_type=job_type,
        description=description.strip()
    )

    try:
        db.session.add(new_job)
        db.session.commit()

    except Exception:
        db.session.rollback()

        return jsonify({
            "message": "Failed to add job description"
        }), 500

    return jsonify({
        "message": "Job description added successfully",
        "job": job_data(new_job)
    }), 201


# --------------------------------------------------
# 2. VIEW ALL JOB DESCRIPTIONS API
# --------------------------------------------------

@job_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_jobs():

    user_id = int(get_jwt_identity())

    jobs = JobDescription.query.filter_by(
        user_id=user_id
    ).order_by(
        JobDescription.created_at.desc()
    ).all()

    return jsonify({
        "message": "Job descriptions retrieved successfully",
        "total_jobs": len(jobs),
        "jobs": [job_data(job) for job in jobs]
    }), 200


# --------------------------------------------------
# 3. VIEW SINGLE JOB API
# --------------------------------------------------

@job_bp.route("/<int:job_id>", methods=["GET"])
@jwt_required()
def get_job(job_id):

    user_id = int(get_jwt_identity())

    job = JobDescription.query.filter_by(
        id=job_id,
        user_id=user_id
    ).first()

    if not job:
        return jsonify({
            "message": "Job description not found"
        }), 404

    return jsonify({
        "message": "Job description retrieved successfully",
        "job": job_data(job)
    }), 200


# --------------------------------------------------
# 4. UPDATE JOB DESCRIPTION API
# --------------------------------------------------

@job_bp.route("/<int:job_id>", methods=["PUT"])
@jwt_required()
def update_job(job_id):

    user_id = int(get_jwt_identity())

    job = JobDescription.query.filter_by(
        id=job_id,
        user_id=user_id
    ).first()

    if not job:
        return jsonify({
            "message": "Job description not found"
        }), 404

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "message": "Please provide updated details"
        }), 400

    allowed_fields = [
        "job_title",
        "company_name",
        "location",
        "job_type",
        "description"
    ]

    for field in allowed_fields:

        if field in data:

            value = data[field]

            if field in ["job_title", "description"]:
                if not isinstance(value, str) or not value.strip():
                    return jsonify({
                        "message": f"{field} cannot be empty"
                    }), 400

                value = value.strip()

            elif value is not None and not isinstance(value, str):
                return jsonify({
                    "message": f"{field} must be a string"
                }), 400

            setattr(job, field, value)

    try:
        db.session.commit()

    except Exception:
        db.session.rollback()

        return jsonify({
            "message": "Failed to update job description"
        }), 500

    return jsonify({
        "message": "Job description updated successfully",
        "job": job_data(job)
    }), 200


# --------------------------------------------------
# 5. DELETE JOB DESCRIPTION API
# --------------------------------------------------

@job_bp.route("/<int:job_id>", methods=["DELETE"])
@jwt_required()
def delete_job(job_id):

    user_id = int(get_jwt_identity())

    job = JobDescription.query.filter_by(
        id=job_id,
        user_id=user_id
    ).first()

    if not job:
        return jsonify({
            "message": "Job description not found"
        }), 404

    try:
        db.session.delete(job)
        db.session.commit()

    except Exception:
        db.session.rollback()

        return jsonify({
            "message": "Failed to delete job description"
        }), 500

    return jsonify({
        "message": "Job description deleted successfully"
    }), 200
