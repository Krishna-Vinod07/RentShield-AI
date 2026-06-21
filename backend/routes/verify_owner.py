from flask import Blueprint, request, jsonify
import os
import json

from services.pdf_extractor import extract_pdf_text
from services.ocr_service import extract_image_text
from services.groq_service import ask_groq

owner_bp = Blueprint(
    "owner",
    __name__
)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@owner_bp.route(
    "/api/verify-owner",
    methods=["POST"]
)
def verify_owner():

    try:

        # -----------------------------
        # Check File Upload
        # -----------------------------

        if "file" not in request.files:

            return jsonify({
                "error": "No file uploaded"
            }), 400

        file = request.files["file"]

        if file.filename == "":

            return jsonify({
                "error": "No file selected"
            }), 400

        filepath = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(filepath)

        filename = file.filename.lower()

        # -----------------------------
        # Extract Text
        # -----------------------------

        if filename.endswith(".pdf"):

            extracted_text = extract_pdf_text(
                filepath
            )

        elif filename.endswith(
            (
                ".png",
                ".jpg",
                ".jpeg"
            )
        ):

            extracted_text = extract_image_text(
                filepath
            )

        else:

            return jsonify({
                "error":
                "Unsupported file format"
            }), 400

        # -----------------------------
        # AI Analysis
        # -----------------------------

        prompt = f"""
You are a property ownership verification expert.

Analyze this ownership document.

Return ONLY valid JSON.

{{
  "ownerName": "",
  "propertyAddress": "",
  "registrationNumber": "",
  "surveyNumber": "",
  "issuingAuthority": "",
  "taxStatus": "",
  "ownershipStatus": "",
  "documentQuality": "HIGH",
  "fraudIndicators": [],
  "summary": ""
}}

Rules:

- Extract information only if present.
- documentQuality must be HIGH, MEDIUM or LOW.
- fraudIndicators must be a JSON array.
- Return ONLY JSON.

Document:

{extracted_text}
"""

        ai_response = ask_groq(prompt)

        print("AI RESPONSE:")
        print(ai_response)

        start = ai_response.find("{")
        end = ai_response.rfind("}") + 1

        json_text = ai_response[start:end]

        try:

            result = json.loads(
                json_text
            )

        except Exception:

            result = {

                "ownerName": "",
                "propertyAddress": "",
                "registrationNumber": "",
                "surveyNumber": "",
                "issuingAuthority": "",
                "taxStatus": "",
                "ownershipStatus": "",
                "documentQuality": "LOW",
                "fraudIndicators": [
                    "Unable to parse AI response"
                ],
                "summary":
                "Document analysis failed."
            }

        # -----------------------------
        # Ownership Scoring
        # -----------------------------

        score = 0

        if result.get(
            "ownerName"
        ):
            score += 15

        if result.get(
            "propertyAddress"
        ):
            score += 15

        if result.get(
            "registrationNumber"
        ):
            score += 15

        if result.get(
            "surveyNumber"
        ):
            score += 10

        if result.get(
            "issuingAuthority"
        ):
            score += 15

        if result.get(
            "taxStatus"
        ):
            score += 10

        if result.get(
            "ownershipStatus"
        ):
            score += 10

        quality = str(
            result.get(
                "documentQuality",
                ""
            )
        ).upper()

        if quality == "HIGH":

            score += 10

        elif quality == "MEDIUM":

            score += 5

        # -----------------------------
        # Fraud Penalty
        # -----------------------------

        fraud_count = len(
            result.get(
                "fraudIndicators",
                []
            )
        )

        score -= (
            fraud_count * 10
        )

        score = max(
            0,
            min(score, 100)
        )

        result[
            "authenticityScore"
        ] = score

        # -----------------------------
        # Verdict
        # -----------------------------

        if score >= 90:

            result["verdict"] = (
                "VERIFIED OWNER"
            )

        elif score >= 75:

            result["verdict"] = (
                "LIKELY OWNER"
            )

        elif score >= 50:

            result["verdict"] = (
                "MANUAL REVIEW REQUIRED"
            )

        else:

            result["verdict"] = (
                "SUSPICIOUS DOCUMENT"
            )

        # -----------------------------
        # Trust Reason
        # -----------------------------

        if score >= 90:

            result["trustReason"] = (
                "Official ownership records detected with strong legal indicators."
            )

        elif score >= 75:

            result["trustReason"] = (
                "Most ownership details are present but some legal indicators are missing."
            )

        elif score >= 50:

            result["trustReason"] = (
                "Ownership information exists but document requires manual verification."
            )

        else:

            result["trustReason"] = (
                "Document lacks sufficient ownership evidence."
            )

        # -----------------------------
        # Metadata
        # -----------------------------

        result["documentType"] = (
            filename.split(".")[-1].upper()
        )

        result["extractedText"] = (
            extracted_text[:1500]
        )

        return jsonify(
            result
        )

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500