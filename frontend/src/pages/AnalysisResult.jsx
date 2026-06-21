import Navbar from "../components/Navbar";
import "../styles/report.css";
import { useNavigate } from "react-router-dom";

export default function AnalysisResult() {

  const navigate = useNavigate();

  const storedData =
  JSON.parse(
    localStorage.getItem(
      "analysisResult"
    )
  ) || {};

const analysisData = {

  fraudProbability: 0,

  positives: [],

  nextActions: [],

  recommendation: "",

  riskScore: 0,

  verdict: "No Analysis Available",

  agreementSummary: {
    rent: "-",
    deposit: "-",
    duration: "-",
    noticePeriod: "-",
    lockIn: "-",
    maintenance: "-"
  },

  clauses: [],

  fraudSignals: [],

  overallAdvice:
    "Upload an agreement and run analysis.",

  ...storedData,

  agreementSummary: {
    rent: "-",
    deposit: "-",
    duration: "-",
    noticePeriod: "-",
    lockIn: "-",
    maintenance: "-",
    ...(storedData.agreementSummary || {})
  }
};

const downloadReport = async () => {

  try {

    const reportData = {

      ...analysisData,

      ownershipScore:
        localStorage.getItem(
          "ownershipScore"
        ) || 0,

      utilityScore:
        localStorage.getItem(
          "utilityScore"
        ) || 0,

      listingScore:
        localStorage.getItem(
          "listingScore"
        ) || 0,

      trustScore:
        localStorage.getItem(
          "trustScore"
        ) || 0,

      finalScore:
        localStorage.getItem(
          "finalScore"
        ) || 0

    };

    const response = await fetch(
      "http://127.0.0.1:5000/api/download-report",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          reportData
        )
      }
    );

    const blob =
      await response.blob();

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "RentShield_Report.pdf";

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {

    console.error(error);

    alert(
      "Failed to download report."
    );

  }

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
  Fraud Probability: {analysisData.fraudProbability || 0}%
</p>
          </div>

          <div className="summary-panel">

            <h2>Agreement Summary</h2>

            <div className="summary-grid">

  <div>
    <strong>Rent</strong>
    <p>
      {analysisData.agreementSummary?.rent || "-"}
    </p>
  </div>

  <div>
    <strong>Deposit</strong>
    <p>
      {analysisData.agreementSummary?.deposit || "-"}
    </p>
  </div>

  <div>
    <strong>Duration</strong>
    <p>
      {analysisData.agreementSummary?.duration || "-"}
    </p>
  </div>

  <div>
    <strong>Notice</strong>
    <p>
      {analysisData.agreementSummary?.noticePeriod || "-"}
    </p>
  </div>

  <div>
    <strong>Lock In</strong>
    <p>
      {analysisData.agreementSummary?.lockIn || "-"}
    </p>
  </div>

  <div>
    <strong>Maintenance</strong>
    <p>
      {analysisData.agreementSummary?.maintenance || "-"}
    </p>
  </div>

</div>

          </div>

        </div>

        <section className="report-section">

          <h2>Flagged Clauses</h2>

          <div className="clauses-grid">

            {(analysisData.clauses || []).map((clause, index) => (

              <div
                key={index}
                className="clause-card"
              >

                <span
                  className={`severity ${(clause.severity || "medium").toLowerCase()}`}
                >
                  {clause.severity}
                </span>

                <h3>{clause?.title || "Unknown Clause"}</h3>

                <p>{clause?.plain || "-"}</p>

                <small>
                  Recommendation: {clause?.recommendation || "-"}
                </small>

              </div>

            ))}

          </div>

        </section>

        <section className="report-section">

          <h2>Positive Signals</h2>

          <ul className="report-list">
            {(analysisData.positives || []).map((item, index) => (
  <li key={index}>✅ {item}</li>
))}
          </ul>

        </section>

        <section className="report-section">

          <h2>Fraud Signals</h2>

          <ul className="report-list">
            {(analysisData.fraudSignals || []).map((item, index) => (
              <li key={index}>⚠️ {item}</li>
            ))}
          </ul>

        </section>

        <section className="report-section">

          <h2>Recommended Actions</h2>

          <div className="action-grid">

            {(analysisData.nextActions || []).map((action, index) => (

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

  <h2>Quick Actions</h2>

  <div className="quick-actions">

    <div
      className="action-circle verify-circle"
      onClick={() => navigate("/verify")}
    >
      <div className="circle-icon">🏠</div>
      <p>Verify Landlord</p>
    </div>

    <div
      className="action-circle chat-circle"
      onClick={() => navigate("/chat")}
    >
      <div className="circle-icon">🤖</div>
      <p>AI Assistant</p>
    </div>

  </div>

</section>


        <div className="report-buttons">

          <button
  className="primary-btn"
  onClick={downloadReport}
>
  Download PDF Report
</button>

          

        </div>

      </div>

    </>
  );
}