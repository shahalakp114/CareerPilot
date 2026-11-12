
import os
import pymupdf


def extract_text_from_pdf(file_path):

    if not os.path.exists(file_path):
        raise FileNotFoundError("Resume file not found")

    if os.path.getsize(file_path) == 0:
        raise ValueError("Resume PDF is empty")

    try:
        pdf_document = pymupdf.open(file_path)

        extracted_text = ""

        for page in pdf_document:
            extracted_text += page.get_text()

        pdf_document.close()

        if not extracted_text.strip():
            raise ValueError("No readable text found in the PDF")

        return extracted_text

    except Exception as e:
        raise ValueError(f"Failed to extract PDF text: {str(e)}")
