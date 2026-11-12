
from datetime import datetime, timezone

from app.extensions import db


class JobDescription(db.Model):

    __tablename__ = "job_descriptions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    job_title = db.Column(
        db.String(150),
        nullable=False
    )

    company_name = db.Column(
        db.String(150),
        nullable=True
    )

    location = db.Column(
        db.String(150),
        nullable=True
    )

    job_type = db.Column(
        db.String(50),
        nullable=True
    )

    description = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    user = db.relationship(
        "User",
        backref=db.backref("job_descriptions", lazy=True)
    )

    def __repr__(self):
        return f"<JobDescription {self.job_title}>"
