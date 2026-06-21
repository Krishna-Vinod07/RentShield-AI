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

    answer = ask_groq(message)

    return jsonify({
        "answer": answer
    })