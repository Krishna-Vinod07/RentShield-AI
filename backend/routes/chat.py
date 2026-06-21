from flask import Blueprint, request, jsonify
from services.groq_service import ask_groq

chat_bp = Blueprint(
    "chat",
    __name__
)


@chat_bp.route(
    "/api/chat",
    methods=["POST"]
)
def chat():

    data = request.get_json()

    message = data.get(
        "message",
        ""
    )

    prompt = f"""
You are RentShield AI.

You are an expert in:

- Rental Agreements
- Security Deposits
- Tenant Rights
- Landlord Verification
- Rental Fraud Detection

IMPORTANT:

- Answer in Markdown format
- Use headings
- Use bullet points
- Use numbered lists
- Use short paragraphs
- Mention risks when applicable
- Give practical recommendations
- Keep answers concise

User Question:

{message}
"""

    answer = ask_groq(prompt)

    return jsonify({
        "answer": answer
    })