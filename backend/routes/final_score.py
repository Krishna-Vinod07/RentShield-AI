from flask import Blueprint, request, jsonify

final_bp = Blueprint(
    "final",
    __name__
)

@final_bp.route(
    "/api/final-score",
    methods=["POST"]
)
def final_score():

    try:

        data = request.get_json()

        risk_score = int(
            data.get(
                "riskScore",
                0
            )
        )

        trust_score = int(
            data.get(
                "trustScore",
                0
            )
        )

        listing_score = int(
            data.get(
                "listingScore",
                0
            )
        )

        # Final Safety Score Formula

        final_score = int(
    (
        trust_score * 0.70 +
        (100 - risk_score) * 0.30
    )
)

        final_score = max(
            0,
            min(final_score, 100)
        )

        if final_score >= 75:

            recommendation = (
                "SAFE TO PROCEED"
            )

        elif final_score >= 50:

            recommendation = (
                "PROCEED WITH CAUTION"
            )

        else:

            recommendation = (
                "HIGH RISK - AVOID"
            )

        return jsonify({

            "riskScore":
            risk_score,

            "trustScore":
            trust_score,

            "listingScore":
            listing_score,

            "finalScore":
            final_score,

            "recommendation":
            recommendation

        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500