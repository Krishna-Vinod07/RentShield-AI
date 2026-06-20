import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/chatAssistant.css";

export default function ChatAssistant() {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text:
        "Hello! I'm RentShield AI. Ask me anything about rental agreements, landlord verification, deposits or tenant rights."
    }
  ]);

  const getResponse = (q) => {

    const text = q.toLowerCase();

    if (text.includes("deposit")) {
      return "Generally, a landlord cannot unfairly withhold a security deposit. Deductions should only be made for damages, unpaid rent or contract violations.";
    }

    if (
      text.includes("48") ||
      text.includes("notice")
    ) {
      return "A 48-hour eviction notice may be considered unreasonable depending on local rental laws. RentShield flags this clause as HIGH RISK.";
    }

    if (
      text.includes("cash") ||
      text.includes("payment")
    ) {
      return "Cash-only payment requests are often considered a fraud signal because they reduce transaction traceability.";
    }

    if (
      text.includes("refundable")
    ) {
      return "A refundable deposit should normally be returned at the end of the tenancy after legitimate deductions.";
    }

    return "Based on rental best practices, we recommend carefully reviewing the agreement and verifying ownership documents before signing.";
  };

  const sendMessage = () => {

    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion
      },
      {
        type: "ai",
        text: getResponse(userQuestion)
      }
    ]);

    setQuestion("");
  };

  const selectQuestion = (q) => {

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: q
      },
      {
        type: "ai",
        text: getResponse(q)
      }
    ]);
  };

  return (
    <>
      <Navbar />

      <div className="assistant-page">

        <div className="assistant-header">

          <span className="assistant-badge">
            🤖 RentShield Legal AI
          </span>

          <h1>
            Ask
            <span className="gradient-text">
              {" "}RentShield AI
            </span>
          </h1>

          <p>
            Get instant explanations about rental
            agreements, deposits, eviction notices,
            ownership verification and tenant rights.
          </p>

        </div>

        <div className="chat-window">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`message ${msg.type}`}
            >

              {msg.type === "ai" && (
                <div className="avatar">
                  🤖
                </div>
              )}

              <div className="bubble">
                {msg.text}
              </div>

            </div>

          ))}

        </div>

        <div className="suggested">

          <h3>Suggested Questions</h3>

          <div className="suggested-grid">

            <div
              className="question-chip"
              onClick={() =>
                selectQuestion(
                  "Can landlord keep my deposit?"
                )
              }
            >
              Can landlord keep my deposit?
            </div>

            <div
              className="question-chip"
              onClick={() =>
                selectQuestion(
                  "Is 48 hour notice legal?"
                )
              }
            >
              Is 48 hour notice legal?
            </div>

            <div
              className="question-chip"
              onClick={() =>
                selectQuestion(
                  "What is a refundable deposit?"
                )
              }
            >
              What is a refundable deposit?
            </div>

            <div
              className="question-chip"
              onClick={() =>
                selectQuestion(
                  "Is cash-only payment risky?"
                )
              }
            >
              Is cash-only payment risky?
            </div>

          </div>

        </div>

        <div className="chat-input-box">

          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Ask a rental question..."
          />

          <button
            className="primary-btn"
            onClick={sendMessage}
          >
            Send
          </button>

        </div>

      </div>
    </>
  );
}