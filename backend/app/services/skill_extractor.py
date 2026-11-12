
import re


# Technical skills database
SKILLS = [
    "Python",
    "Java",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Flask",
    "Django",
    "FastAPI",
    "Node.js",
    "Express.js",
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "MongoDB",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Natural Language Processing",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
    "Git",
    "GitHub",
    "REST API",
    "Bootstrap",
    "Tailwind CSS"
]


def extract_skills(text):

    found_skills = []

    # Convert text to lowercase
    text = text.lower()

    for skill in SKILLS:

        # Create a pattern to match complete skill names
        pattern = r"(?<!\w)" + re.escape(skill.lower()) + r"(?!\w)"

        if re.search(pattern, text):
            found_skills.append(skill)

    return found_skills
