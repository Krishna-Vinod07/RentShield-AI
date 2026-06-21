from flask import (
    Blueprint,
    request,
    send_file
)

from services.pdf_report import (
    generate_report
)

download_bp = Blueprint(
    "download",
    __name__
)

@download_bp.route(
    "/api/download-report",
    methods=["POST"]
)
def download_report():

    data = request.get_json()

    filename = generate_report(
        data
    )

    return send_file(
        filename,
        as_attachment=True
    )