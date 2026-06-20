import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Building2,
  MessageSquare,
  BadgeCheck,
  AlertTriangle
} from "lucide-react";

import "../styles/features.css";

const features = [
  {
    icon: <FileText size={40} />,
    title: "Agreement Analysis",
    description:
      "AI identifies hidden clauses, unfair terms and risky rental conditions."
  },
  {
    icon: <Shield size={40} />,
    title: "Fraud Detection",
    description:
      "Detect suspicious listings, advance payment scams and fake landlords."
  },
  {
    icon: <Building2 size={40} />,
    title: "Ownership Verification",
    description:
      "Validate ownership documents and property records."
  },
  {
    icon: <BadgeCheck size={40} />,
    title: "Trust Score Engine",
    description:
      "Generate a transparent trust score for landlords and listings."
  },
  {
    icon: <AlertTriangle size={40} />,
    title: "Risk Assessment",
    description:
      "Receive AI-generated rental risk scores and recommendations."
  },
  {
    icon: <MessageSquare size={40} />,
    title: "AI Assistant",
    description:
      "Ask legal and rental questions in simple language."
  }
];

export default function Features() {
  return (
    <section className="features-section" id="features">

      <div className="features-header">

        <span className="feature-tag">
          RENTAL INTELLIGENCE
        </span>

        <h2>
          Everything You Need To
          <span className="gradient-text">
            {" "}Rent Safely
          </span>
        </h2>

        <p>
          RentShield AI combines document analysis,
          fraud detection and ownership verification
          into one intelligent platform.
        </p>

      </div>

      <div className="features-grid">

        {features.map((feature, index) => (

          <motion.div
            key={index}
            className="feature-card"
            whileHover={{
              y: -10,
              scale: 1.03
            }}
          >

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}