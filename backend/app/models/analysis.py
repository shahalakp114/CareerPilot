
from datetime import datetime, timezone

from app.extensions import db


class ResumeAnalysis(db.Model):

    __tablename__ = "resume_analyses"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    resume_id = db.Column(
        db.Integer,
        db.ForeignKey("resumes.id"),
        nullable=False
    )

    job_id = db.Column(
        db.Integer,
        db.ForeignKey("job_descriptions.id"),
        nullable=False
    )

    matching_score = db.Column(
        db.Float,
        nullable=False
    )

    resume_skills = db.Column(
        db.JSON,
        nullable=True
    )

    required_skills = db.Column(
        db.JSON,
        nullable=True
    )

    missing_skills = db.Column(
        db.JSON,
        nullable=True
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    def __repr__(self):
        return f"<ResumeAnalysis {self.id}>"
