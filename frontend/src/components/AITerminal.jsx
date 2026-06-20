import { motion } from "framer-motion";
import "../styles/terminal.css";

export default function AITerminal() {
  return (
    <motion.div
      className="ai-terminal"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="terminal-header">

        <div className="dots">
          <span className="red"></span>
          <span className="yellow"></span>
          <span className="green"></span>
        </div>

        <span className="terminal-title">
          RentShield AI Engine
        </span>

      </div>

      <div className="terminal-body">

        <p>
          Analyzing Rental Agreement...
        </p>

        <p className="success">
          ✓ High Deposit Clause Detected
        </p>

        <p>
          Verifying Ownership Records...
        </p>

        <p className="success">
          ✓ Owner Identity Verified
        </p>

        <p>
          Checking Listing Authenticity...
        </p>

        <p className="success">
          ✓ No Fraud Signals Found
        </p>

        <p>
          Computing Trust Score...
        </p>

        <p className="success">
          ✓ Trust Score: 87/100
        </p>

        <div className="cursor"></div>

      </div>

      <div className="scan-line"></div>

    </motion.div>
  );
}