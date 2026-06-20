import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();
  return (
    <motion.nav
      className="navbar glass"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <div className="nav-left">
        <motion.div
  className="logo-wrapper"
  whileHover={{ scale: 1.05 }}
  onClick={() => navigate("/")}
  style={{ cursor: "pointer" }}
>
  <img
    src={logo}
    alt="RentShield AI"
    className="logo"
  />
</motion.div>
      </div>

      <div className="nav-center">
        <a href="/#features">Features</a>
<a href="/#workflow">How It Works</a>
<a href="/#dashboard">Dashboard</a>
<a href="/#assistant">AI Assistant</a>
      </div>

      <div className="nav-right">
        <button
  className="nav-btn"
  onClick={() => navigate("/analyze")}
>
  Get Started
</button>
      </div>
    </motion.nav>
  );
}