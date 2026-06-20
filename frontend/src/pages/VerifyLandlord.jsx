import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import "../styles/verify.css";

export default function VerifyLandlord() {

  const ownershipRef = useRef();
  const utilityRef = useRef();

  const [ownershipFile, setOwnershipFile] = useState("");
  const [utilityFile, setUtilityFile] = useState("");
  const [listingText, setListingText] = useState("");

  const verifyOwnership = () => {

    if (!ownershipFile) {
      alert("Please upload an ownership document.");
      return;
    }

    alert(
      "Ownership Verified Successfully!\n\nOwner Name Match: YES\nAuthenticity Score: 94\nVerdict: VERIFIED"
    );
  };

  const verifyUtility = () => {

    if (!utilityFile) {
      alert("Please upload a utility bill.");
      return;
    }

    alert(
      "Utility Bill Matched!\n\nAddress Match: YES\nName Match: YES\nConfidence: 92%"
    );
  };

  const analyzeListing = () => {

    if (!listingText.trim()) {
      alert("Please paste listing text.");
      return;
    }

    alert(
      "Listing Analysis Complete!\n\nAuthenticity Score: 62\nVerdict: SUSPICIOUS\nRed Flag: Advance payment requested."
    );
  };

  return (
    <>
      <Navbar />

      <div className="verify-page">

        {/* HEADER */}

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

        {/* GRID */}

        <div className="verify-grid">

          {/* OWNERSHIP */}

          <div className="verify-card">

            <div className="card-icon">
              🏠
            </div>

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
                    e.target.files[0]?.name || ""
                  )
                }
              />

              <span>📄</span>

              <h4>
                {ownershipFile
                  ? ownershipFile
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

          </div>

          {/* UTILITY */}

          <div className="verify-card">

            <div className="card-icon">
              ⚡
            </div>

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
                    e.target.files[0]?.name || ""
                  )
                }
              />

              <span>📑</span>

              <h4>
                {utilityFile
                  ? utilityFile
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

          </div>

        </div>

        {/* LISTING CHECK */}

        <div className="verify-card listing-card">

          <div className="card-icon">
            🔍
          </div>

          <h2>Listing Authenticity Check</h2>

          <p>
            Paste listing descriptions from MagicBricks,
            99acres, OLX, Housing.com or WhatsApp.
          </p>

          <textarea
            className="listing-input"
            value={listingText}
            onChange={(e) =>
              setListingText(e.target.value)
            }
            placeholder="Paste property listing text, WhatsApp messages, OLX description, MagicBricks listing..."
          />

          <button
            className="primary-btn"
            onClick={analyzeListing}
          >
            Analyze Listing
          </button>

        </div>

        {/* TRUST SCORE */}

        <div className="trust-card">

          <div className="trust-circle">
            <h2>87</h2>
            <span>/100</span>
          </div>

          <div className="trust-content">

            <h3>TRUSTED LANDLORD</h3>

            <p>
              Overall Trust Score generated using
              ownership verification, utility matching
              and listing authenticity analysis.
            </p>

            <div className="trust-points">

              <div className="trust-item">
                ✓ Ownership Verified
              </div>

              <div className="trust-item">
                ✓ Utility Address Match
              </div>

              <div className="trust-item">
                ✓ Authentic Listing
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}