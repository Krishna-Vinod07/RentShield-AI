import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  FileCheck,
  ShieldCheck,
  BadgeCheck
} from "lucide-react";

import "../styles/howitworks.css";

const steps = [
  {
    icon: <Upload size={32} />,
    title: "Upload Agreement",
    description:
      "Upload rental agreements, listings or ownership documents."
  },
  {
    icon: <Brain size={32} />,
    title: "AI Analysis",
    description:
      "RentShield AI scans clauses, detects risks and identifies fraud signals."
  },
  {
    icon: <FileCheck size={32} />,
    title: "Ownership Verification",
    description:
      "Cross-check property ownership and utility records."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Trust Assessment",
    description:
      "Generate landlord trust and listing authenticity scores."
  },
  {
    icon: <BadgeCheck size={32} />,
    title: "Final Recommendation",
    description:
      "Receive a complete rental safety report with actionable advice."
  }
];

export default function HowItWorks() {
  return (
    <section className="how-section" id="workflow">

      <div className="how-header">
        <span className="how-tag">
          HOW IT WORKS
        </span>

        <h2>
          Rental Protection
          <span className="gradient-text">
            {" "}In 5 Steps
          </span>
        </h2>

        <p>
          RentShield AI transforms complex rental verification
          into a simple and trustworthy workflow.
        </p>
      </div>

      <div className="timeline">

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="timeline-icon">
              {step.icon}
            </div>

            <div className="timeline-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}

      </div>

    </section>
  );
}