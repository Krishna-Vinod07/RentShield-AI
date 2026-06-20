import { motion } from "framer-motion";
import "../styles/assistant.css";

export default function AIAssistant() {
  return (
    <section className="assistant-section" id="assistant">

      <div className="assistant-left">

        <span className="assistant-tag">
          AI LEGAL ASSISTANT
        </span>

        <h2>
          Ask Rental Questions
          <span className="gradient-text">
            {" "}In Plain English
          </span>
        </h2>

        <p>
          Get instant explanations for clauses,
          deposits, eviction notices, agreements,
          ownership documents and rental disputes.
        </p>

       <a href="/chat">
  <button className="primary-btn">
    Start Asking
  </button>
</a>

      </div>

      <motion.div
        className="chat-window"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >

        <div className="chat-header">
          RentShield AI Assistant
        </div>

        <div className="chat-body">

          <div className="user-msg">
            Can my landlord keep my deposit?
          </div>

          <div className="ai-msg">
            Generally, a landlord cannot unfairly
            withhold a security deposit. The amount
            retained must usually be justified by
            damages, unpaid rent or agreement terms.
          </div>

          <div className="user-msg">
            Is 48-hour eviction notice legal?
          </div>

          <div className="ai-msg">
            A 48-hour notice may be considered
            unreasonable depending on local laws.
            RentShield flags this clause as HIGH RISK.
          </div>

        </div>

      </motion.div>

    </section>
  );
}