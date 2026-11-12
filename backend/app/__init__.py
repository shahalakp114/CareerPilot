
import os

from flask import Flask
from flask_cors import CORS

from config import Config
from app.extensions import db, jwt


# ==========================================
# IMPORT DATABASE MODELS
# ==========================================

from app.models.user import User
from app.models.profile import UserProfile
from app.models.resume import Resume
from app.models.job import JobDescription
from app.models.analysis import ResumeAnalysis


# ==========================================
# IMPORT API BLUEPRINTS
# ==========================================

from app.routes.auth import auth_bp
from app.routes.profile import profile_bp
from app.routes.resume import resume_bp
from app.routes.job import job_bp
from app.routes.matching import matching_bp
from app.routes.roadmap import roadmap_bp
from app.routes.recommendation import recommendation_bp
from app.routes.history import history_bp
from app.routes.dashboard import dashboard_bp


# ==========================================
# CREATE FLASK APPLICATION
# ==========================================

def create_app():

    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # ======================================
    # CORS CONFIGURATION
    # ======================================

    allowed_origins = [
        "http://localhost:5173",
        os.getenv("FRONTEND_URL")
    ]

    allowed_origins = [
        origin for origin in allowed_origins if origin
    ]

    CORS(
        app,
        origins=allowed_origins,
        supports_credentials=True
    )

    # ======================================
    # INITIALIZE EXTENSIONS
    # ======================================

    db.init_app(app)
    jwt.init_app(app)

    # ======================================
    # REGISTER AUTHENTICATION API
    # ======================================

    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )

    # ======================================
    # REGISTER PROFILE API
    # ======================================

    app.register_blueprint(
        profile_bp,
        url_prefix="/api/profile"
    )

    # ======================================
    # REGISTER RESUME API
    # ======================================

    app.register_blueprint(
        resume_bp,
        url_prefix="/api/resume"
    )

    # ======================================
    # REGISTER JOB API
    # ======================================

    app.register_blueprint(
        job_bp,
        url_prefix="/api/jobs"
    )

    # ======================================
    # REGISTER MATCHING API
    # ======================================

    app.register_blueprint(
        matching_bp,
        url_prefix="/api/matching"
    )

    # ======================================
    # REGISTER ROADMAP API
    # ======================================

    app.register_blueprint(
        roadmap_bp,
        url_prefix="/api/roadmap"
    )

    # ======================================
    # REGISTER RECOMMENDATION API
    # ======================================

    app.register_blueprint(
        recommendation_bp,
        url_prefix="/api/recommendations"
    )

    # ======================================
    # REGISTER HISTORY API
    # ======================================

    app.register_blueprint(
        history_bp,
        url_prefix="/api/history"
    )

    # ======================================
    # REGISTER DASHBOARD API
    # ======================================

    app.register_blueprint(
        dashboard_bp,
        url_prefix="/api/dashboard"
    )

    # ======================================
    # CREATE DATABASE TABLES
    # ======================================

    with app.app_context():
        db.create_all()

    # ======================================
    # HOME ROUTE
    # ======================================

    @app.route("/")
    def home():

        return {
            "message": "Welcome to CareerPilot AI",
            "status": "Backend running successfully"
        }

    # Health check route
    @app.route("/health")
    def health():

        return {
            "status": "healthy",
            "application": "CareerPilot"
        }

    return app
