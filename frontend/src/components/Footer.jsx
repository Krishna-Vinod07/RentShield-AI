import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <h2>
            RentShield
            <span className="gradient-text"> AI</span>
          </h2>

          <p>
            AI-powered rental fraud detection,
            landlord verification and agreement
            analysis platform.
          </p>

        </div>

        <div className="footer-links">

          <div>
            <h4>Platform</h4>

            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="/analyze">Analyze</a>
          </div>

          <div>
            <h4>Verification</h4>

            <a href="/verify">Verify Owner</a>
            <a href="/verify">Utility Match</a>
            <a href="/verify">Listing Check</a>
          </div>

          <div>
            <h4>Resources</h4>

            <a href="/chat">AI Assistant</a>
            <a href="/">Privacy</a>
            <a href="/">Terms</a>
          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 RentShield AI • Built for Bharat
          Academix CodeQuest Hackathon
        </p>

      </div>

    </footer>
  );
}