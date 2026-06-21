from flask import Blueprint, request, jsonify
from services.groq_service import ask_groq
import json

listing_bp = Blueprint(
    "listing",
    __name__
)


@listing_bp.route(
    "/api/verify-listing",
    methods=["POST"]
)
def verify_listing():

    try:

        data = request.get_json()

        listing_text = data.get(
            "listingText",
            ""
        )

        if not listing_text.strip():

            return jsonify({
                "error":
                "No listing text provided"
            }), 400

        prompt = f"""
You are an expert rental fraud detection AI.

Analyze this rental listing.

Return ONLY valid JSON.

{{
    "advancePaymentRequested": false,
    "priceTooGoodToBeTrue": false,
    "urgentLanguageDetected": false,
    "ownerIdentityProvided": true,
    "propertyDetailsProvided": true,
    "fraudSignals": [],
    "summary": ""
}}

Rules:

- Return ONLY JSON
- fraudSignals must be an array
- summary must be short

Rental Listing:

{listing_text}
"""

        ai_response = ask_groq(prompt)

        start = ai_response.find("{")
        end = ai_response.rfind("}") + 1

        json_text = ai_response[start:end]

        try:

            result = json.loads(
                json_text
            )

        except Exception:

            result = {
                "advancePaymentRequested": False,
                "priceTooGoodToBeTrue": False,
                "urgentLanguageDetected": False,
                "ownerIdentityProvided": False,
                "propertyDetailsProvided": False,
                "fraudSignals": [
                    "Unable to fully analyze listing"
                ],
                "summary":
                "AI response parsing failed."
            }

        # -------------------------
        # Rule-Based Scoring
        # -------------------------

        score = 100

        if result.get(
            "advancePaymentRequested",
            False
        ):
            score -= 25

        if result.get(
            "priceTooGoodToBeTrue",
            False
        ):
            score -= 20

        if result.get(
            "urgentLanguageDetected",
            False
        ):
            score -= 15

        if not result.get(
            "ownerIdentityProvided",
            False
        ):
            score -= 15

        if not result.get(
            "propertyDetailsProvided",
            False
        ):
            score -= 15

        fraud_count = len(
            result.get(
                "fraudSignals",
                []
            )
        )

        score -= fraud_count * 5

        score = max(
            0,
            min(score, 100)
        )

        # -------------------------
        # Verdict
        # -------------------------

        if score >= 85:

            verdict = "AUTHENTIC"

        elif score >= 65:

            verdict = "LOW RISK"

        elif score >= 45:

            verdict = "MODERATE RISK"

        else:

            verdict = "SUSPICIOUS"

        result["authenticityScore"] = score

        result["verdict"] = verdict

        result["listingText"] = (
            listing_text[:1000]
        )

        print(
            "FINAL LISTING RESULT:",
            json.dumps(
                result,
                indent=2
            )
        )

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500