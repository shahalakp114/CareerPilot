
# Skills required for different job roles

JOB_ROLES = {
    "Python Developer": [
        "Python", "Flask", "Django", "SQL", "REST API"
    ],

    "Frontend Developer": [
        "HTML", "CSS", "JavaScript", "React", "Bootstrap"
    ],

    "Full Stack Developer": [
        "Python", "JavaScript", "HTML", "CSS", "React", "SQL"
    ],

    "Machine Learning Engineer": [
        "Python", "Machine Learning", "Pandas",
        "NumPy", "Scikit-learn"
    ],

    "Data Analyst": [
        "Python", "SQL", "Pandas", "NumPy"
    ],

    "AI Engineer": [
        "Python", "Artificial Intelligence",
        "Machine Learning", "Deep Learning"
    ],

    "Backend Developer": [
        "Python", "Flask", "Django", "FastAPI",
        "SQL", "REST API"
    ]
}


def recommend_job_roles(resume_skills):
    """
    Recommend suitable job roles based on resume skills.

    Args:
        resume_skills (list): Skills extracted from the resume.

    Returns:
        list: Job roles with matching percentage,
              matching skills, and missing skills.
    """

    recommendations = []

    # Convert user skills to lowercase for comparison
    user_skills = {
        skill.strip().lower()
        for skill in resume_skills
        if isinstance(skill, str) and skill.strip()
    }

    # Compare resume skills with each job role
    for role, required_skills in JOB_ROLES.items():

        matching_skills = [
            skill
            for skill in required_skills
            if skill.lower() in user_skills
        ]

        missing_skills = [
            skill
            for skill in required_skills
            if skill.lower() not in user_skills
        ]

        total_skills = len(required_skills)

        # Calculate skill matching percentage
        match_percentage = round(
            (len(matching_skills) / total_skills) * 100,
            2
        ) if total_skills > 0 else 0

        recommendations.append({
            "job_role": role,
            "match_percentage": match_percentage,
            "matching_skills": matching_skills,
            "missing_skills": missing_skills
        })

    # Sort job roles from highest match to lowest match
    recommendations.sort(
        key=lambda item: item["match_percentage"],
        reverse=True
    )

    return recommendations
