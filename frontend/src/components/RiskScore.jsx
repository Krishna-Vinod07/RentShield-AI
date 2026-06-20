import { motion } from "framer-motion";

export default function RiskScore() {
  return (
    <div className="risk-score-card">

      <motion.div
        className="risk-circle"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1
        }}
      >
        <h1>24</h1>
        <span>/100</span>
      </motion.div>

      <h2>LOW RISK</h2>

      <p>
        Agreement appears mostly safe
      </p>

    </div>
  );
}