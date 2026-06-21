from flask import Blueprint, request, jsonify
from services.groq_service import ask_groq

rewrite_bp = Blueprint(
    "rewrite",
    __name__
)

@rewrite_bp.route(
    "/api/rewrite",
    methods=["POST"]
)
def rewrite():

    data = request.get_json()

    clause = data.get(
        "clause",
        ""
    )

    prompt = f"""
You are a rental agreement expert.

Rewrite the following clause in a fair and tenant-friendly way.

Clause:
{clause}

Return only the rewritten clause.
"""

    suggested = ask_groq(prompt)

    return jsonify({
        "original": clause,
        "suggested": suggested
    })