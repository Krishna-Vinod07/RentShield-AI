from flask import Blueprint, request, jsonify
import os
import json

from services.pdf_extractor import extract_pdf_text
from services.ocr_service import extract_image_text
from services.groq_service import ask_groq

bill_bp = Blueprint("bill", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@bill_bp.route("/api/verify-bill", methods=["POST"])
def verify_bill():
    try:
        # Check Upload
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

        # Extract Text
        if filename.endswith(".pdf"):
            extracted_text = extract_pdf_text(filepath)

        elif filename.endswith((".png", ".jpg", ".jpeg")):
            extracted_text = extract_image_text(filepath)

        else:
            return jsonify({
                "error": "Unsupported file format"
            }), 400

        # AI Analysis
        prompt = f"""
You are a utility bill verification expert.

Analyze this utility bill.

Return ONLY valid JSON.

{{
    "accountHolder": "",
    "provider": "",
    "address": "",
    "consumerNumber": "",
    "billAmount": "",
    "issueDate": "",
    "suspiciousIndicators": [],
    "summary": ""
}}

Rules:
- Extract information only if present.
- suspiciousIndicators must be a JSON array.
- Return ONLY JSON.

Utility Bill Text:

{extracted_text}
"""

        ai_response = ask_groq(prompt)

        start = ai_response.find("{")
        end = ai_response.rfind("}") + 1

        if start == -1 or end <= 0:
            raise ValueError("No JSON found in AI response")

        json_text = ai_response[start:end]

        try:
            result = json.loads(json_text)

        except json.JSONDecodeError:
            result = {
                "accountHolder": "",
                "provider": "",
                "address": "",
                "consumerNumber": "",
                "billAmount": "",
                "issueDate": "",
                "suspiciousIndicators": [
                    "Unable to parse AI response"
                ],
                "summary": "Bill analysis failed."
            }

        # Scoring
        confidence = 0

        if result.get("accountHolder"):
            confidence += 25
            result["nameMatch"] = "MATCH"
        else:
            result["nameMatch"] = "UNKNOWN"

        if result.get("address"):
            confidence += 25
            result["addressMatch"] = "MATCH"
        else:
            result["addressMatch"] = "UNKNOWN"

        if result.get("provider"):
            confidence += 15

        if result.get("consumerNumber"):
            confidence += 15

        if result.get("billAmount"):
            confidence += 5

        if result.get("issueDate"):
            confidence += 5

        suspicious_count = len(
            result.get("suspiciousIndicators", [])
        )

        if suspicious_count == 0:
            confidence += 10

        confidence -= suspicious_count * 10

        confidence = max(
            0,
            min(confidence, 100)
        )

        # Verdict
        if confidence >= 90:
            verdict = "VERIFIED"

        elif confidence >= 75:
            verdict = "LIKELY VALID"

        elif confidence >= 50:
            verdict = "MANUAL REVIEW"

        else:
            verdict = "SUSPICIOUS"

        result["confidence"] = confidence
        result["verdict"] = verdict

        # Trust Reason
        if confidence >= 90:
            result["trustReason"] = (
                "Utility bill contains strong authenticity indicators."
            )

        elif confidence >= 75:
            result["trustReason"] = (
                "Most utility bill fields are present and appear valid."
            )

        elif confidence >= 50:
            result["trustReason"] = (
                "Utility bill requires manual verification."
            )

        else:
            result["trustReason"] = (
                "Utility bill lacks sufficient authenticity indicators."
            )

        # Metadata
        result["documentType"] = (
            filename.split(".")[-1].upper()
        )

        result["extractedText"] = extracted_text[:1500]

        print(
            "FINAL BILL RESULT:",
            json.dumps(result, indent=2)
        )

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500