from flask import Blueprint, request, jsonify
import os

from services.pdf_extractor import extract_pdf_text
from services.ocr_service import extract_image_text

extract_bp = Blueprint(
    "extract",
    __name__
)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@extract_bp.route(
    "/api/extract-agreement",
    methods=["POST"]
)
def extract_agreement():

    try:

        if "file" not in request.files:
            return jsonify({
                "error": "No file uploaded"
            }), 400

        file = request.files["file"]

        filepath = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(filepath)

        filename = file.filename.lower()

        if filename.endswith(".pdf"):

            text = extract_pdf_text(
                filepath
            )

        elif filename.endswith(
            (".png", ".jpg", ".jpeg")
        ):

            text = extract_image_text(
                filepath
            )

        else:

            return jsonify({
                "error": "Unsupported file type"
            }), 400

        return jsonify({
            "text": text
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500