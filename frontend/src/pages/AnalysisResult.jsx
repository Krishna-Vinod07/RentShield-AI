import Navbar from "../components/Navbar";
import "../styles/report.css";
import { useNavigate } from "react-router-dom";

export default function AnalysisResult() {

  const navigate = useNavigate();

  const analysisData = {
    riskScore: 82,
    verdict: "HIGH RISK",
    fraudProbability: 68,

    agreementSummary: {
      rent: "₹18,000",
      deposit: "₹100,000",
      duration: "11 Months",
      noticePeriod: "48 Hours",
      lockIn: "11 Months",
      maintenance: "Tenant"
    },

    clauses: [
      {
        severity: "HIGH",
        title: "Non-refundable Deposit",
        plain: "Tenant may lose the entire deposit",
        recommendation: "Make deposit refundable"
      },
      {
        severity: "MEDIUM",
        title: "48 Hour Eviction Notice",
        plain: "Landlord can evict with very short notice",
        recommendation: "Minimum 30 day notice"
      }
    ],

    positives: [
      "Clearly specified rent amount",
      "Property address is mentioned",
      "Agreement duration defined"
    ],

    fraudSignals: [
      "Cash-only payment requested",
      "Owner identity not verified"
    ],

    nextActions: [
      "Verify ownership documents",
      "Negotiate deposit refund clause",
      "Request longer notice period"
    ],

    overallAdvice:
      "Proceed with caution. Verify ownership before signing and request revisions to risky clauses."
  };

  return (
    <>
      <Navbar />

      <div className="report-page">

        <h1 className="report-title">
          AI Rental Analysis Report
        </h1>

        <div className="report-top">

          <div className="risk-panel">

            <div className="risk-circle">
              <h2>{analysisData.riskScore}</h2>
              <span>/100</span>
            </div>

            <h3>{analysisData.verdict}</h3>

            <p>
              Fraud Probability: {analysisData.fraudProbability}%
            </p>

          </div>

          <div className="summary-panel">

            <h2>Agreement Summary</h2>

            <div className="summary-grid">

              <div>
                <strong>Rent</strong>
                <p>{analysisData.agreementSummary.rent}</p>
              </div>

              <div>
                <strong>Deposit</strong>
                <p>{analysisData.agreementSummary.deposit}</p>
              </div>

              <div>
                <strong>Duration</strong>
                <p>{analysisData.agreementSummary.duration}</p>
              </div>

              <div>
                <strong>Notice</strong>
                <p>{analysisData.agreementSummary.noticePeriod}</p>
              </div>

              <div>
                <strong>Lock In</strong>
                <p>{analysisData.agreementSummary.lockIn}</p>
              </div>

              <div>
                <strong>Maintenance</strong>
                <p>{analysisData.agreementSummary.maintenance}</p>
              </div>

            </div>

          </div>

        </div>

        <section className="report-section">

          <h2>Flagged Clauses</h2>

          <div className="clauses-grid">

            {analysisData.clauses.map((clause, index) => (

              <div
                key={index}
                className="clause-card"
              >

                <span
                  className={`severity ${clause.severity.toLowerCase()}`}
                >
                  {clause.severity}
                </span>

                <h3>{clause.title}</h3>

                <p>{clause.plain}</p>

                <small>
                  Recommendation: {clause.recommendation}
                </small>

              </div>

            ))}

          </div>

        </section>

        <section className="report-section">

          <h2>Positive Signals</h2>

          <ul className="report-list">
            {analysisData.positives.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>

        </section>

        <section className="report-section">

          <h2>Fraud Signals</h2>

          <ul className="report-list">
            {analysisData.fraudSignals.map((item, index) => (
              <li key={index}>⚠️ {item}</li>
            ))}
          </ul>

        </section>

        <section className="report-section">

          <h2>Recommended Actions</h2>

          <div className="action-grid">

            {analysisData.nextActions.map((action, index) => (

              <div
                key={index}
                className="action-card"
              >
                {action}
              </div>

            ))}

          </div>

        </section>

        <section className="report-section advice-card">

          <h2>AI Recommendation</h2>

          <p>{analysisData.overallAdvice}</p>

        </section>

        <section className="report-section">

          <h2>Verify Landlord</h2>

          <p>
            Verify ownership records, utility bills,
            and listing authenticity before signing.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/verify")}
          >
            Start Verification
          </button>

        </section>

        <section className="report-section">

          <h2>Ask RentShield AI</h2>

          <div className="mini-chat">

            <div className="chat-bubble">
              Can landlord keep my deposit?
            </div>

            <div className="chat-bubble ai">
              Generally a landlord cannot unfairly
              withhold a deposit without valid reasons.
            </div>

          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/chat")}
          >
            Open AI Assistant
          </button>

        </section>

        <section className="report-section">

          <h2>Landlord Trust Score</h2>

          <div className="trust-preview">

            <h1>87</h1>

            <span>TRUSTED</span>

          </div>

        </section>

        <section className="report-section">

          <h2>Final Rental Safety Score</h2>

          <div className="trust-preview">

            <h1>74</h1>

            <span>
              PROCEED WITH CAUTION
            </span>

          </div>

        </section>

        <div className="report-buttons">

          <button
  className="primary-btn"
>
  Download PDF Report
</button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/verify")}
          >
            Verify Landlord
          </button>

        </div>

      </div>

    </>
  );
}