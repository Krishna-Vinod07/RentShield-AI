import { motion } from "framer-motion";
import "../styles/dashboard.css";

export default function DashboardPreview() {
  return (
    <section className="dashboard-preview" id="dashboard">

      <div className="dashboard-header">

        <span className="mono dashboard-tag">
          LIVE ANALYSIS
        </span>

        <h2>
          Rental Risk Intelligence
        </h2>

        <p>
          AI-generated rental safety insights from
          agreements, ownership documents and listings.
        </p>

      </div>

      <motion.div
        className="dashboard-card glass"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >

        <div className="score-grid">

          <div className="score-box">
            <h3>Risk Score</h3>
            <span className="risk-score">
              24
            </span>
          </div>

          <div className="score-box">
            <h3>Trust Score</h3>
            <span className="trust-score">
              87
            </span>
          </div>

          <div className="score-box">
            <h3>Authenticity</h3>
            <span className="auth-score">
              91
            </span>
          </div>

          <div className="score-box">
            <h3>Safety Score</h3>
            <span className="safe-score">
              82
            </span>
          </div>

        </div>

        <div className="recommendation">

          ✓ Proceed With Confidence

        </div>

      </motion.div>

    </section>
  );
}