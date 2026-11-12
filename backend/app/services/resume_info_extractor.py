
import re


# Extract a particular section from resume text
def extract_section(text, section_names, all_headings):

    lines = text.splitlines()

    capturing = False
    section_content = []

    for line in lines:

        line = line.strip()

        if not line:
            continue

        clean_line = re.sub(r"[:\-]+$", "", line).strip().lower()

        # Check whether the current line is a section heading
        if clean_line in section_names:
            capturing = True
            continue

        # Stop when another section heading is found
        if clean_line in all_headings and capturing:
            break

        if capturing:
            section_content.append(line)

    return "\n".join(section_content)


# Extract education details
def extract_education(text):

    headings = [
        "education",
        "academic background",
        "academic qualification",
        "educational qualification",
        "qualifications"
    ]

    return extract_section(text, headings, ALL_HEADINGS)


# Extract work experience details
def extract_experience(text):

    headings = [
        "experience",
        "work experience",
        "professional experience",
        "employment history",
        "internship",
        "internships"
    ]

    return extract_section(text, headings, ALL_HEADINGS)


ALL_HEADINGS = [
    "education",
    "academic background",
    "academic qualification",
    "educational qualification",
    "qualifications",
    "experience",
    "work experience",
    "professional experience",
    "employment history",
    "internship",
    "internships",
    "skills",
    "technical skills",
    "projects",
    "personal projects",
    "certifications",
    "certificates",
    "contact",
    "contact information",
    "summary",
    "objective",
    "career objective",
    "achievements",
    "languages",
    "references"
]
