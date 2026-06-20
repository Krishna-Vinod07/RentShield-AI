import "../styles/particles.css";

export default function FloatingParticles() {

  const particles = Array.from(
    { length: 80 },
    (_, i) => i
  );

  return (
    <div className="particles-container">

      {particles.map((particle) => (
        <span
          key={particle}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 15}s`
          }}
        />
      ))}

    </div>
  );
}