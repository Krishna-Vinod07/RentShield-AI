import Navbar from "../components/Navbar";

export default function VerificationCenter() {
  return (
    <>
      <Navbar />

      <div className="page-container">

        <h1>Verification Center</h1>

        <div className="result-grid">

          <div className="result-card">
            <h2>Ownership Verification</h2>
            <button>Upload Property Deed</button>
          </div>

          <div className="result-card">
            <h2>Utility Bill Verification</h2>
            <button>Upload Utility Bill</button>
          </div>

          <div className="result-card">
            <h2>Listing Authenticity</h2>
            <button>Upload Listing</button>
          </div>

        </div>

      </div>
    </>
  );
}