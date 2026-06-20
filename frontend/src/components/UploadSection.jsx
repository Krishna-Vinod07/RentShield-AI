import { motion } from "framer-motion";
import { Upload, FileText, ShieldCheck } from "lucide-react";
import "../styles/upload.css";
import { useNavigate } from "react-router-dom";

export default function UploadSection() {
    const navigate = useNavigate();
  return (
    <section className="upload-section" id="upload">

      <div className="upload-glow"></div>

      <motion.div
        className="upload-container glass"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <span className="upload-badge">
          AI Document Analysis
        </span>

        <h2>
          Upload Your Rental Agreement
        </h2>

        <p>
          Upload rental agreements, ownership documents,
          screenshots or property details and let AI
          detect fraud, hidden clauses and suspicious terms.
        </p>

        <motion.div
  className="dropzone"
  whileHover={{ scale: 1.02 }}
  onClick={() => navigate("/analyze")}
  style={{ cursor: "pointer" }}
>
  <Upload size={60} />

  <h3>Drag & Drop File Here</h3>

  <span>
    PDF • DOCX • Images
  </span>

  <button
    onClick={(e) => {
      e.stopPropagation();
      navigate("/analyze");
    }}
  >
    Choose File
  </button>

</motion.div>

        <div className="upload-features">

          <div className="upload-card">
            <FileText size={30} />
            <h4>OCR Extraction</h4>
            <p>Extract text from agreements</p>
          </div>

          <div className="upload-card">
            <ShieldCheck size={30} />
            <h4>Fraud Detection</h4>
            <p>Detect risky clauses instantly</p>
          </div>

          <div className="upload-card">
            <Upload size={30} />
            <h4>AI Risk Score</h4>
            <p>Generate trust score report</p>
          </div>

        </div>

      </motion.div>

    </section>
  );
}