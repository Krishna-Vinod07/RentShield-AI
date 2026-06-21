from flask import Blueprint, request, jsonify

trust_bp = Blueprint(
    "trust",
    __name__
)

@trust_bp.route(
    "/api/trust-score",
    methods=["POST"]
)
def trust_score():

    try:

        data = request.get_json()

        ownership_score = int(
            data.get(
                "ownershipScore",
                0
            )
        )

        utility_score = int(
            data.get(
                "utilityScore",
                0
            )
        )

        listing_score = int(
            data.get(
                "listingScore",
                0
            )
        )

        fraud_penalty = int(
            data.get(
                "fraudPenalty",
                0
            )
        )

        # Calculate Trust Score

        trust_score = int(
    (
        ownership_score * 0.45 +
        utility_score * 0.30 +
        listing_score * 0.25
    )
)

        trust_score -= fraud_penalty

        trust_score = max(
            0,
            min(trust_score, 100)
        )

        # Verdict

        if trust_score >= 80:

            verdict = "TRUSTED"

        elif trust_score >= 50:

            verdict = "MODERATELY TRUSTED"

        else:

            verdict = "HIGH RISK"

        return jsonify({

            "trustScore":
            trust_score,

            "ownershipScore":
            ownership_score,

            "utilityScore":
            utility_score,

            "listingScore":
            listing_score,

            "fraudPenalty":
            fraud_penalty,

            "verdict":
            verdict

        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500