
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Read database URL from environment
database_url = os.getenv("DATABASE_URL")

# Render PostgreSQL URL compatibility
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace(
        "postgres://",
        "postgresql://",
        1
    )


class Config:

    # Security
    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "careerpilot-development-secret"
    )

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "careerpilot-development-jwt-secret"
    )

    # Database: PostgreSQL on Render, SQLite locally
    SQLALCHEMY_DATABASE_URI = (
        database_url
        if database_url
        else "sqlite:///" + os.path.join(BASE_DIR, "careerpilot.db")
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # File uploads
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

    MAX_CONTENT_LENGTH = 5 * 1024 * 1024
