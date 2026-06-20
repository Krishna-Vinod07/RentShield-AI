import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AnalyzeAgreement() {

  const navigate = useNavigate();

  const [agreementText, setAgreementText] = useState("");
  const [fileName, setFileName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");

  const fileRef = useRef(null);

  const handleFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);
  };

  const handleAnalyze = () => {

    if (!fileName && !agreementText.trim()) {

      alert(
        "Please upload a file or paste agreement text."
      );

      return;
    }

    setAnalyzing(true);

    setAnalysisStep(
      "📄 Extracting Agreement Text..."
    );

    setTimeout(() => {

      setAnalysisStep(
        "🔍 Detecting Risky Clauses..."
      );

    }, 1000);

    setTimeout(() => {

      setAnalysisStep(
        "⚠️ Checking Fraud Signals..."
      );

    }, 2000);

    setTimeout(() => {

      setAnalysisStep(
        "🛡️ Calculating Trust Score..."
      );

    }, 3000);

    setTimeout(() => {

      setAnalysisStep(
        "📊 Generating AI Report..."
      );

    }, 4000);

    setTimeout(() => {

      navigate("/report");

    }, 5500);
  };

  const loadDemoAgreement = () => {

    setAgreementText(`
RENTAL AGREEMENT

Monthly Rent: ₹18,000

Security Deposit: ₹100,000
(Non-refundable)

Notice Period: 48 Hours

Lock-In Period: 11 Months

Maintenance Charges:
Paid by Tenant

Payments must be made
in cash only.

Owner reserves the right
to terminate occupancy
without prior discussion.
`);
  };

  return (
    <>
      <Navbar />

      <div className="page-container">

        <div className="analyze-header">

          <h1>
            Upload Rental Agreement
          </h1>

          <p>
            Upload agreements, ownership documents,
            screenshots or paste agreement text for
            AI-powered risk analysis.
          </p>

        </div>

        <div className="analysis-inputs">

          <div
            className="upload-box"
            onClick={() => fileRef.current.click()}
          >

            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              style={{ display: "none" }}
              onChange={handleFile}
            />

            <div className="upload-icon">
              ☁️
            </div>

            <h3>
              Drag & Drop Files
            </h3>

            <p>
              PDF • DOCX • JPG • PNG
            </p>

            {fileName && (
              <div className="selected-file">
                📄 {fileName}
              </div>
            )}

          </div>

          <div className="text-input-box">

            <h3>
              Paste Agreement Text
            </h3>

            <textarea
              rows="12"
              value={agreementText}
              onChange={(e) =>
                setAgreementText(e.target.value)
              }
              placeholder="Paste your rental agreement here..."
            />

          </div>

        </div>

        <div className="demo-wrapper">

          <button
            className="secondary-btn"
            onClick={loadDemoAgreement}
          >
            Try Demo Agreement
          </button>

        </div>

        <div className="analyze-action">

  {!analyzing ? (

    <button
      className="primary-btn analyze-btn"
      onClick={handleAnalyze}
    >
      Analyze Agreement
    </button>

  ) : (

    <div className="analysis-loader">

      <div className="loader-ring"></div>

      <h3>Analyzing Agreement...</h3>

      <p>
        Detecting hidden clauses • Calculating risk score •
        Checking fraud indicators
      </p>

    </div>

  )}

</div>

        

      </div>
    </>
  );
}