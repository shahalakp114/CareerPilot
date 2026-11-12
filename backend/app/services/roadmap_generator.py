
# Learning Roadmap Generator

SKILL_ROADMAP = {
    "python": {
        "topic": "Python Programming",
        "duration": "1 week",
        "resources": "Python basics, functions, OOP"
    },
    "flask": {
        "topic": "Flask Framework",
        "duration": "1 week",
        "resources": "Flask routing, APIs, Blueprints"
    },
    "django": {
        "topic": "Django Framework",
        "duration": "1 week",
        "resources": "Models, views, templates, REST Framework"
    },
    "react": {
        "topic": "React.js",
        "duration": "2 weeks",
        "resources": "Components, props, state, hooks"
    },
    "javascript": {
        "topic": "JavaScript",
        "duration": "1 week",
        "resources": "ES6, DOM, promises, async/await"
    },
    "html": {
        "topic": "HTML",
        "duration": "3 days",
        "resources": "HTML elements, forms, semantic HTML"
    },
    "css": {
        "topic": "CSS",
        "duration": "1 week",
        "resources": "Flexbox, Grid, responsive design"
    },
    "mysql": {
        "topic": "MySQL",
        "duration": "1 week",
        "resources": "SQL queries, joins, database design"
    },
    "rest api": {
        "topic": "REST API Development",
        "duration": "1 week",
        "resources": "HTTP methods, JSON, API authentication"
    },
    "machine learning": {
        "topic": "Machine Learning",
        "duration": "2 weeks",
        "resources": "Scikit-learn, model training, evaluation"
    }
}


def generate_learning_roadmap(missing_skills):

    roadmap = []

    for skill in missing_skills:

        skill_key = skill.lower()

        if skill_key in SKILL_ROADMAP:

            roadmap.append({
                "skill": skill,
                "topic": SKILL_ROADMAP[skill_key]["topic"],
                "duration": SKILL_ROADMAP[skill_key]["duration"],
                "resources": SKILL_ROADMAP[skill_key]["resources"]
            })

        else:

            roadmap.append({
                "skill": skill,
                "topic": f"Learn {skill}",
                "duration": "1 week",
                "resources": f"Study {skill} fundamentals and practice projects"
            })

    return roadmap
