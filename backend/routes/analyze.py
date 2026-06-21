from flask import Blueprint, request, jsonify
from services.groq_service import ask_groq
import json

analyze_bp = Blueprint(
    "analyze",
    __name__
)

@analyze_bp.route(
    "/api/analyze",
    methods=["POST"]
)
def analyze():

    try:

        data = request.get_json()

        agreement_text = data.get(
            "agreementText",
            ""
        )

        if not agreement_text.strip():

            return jsonify({
                "error":
                "Agreement text is required"
            }), 400

        prompt = f"""
You are RentShield AI.

Analyze the following rental agreement.

Agreement:

{agreement_text}

Return ONLY valid JSON.

{{
  "riskScore": 0,
  "fraudProbability": 0,
  "verdict": "",

  "agreementSummary": {{
      "rent": "",
      "deposit": "",
      "duration": "",
      "noticePeriod": "",
      "lockIn": "",
      "maintenance": ""
  }},

  "clauses": [
    {{
      "severity": "",
      "title": "",
      "plain": "",
      "recommendation": ""
    }}
  ],

  "positives": [],

  "fraudSignals": [],

  "nextActions": [],

  "overallAdvice": "",

  "trustScore": 0,

  "trustVerdict": "",

  "finalScore": 0,

  "recommendation": ""
}}

Rules:

- riskScore must be between 0 and 100
- fraudProbability must be between 0 and 100
- trustScore must be between 0 and 100
- finalScore must be between 0 and 100

- verdict:
  HIGH RISK
  MODERATE RISK
  LOW RISK

- trustVerdict:
  TRUSTED
  MODERATE
  UNTRUSTED

- recommendation:
  SAFE TO PROCEED
  PROCEED WITH CAUTION
  HIGH RISK - AVOID

Return JSON only.
No markdown.
No explanation.
"""

        ai_response = ask_groq(prompt)

        ai_response = ai_response.strip()

        if ai_response.startswith("```json"):
            ai_response = (
                ai_response
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        result = json.loads(ai_response)

        # Fallback values

        result.setdefault(
            "fraudProbability",
            0
        )

        result.setdefault(
            "positives",
            []
        )

        result.setdefault(
            "fraudSignals",
            []
        )

        result.setdefault(
            "nextActions",
            []
        )

        result.setdefault(
            "trustScore",
            0
        )

        result.setdefault(
            "trustVerdict",
            ""
        )

        result.setdefault(
            "finalScore",
            0
        )

        result.setdefault(
            "recommendation",
            ""
        )

        result.setdefault(
            "overallAdvice",
            ""
        )

        result.setdefault(
            "clauses",
            []
        )

        result.setdefault(
            "agreementSummary",
            {
                "rent": "-",
                "deposit": "-",
                "duration": "-",
                "noticePeriod": "-",
                "lockIn": "-",
                "maintenance": "-"
            }
        )

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500