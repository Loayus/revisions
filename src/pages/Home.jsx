import { useEffect, useState } from "react";
import "./Home.css";

const floatingEmojis = ["📚", "✏️", "🧠", "⭐", "💡", "📝", "🎯", "✨"];

export default function Home({ onNavigate }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="home-wrapper">
      {/* Blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Emojis flottants */}
      {floatingEmojis.map((emoji, i) => (
        <span
          key={i}
          className="float-emoji"
          style={{
            left: `${10 + i * 11}%`,
            bottom: `${10 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.9}s`,
            animationDuration: `${5 + (i % 3)}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* Carte */}
      <div className={`home-card ${visible ? "visible" : ""}`}>
        <div className="deco-corner" />

        <div className="badge">✨ Espace révisions</div>

        <h1 className="home-title">
          Bienvenue,{" "}
          <span className="italic">Océane</span> 🌸
        </h1>

        <div className="divider" />

        <p className="home-subtitle">
          Ton espace personnel pour réviser intelligemment.<br />
          Des QCM pour tester tes connaissances et progresser à ton rythme.
        </p>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => onNavigate('quiz')}>
            📝 Commencer un QCM
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('subjects')}>
            📖 Voir les sujets
          </button>
        </div>
      </div>
    </div>
  );
}

