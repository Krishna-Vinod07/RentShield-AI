import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import AITerminal from "./AITerminal";
import "../styles/hero.css";
import { useNavigate } from "react-router-dom";


export default function Hero() {
    const navigate = useNavigate();
return ( <section className="hero">


  <div className="hero-glow hero-glow-1"></div>
  <div className="hero-glow hero-glow-2"></div>

  <div className="hero-container">
    {/* LEFT SIDE */}

    <div className="hero-left">

      <motion.div
        className="hero-badge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🛡️ India's AI Rental Safety Platform
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Detect Rental Fraud
        <br />
        <span className="gradient-text">
          Before It Happens
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Analyze rental agreements, verify ownership,
        detect fraudulent listings and generate
        intelligent rental safety scores using AI.
      </motion.p>

      <div className="hero-buttons">

  <button
    className="primary-btn"
    onClick={() => navigate("/analyze")}
  >
    Analyze Agreement
  </button>

  <button
    className="secondary-btn"
    onClick={() => {
      document
        .getElementById("dashboard")
        ?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    View Dashboard
  </button>

</div>

      <div className="hero-metrics">

        <div className="metric-card">
          <h3>10K+</h3>
          <p>Documents Analyzed</p>
        </div>

        <div className="metric-card">
          <h3>98%</h3>
          <p>Detection Accuracy</p>
        </div>

        <div className="metric-card">
          <h3>24/7</h3>
          <p>AI Monitoring</p>
        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="hero-right">

      <motion.img
        src={logo}
        alt="RentShield AI"
        className="hero-logo"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 1, 0, -1, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 8
        }}
      />

      <AITerminal />

      <motion.div
        className="floating-card trust"
        animate={{
          y: [0, -15, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 4
        }}
      >
        <small>Trust Score</small>
        <span>87/100</span>
      </motion.div>

      <motion.div
        className="floating-card risk"
        animate={{
          y: [0, 12, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 5
        }}
      >
        <small>Risk Score</small>
        <span>24/100</span>
      </motion.div>

      <motion.div
        className="floating-card safe"
        animate={{
          y: [0, -10, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 6
        }}
      >
        <small>Verified Owner</small>
        <span>✓</span>
      </motion.div>

    </div>

  </div>

</section>


);
}
