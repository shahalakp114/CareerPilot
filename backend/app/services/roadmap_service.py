
SKILL_ROADMAP = {
    "Python": [
        "Learn Python basics and data types",
        "Practice loops, functions and conditions",
        "Understand Object-Oriented Programming",
        "Learn file handling and exception handling",
        "Build small Python projects"
    ],

    "Django": [
        "Learn Django fundamentals",
        "Understand Models, Views and Templates",
        "Learn Django ORM",
        "Understand authentication",
        "Build REST APIs using Django REST Framework"
    ],

    "Flask": [
        "Learn Flask fundamentals",
        "Understand routing and HTTP methods",
        "Learn Flask Blueprints",
        "Connect Flask with a database",
        "Build REST APIs using Flask"
    ],

    "JavaScript": [
        "Learn variables and data types",
        "Practice functions, arrays and objects",
        "Understand DOM manipulation",
        "Learn Promises and async/await",
        "Practice API integration"
    ],

    "React": [
        "Learn React components and JSX",
        "Understand Props and State",
        "Learn React Hooks",
        "Practice React Router",
        "Connect React with REST APIs"
    ],

    "SQL": [
        "Learn SQL fundamentals",
        "Practice SELECT, INSERT, UPDATE and DELETE",
        "Understand JOIN operations",
        "Learn database relationships",
        "Practice database queries"
    ],

    "HTML": [
        "Learn HTML elements and attributes",
        "Understand forms and tables",
        "Practice semantic HTML",
        "Create web page structures"
    ],

    "CSS": [
        "Learn CSS selectors and properties",
        "Understand the CSS Box Model",
        "Practice Flexbox and Grid",
        "Learn responsive web design",
        "Create attractive website layouts"
    ],

    "Machine Learning": [
        "Learn Python for Data Science",
        "Study NumPy and Pandas",
        "Understand basic statistics",
        "Learn supervised and unsupervised learning",
        "Build simple Machine Learning projects"
    ],

    "AI": [
        "Learn Artificial Intelligence fundamentals",
        "Understand Machine Learning basics",
        "Study Neural Networks",
        "Explore Natural Language Processing",
        "Build basic AI projects"
    ]
}


def generate_learning_roadmap(missing_skills):

    roadmap = []

    for skill in missing_skills:

        topics = SKILL_ROADMAP.get(
            skill,
            [
                f"Learn {skill} fundamentals",
                f"Practice {skill} with small exercises",
                f"Build a project using {skill}"
            ]
        )

        roadmap.append({
            "skill": skill,
            "topics": topics
        })

    return roadmap
