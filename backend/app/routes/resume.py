
import os
import uuid

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

from app.extensions import db
from app.models.resume import Resume

from app.services.resume_service import extract_text_from_pdf
from app.services.skill_extractor import extract_skills
from app.services.resume_info_extractor import (
    extract_education,
    extract_experience
)


resume_bp = Blueprint("resume", __name__)

ALLOWED_EXTENSIONS = {"pdf"}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


# --------------------------------------------------
# 1. GET ALL UPLOADED RESUMES
# --------------------------------------------------

@resume_bp.route("/", methods=["GET"])
@jwt_required()
def get_resumes():

    user_id = int(get_jwt_identity())

    resumes = Resume.query.filter_by(
        user_id=user_id
    ).order_by(Resume.uploaded_at.desc()).all()

    resume_list = []

    for resume in resumes:
        resume_list.append({
            "id": resume.id,
            "file_name": resume.file_name,
            "uploaded_at": (
                resume.uploaded_at.isoformat()
                if resume.uploaded_at else None
            ),
            "has_extracted_text": bool(resume.extracted_text)
        })

    return jsonify({
        "message": "Resumes retrieved successfully",
        "total_resumes": len(resume_list),
        "resumes": resume_list
    }), 200


# --------------------------------------------------
# 2. UPLOAD RESUME API
# --------------------------------------------------

@resume_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_resume():

    user_id = int(get_jwt_identity())

    if "resume" not in request.files:
        return jsonify({
            "message": "Please select a resume"
        }), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({
            "message": "No file selected"
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            "message": "Only PDF files are allowed"
        }), 400

    if file.read(5) != b"%PDF-":
        return jsonify({
            "message": "Invalid PDF file"
        }), 400

    file.seek(0)

    original_name = secure_filename(file.filename)

    unique_name = f"{uuid.uuid4().hex}.pdf"

    upload_folder = current_app.config["UPLOAD_FOLDER"]

    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(
        upload_folder,
        unique_name
    )

    file.save(file_path)

    new_resume = Resume(
        user_id=user_id,
        file_name=original_name,
        file_path=file_path
    )

    try:
        db.session.add(new_resume)
        db.session.commit()

    except Exception:
        db.session.rollback()

        if os.path.exists(file_path):
            os.remove(file_path)

        return jsonify({
            "message": "Resume upload failed"
        }), 500

    return jsonify({
        "message": "Resume uploaded successfully",
        "resume": {
            "id": new_resume.id,
            "file_name": new_resume.file_name,
            "uploaded_at": (
                new_resume.uploaded_at.isoformat()
                if new_resume.uploaded_at else None
            )
        }
    }), 201


# --------------------------------------------------
# 3. EXTRACT TEXT FROM PDF API
# --------------------------------------------------

@resume_bp.route("/<int:resume_id>/extract", methods=["POST"])
@jwt_required()
def extract_resume(resume_id):

    user_id = int(get_jwt_identity())

    resume = Resume.query.filter_by(
        id=resume_id,
        user_id=user_id
    ).first()

    if not resume:
        return jsonify({
            "message": "Resume not found"
        }), 404

    try:
        extracted_text = extract_text_from_pdf(
            resume.file_path
        )

        resume.extracted_text = extracted_text

        db.session.commit()

        return jsonify({
            "message": "Resume text extracted successfully",
            "resume_id": resume.id,
            "extracted_text": extracted_text
        }), 200

    except FileNotFoundError as error:
        return jsonify({
            "message": str(error)
        }), 404

    except ValueError as error:
        return jsonify({
            "message": str(error)
        }), 400

    except Exception:
        db.session.rollback()

        return jsonify({
            "message": "Failed to extract resume text"
        }), 500


# --------------------------------------------------
# 4. EXTRACT TECHNICAL SKILLS API
# --------------------------------------------------

@resume_bp.route("/<int:resume_id>/skills", methods=["GET"])
@jwt_required()
def get_resume_skills(resume_id):

    user_id = int(get_jwt_identity())

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

    skills = extract_skills(resume.extracted_text)

    return jsonify({
        "message": "Skills extracted successfully",
        "resume_id": resume.id,
        "total_skills": len(skills),
        "skills": skills
    }), 200


# --------------------------------------------------
# 5. EXTRACT EDUCATION AND EXPERIENCE API
# --------------------------------------------------

@resume_bp.route("/<int:resume_id>/details", methods=["GET"])
@jwt_required()
def get_resume_details(resume_id):

    user_id = int(get_jwt_identity())

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

    education = extract_education(
        resume.extracted_text
    )

    experience = extract_experience(
        resume.extracted_text
    )

    return jsonify({
        "message": "Resume details extracted successfully",
        "resume_id": resume.id,
        "education": education,
        "experience": experience
    }), 200


# --------------------------------------------------
# 6. DELETE RESUME API
# --------------------------------------------------

@resume_bp.route("/<int:resume_id>", methods=["DELETE"])
@jwt_required()
def delete_resume(resume_id):

    user_id = int(get_jwt_identity())

    resume = Resume.query.filter_by(
        id=resume_id,
        user_id=user_id
    ).first()

    if not resume:
        return jsonify({
            "message": "Resume not found"
        }), 404

    file_path = resume.file_path

    try:
        db.session.delete(resume)
        db.session.commit()

        if file_path and os.path.exists(file_path):
            os.remove(file_path)

        return jsonify({
            "message": "Resume deleted successfully"
        }), 200

    except Exception:
        db.session.rollback()

        return jsonify({
            "message": "Failed to delete resume"
        }), 500
