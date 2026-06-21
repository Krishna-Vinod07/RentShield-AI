import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/verify.css";

export default function VerifyLandlord() {

  const ownershipRef = useRef(null);
  const utilityRef = useRef(null);

  const [ownershipFile, setOwnershipFile] = useState(null);
const [utilityFile, setUtilityFile] = useState(null);
  const [listingText, setListingText] = useState("");

  const [ownerResult, setOwnerResult] = useState(null);
  const [billResult, setBillResult] = useState(null);
  const [listingResult, setListingResult] = useState(null);
  const [trustScore, setTrustScore] = useState(null);
const [trustVerdict, setTrustVerdict] = useState("");

const [finalScore, setFinalScore] = useState(null);
const [finalVerdict, setFinalVerdict] = useState("");

  const [loading, setLoading] = useState(false);

  const verifyOwnership = async () => {

  if (!ownershipFile) {
    alert("Please upload an ownership document.");
    return;
  }

  setLoading(true);

  try {

    const formData = new FormData();

    formData.append(
      "file",
      ownershipFile
    );

    const response = await fetch(
      "http://127.0.0.1:5000/api/verify-owner",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    console.log(data);

    setOwnerResult(data);
    console.log("OWNER RESULT", data);

localStorage.setItem(
  "ownershipScore",
  data.authenticityScore
);

  } catch (error) {

    console.error(error);

    alert("Failed to verify ownership.");
  }

  setLoading(false);
};

  const verifyUtility = async () => {

  if (!utilityFile) {
    alert("Please upload a utility bill.");
    return;
  }

  setLoading(true);

  try {

    const formData = new FormData();

    formData.append(
      "file",
      utilityFile
    );

    const response = await fetch(
      "http://127.0.0.1:5000/api/verify-bill",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    console.log(data);

    setBillResult(data);
    console.log("UTILITY RESULT", data);

localStorage.setItem(
  "utilityScore",
  data.confidence
);

  } catch (error) {

    console.error(error);

    alert("Failed to verify utility bill.");
  }

  setLoading(false);
};
  const analyzeListing = async () => {

  if (!listingText.trim()) {
    alert("Please paste listing text.");
    return;
  }

  setLoading(true);

  try {

    const response = await fetch(
      "http://127.0.0.1:5000/api/verify-listing",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          listingText
        })
      }
    );

    const data = await response.json();

    console.log(data);

    setListingResult(data);
    console.log("LISTING RESULT", data);

localStorage.setItem(
  "listingScore",
  data.authenticityScore
);

  } catch (error) {

    console.error(error);

    alert("Failed to analyze listing.");
  }

  setLoading(false);
};

const calculateScores = async (
  ownerData,
  billData,
  listingData
) => {

  try {

    // TRUST SCORE

    const trustResponse = await fetch(
      "http://127.0.0.1:5000/api/trust-score",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({

          ownershipScore:
            ownerData.authenticityScore || 0,

          utilityScore:
            billData.confidence || 0,

          listingScore:
            listingData.authenticityScore || 0,

          fraudPenalty:
            listingData.verdict === "HIGH RISK"
              ? 20
              : 0

        })
      }
    );

    const trustData =
      await trustResponse.json();

    setTrustScore(
  trustData.trustScore
);

setTrustVerdict(
  trustData.verdict
);

// SAVE FOR PDF

localStorage.setItem(
  "ownershipScore",
  ownerData.authenticityScore || 0
);

localStorage.setItem(
  "utilityScore",
  billData.confidence || 0
);

localStorage.setItem(
  "listingScore",
  listingData.authenticityScore || 0
);

localStorage.setItem(
  "trustScore",
  trustData.trustScore || 0
);

    // GET AGREEMENT ANALYSIS DATA

    const analysisData =
      JSON.parse(
        localStorage.getItem(
          "analysisResult"
        )
      ) || {};

    // FINAL SCORE

    const finalResponse = await fetch(
      "http://127.0.0.1:5000/api/final-score",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({

          riskScore:
            analysisData.riskScore || 0,

          trustScore:
            trustData.trustScore || 0,

          listingScore:
            listingData.authenticityScore || 0

        })
      }
    );

    const finalData =
      await finalResponse.json();

    setFinalScore(
  finalData.finalScore
);

setFinalVerdict(
  finalData.recommendation
);

localStorage.setItem(
  "finalScore",
  finalData.finalScore || 0
);

  } catch (error) {

    console.error(error);

  }

};

useEffect(() => {

  if (
    ownerResult &&
    billResult &&
    listingResult
  ) {
    calculateScores(
      ownerResult,
      billResult,
      listingResult
    );
  }

}, [
  ownerResult,
  billResult,
  listingResult
]);
  return (
    <>
      <Navbar />

      <div className="verify-page">

        <div className="verify-header">

          <span className="verify-badge">
            🛡️ Ownership Verification Module
          </span>

          <h1>
            Verify Landlord
            <span className="gradient-text">
              {" "}Before Signing
            </span>
          </h1>

          <p>
            Upload ownership records, utility bills and
            listing information to validate landlord identity,
            verify property ownership and detect rental fraud.
          </p>

        </div>

        <div className="verify-grid">

          {/* OWNER */}

          <div className="verify-card">

            <div className="card-icon">🏠</div>

            <h2>Ownership Verification</h2>

            <p>
              Property Deed • EC • Khata • Tax Receipt
            </p>

            <div
              className="upload-zone"
              onClick={() => ownershipRef.current.click()}
            >

              <input
                ref={ownershipRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) =>
  setOwnershipFile(
    e.target.files[0] || null
  )
}
              />

              <span>📄</span>

              <h4>
                {ownershipFile
  ? ownershipFile.name
  : "Upload Property Deed"}
              </h4>

              <small>
                PDF • DOCX • JPG • PNG
              </small>

            </div>

            <button
              className="primary-btn"
              onClick={verifyOwnership}
            >
              Verify Ownership
            </button>

            {ownerResult && (

              <div className="result-box">

                <p>
                  <strong>Owner:</strong>{" "}
                  {ownerResult.ownerName}
                </p>

                <p>
                  <strong>Score:</strong>{" "}
                  {ownerResult.authenticityScore}
                </p>

                <p>
                  <strong>Verdict:</strong>{" "}
                  {ownerResult.verdict}
                </p>

              </div>

            )}

          </div>

          {/* BILL */}

          <div className="verify-card">

            <div className="card-icon">⚡</div>

            <h2>Utility Bill Match</h2>

            <p>
              Electricity • Water • Internet Bills
            </p>

            <div
              className="upload-zone"
              onClick={() => utilityRef.current.click()}
            >

              <input
                ref={utilityRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) =>
  setUtilityFile(
    e.target.files[0] || null
  )
}
              />

              <span>📑</span>

              <h4>
                {utilityFile
  ? utilityFile.name
  : "Upload Utility Bill"}
              </h4>

              <small>
                PDF • DOCX • JPG • PNG
              </small>

            </div>

            <button
              className="primary-btn"
              onClick={verifyUtility}
            >
              Verify Utility Bill
            </button>

            {billResult && (

              <div className="result-box">

                <p>
  <strong>Account Holder:</strong>
  {billResult.accountHolder}
</p>

<p>
  <strong>Provider:</strong>
  {billResult.provider}
</p>

<p>
  <strong>Address:</strong>
  {billResult.address}
</p>

<p>
  <strong>Confidence:</strong>
  {billResult.confidence}%
</p>

<p>
  <strong>Verdict:</strong>
  {billResult.verdict}
</p>

              </div>

            )}

          </div>

        </div>

        {/* LISTING */}

        <div className="verify-card listing-card">

          <div className="card-icon">🔍</div>

          <h2>Listing Authenticity Check</h2>

          <p>
            Paste listing descriptions from
            MagicBricks, 99acres, OLX,
            Housing.com or WhatsApp.
          </p>

          <textarea
            className="listing-input"
            value={listingText}
            onChange={(e) =>
              setListingText(e.target.value)
            }
            placeholder="Paste listing text..."
          />

          <button
            className="primary-btn"
            onClick={analyzeListing}
          >
            Analyze Listing
          </button>

          {listingResult && (

            <div className="result-box">

              <p>
                <strong>Score:</strong>{" "}
                {listingResult.authenticityScore}
              </p>

              <p>
                <strong>Verdict:</strong>{" "}
                {listingResult.verdict}
              </p>

              <p>
                <strong>Signal:</strong>{" "}
                {listingResult.fraudSignals?.[0]}
              </p>

            </div>

          )}

        </div>

        {loading && (

          <div className="result-box">

            <h3>
              Processing Verification...
            </h3>

          </div>

        )}
        {trustScore !== null && (

<div className="verify-card score-card">

  <h2>Landlord Trust Score</h2>

  <div
    className="score-circle"
    style={{
      background: `conic-gradient(
        #00ff88 ${trustScore * 3.6}deg,
        #1a1a1a 0deg
      )`
    }}
  >
    <div className="score-inner">
      <h1>{trustScore}</h1>
      <span>/100</span>
    </div>
  </div>

  <div className="risk-badge">
    {trustVerdict}
  </div>

</div>

)}

{finalScore !== null && (

<div className="verify-card score-card">

  <h2>Final Rental Safety Score</h2>

  <div
    className="score-circle"
    style={{
      background: `conic-gradient(
        #00ff88 ${finalScore * 3.6}deg,
        #1a1a1a 0deg
      )`
    }}
  >
    <div className="score-inner">
      <h1>{finalScore}</h1>
      <span>/100</span>
    </div>
  </div>

  <div className="risk-badge">
    {finalVerdict}
  </div>

</div>

)}

      </div>

    </>
  );
}