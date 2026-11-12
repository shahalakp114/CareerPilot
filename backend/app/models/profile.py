
from datetime import datetime, timezone

from app.extensions import db


class UserProfile(db.Model):

    __tablename__ = "user_profiles"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    full_name = db.Column(
        db.String(100),
        nullable=True
    )

    phone = db.Column(
        db.String(15),
        nullable=True
    )

    education = db.Column(
        db.String(150),
        nullable=True
    )

    experience = db.Column(
        db.Text,
        nullable=True
    )

    skills = db.Column(
        db.Text,
        nullable=True
    )

    target_role = db.Column(
        db.String(100),
        nullable=True
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationship with User model
    user = db.relationship(
        "User",
        back_populates="profile"
    )

    def __repr__(self):
        return f"<UserProfile {self.full_name}>"
