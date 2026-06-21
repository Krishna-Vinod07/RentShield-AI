from flask import Flask
from flask_cors import CORS

# Analysis APIs
from routes.analyze import analyze_bp
from routes.chat import chat_bp
from routes.rewrite import rewrite_bp

# Verification APIs
from routes.verify_owner import owner_bp
from routes.verify_bill import bill_bp
from routes.verify_listing import listing_bp

# Scores
from routes.trust_score import trust_bp
from routes.final_score import final_bp

# PDF Download
from routes.download_routes import download_bp


app = Flask(__name__)
CORS(app)


# =========================
# Register Blueprints
# =========================

app.register_blueprint(analyze_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(rewrite_bp)

app.register_blueprint(owner_bp)
app.register_blueprint(bill_bp)
app.register_blueprint(listing_bp)

app.register_blueprint(trust_bp)
app.register_blueprint(final_bp)

app.register_blueprint(download_bp)


# =========================
# Health Check Routes
# =========================

@app.route("/")
def home():
    return {
        "message": "RentShield AI Backend Running"
    }


@app.route("/test")
def test():
    return {
        "status": "working"
    }


# =========================
# Run Server
# =========================

if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )