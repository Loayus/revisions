import {useEffect, useState} from 'react';
import {getAllTests} from '../services/yamlLoader';
import Question from '../components/Question';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream:    #fdf6ec;
    --peach:    #f5c5a3;
    --rose:     #e8a598;
    --sage:     #a8c5b0;
    --lavender: #c5b8e8;
    --sand:     #e8d5b0;
    --text:     #3d2e2e;
    --muted:    #8a7060;
    --sky:      #b0cce8;
  }

  .subj-page {
    min-height: 100vh;
    padding: 2.5rem 1.5rem 5rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    background:
      radial-gradient(ellipse at 20% 10%, #b0cce820 0%, transparent 50%),
      radial-gradient(ellipse at 80% 85%, #c5b8e818 0%, transparent 50%),
      var(--cream);
  }

  .subj-inner {
    max-width: 720px;
    margin: 0 auto;
  }

  /* ── Loading ── */
  .subj-loading {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 1rem; min-height: 60vh;
  }
  .subj-loading-dots { display: flex; gap: 8px; }
  .subj-loading-dots span {
    width: 10px; height: 10px; border-radius: 50%;
    background: linear-gradient(135deg, var(--sky), var(--lavender));
    animation: dotBounce 1.2s ease-in-out infinite;
  }
  .subj-loading-dots span:nth-child(2) { animation-delay: .15s; }
  .subj-loading-dots span:nth-child(3) { animation-delay: .30s; }
  @keyframes dotBounce {
    0%,80%,100% { transform: scale(.7); opacity: .5; }
    40%         { transform: scale(1.2); opacity: 1; }
  }
  .subj-loading-text { font-size: .9rem; color: var(--muted); font-style: italic; }

  /* ── Back ── */
  .subj-back {
    display: inline-flex; align-items: center; gap: 6px;
    margin-bottom: 2rem;
    padding: 8px 18px;
    border: 1.5px solid var(--sand); background: white;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem; color: var(--muted);
    cursor: pointer;
    transition: color .2s, border-color .2s, box-shadow .2s, transform .2s;
  }
  .subj-back:hover {
    color: var(--text); border-color: var(--sky);
    box-shadow: 0 4px 14px rgba(61,46,46,.07);
    transform: translateX(-3px);
  }

  /* ── Header ── */
  .subj-header {
    margin-bottom: 2.5rem;
    opacity: 0; transform: translateY(16px);
    animation: fadeUp .5s .05s cubic-bezier(.22,.8,.36,1) forwards;
  }
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

  .subj-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: linear-gradient(135deg, var(--sky), #7aaad4);
    color: white;
    font-size: .72rem; font-weight: 500;
    letter-spacing: .08em; text-transform: uppercase;
    padding: 5px 13px; border-radius: 20px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 10px rgba(176,204,232,.45);
  }
  .subj-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 700; line-height: 1.2;
  }
  .subj-header h2 em { font-style: italic; color: var(--sky); }
  .subj-divider {
    width: 48px; height: 3px;
    background: linear-gradient(90deg, var(--sky), var(--lavender));
    border-radius: 4px; margin-top: 1rem;
  }

  /* ── Grille ── */
  .subj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }

  .subj-card {
    position: relative;
    background: rgba(255,255,255,.75);
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(255,255,255,.9);
    border-radius: 20px;
    padding: 1.5rem 1.4rem;
    cursor: pointer; text-align: left;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 4px 18px rgba(61,46,46,.06);
    transition: transform .25s, box-shadow .25s, border-color .25s;
    opacity: 0; transform: translateY(18px);
    animation: fadeUp .45s cubic-bezier(.22,.8,.36,1) forwards;
  }
  .subj-card:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 12px 36px rgba(61,46,46,.1);
    border-color: var(--sky);
  }
  .subj-card::after {
    content: '';
    position: absolute; top: 0; right: 18px;
    width: 28px; height: 28px;
    background: linear-gradient(135deg, var(--sky), var(--lavender));
    border-radius: 0 0 10px 10px; opacity: .5;
  }
  .subj-card-icon {
    width: 42px; height: 42px; border-radius: 12px;
    background: linear-gradient(135deg, #b0cce840, #c5b8e840);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; margin-bottom: 1rem;
  }
  .subj-card-name {
    font-size: .95rem; font-weight: 500;
    color: var(--text); line-height: 1.3; margin-bottom: .4rem;
  }
  .subj-card-cta {
    font-size: .78rem; color: var(--muted);
    display: flex; align-items: center; gap: 4px;
  }
  .subj-card-cta svg { transition: transform .2s; }
  .subj-card:hover .subj-card-cta svg { transform: translateX(4px); }

  /* ── Méta (nb questions) ── */
  .subj-meta {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 2rem; padding: 10px 16px;
    background: rgba(176,204,232,.15);
    border: 1px solid rgba(176,204,232,.35);
    border-radius: 12px;
    font-size: .82rem; color: var(--muted);
    opacity: 0;
    animation: fadeUp .4s .1s cubic-bezier(.22,.8,.36,1) forwards;
  }
  .subj-meta-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: linear-gradient(135deg, var(--sky), var(--lavender));
    flex-shrink: 0;
  }

  /* ── Questions ── */
  .subj-questions {
    display: flex; flex-direction: column; gap: 1rem;
  }

  /* ── Empty ── */
  .subj-empty {
    text-align: center; padding: 4rem 2rem; color: var(--muted);
  }
  .subj-empty-icon { font-size: 3rem; margin-bottom: 1rem; }
  .subj-empty p { font-size: .95rem; }
`;

const CARD_ICONS = ["🧪", "📐", "🔬", "🌿", "📊", "⚗️", "🗺️", "🧮"];

export default function Subjects() {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTest, setSelectedTest] = useState(null);

    useEffect(() => {
        getAllTests().then(all => {
            setTests(all);
            setLoading(false);
        });
    }, []);

    const questionKeys = selectedTest
        ? Object.keys(selectedTest.sujet || {}).filter(k => /^Q\d+$/.test(k))
        : [];

    /* ── Loading ── */
    if (loading) return (
        <div className="subj-page">
            <style>{css}</style>
            <div className="subj-loading">
                <div className="subj-loading-dots"><span/><span/><span/></div>
                <p className="subj-loading-text">Chargement des sujets…</p>
            </div>
        </div>
    );

    /* ── Sujet ouvert ── */
    if (selectedTest) return (
        <div className="subj-page">
            <style>{css}</style>
            <div className="subj-inner">

                <button className="subj-back" onClick={() => setSelectedTest(null)}>
                    ← Retour aux sujets
                </button>

                <div className="subj-header">
                    <div className="subj-badge">📖 Sujet</div>
                    <h2>{selectedTest.name}</h2>
                    <div className="subj-divider"/>
                </div>

                <div className="subj-meta">
                    <span className="subj-meta-dot"/>
                    {questionKeys.length} question{questionKeys.length > 1 ? "s" : ""} — sans les corrections
                </div>

                <div className="subj-questions">
                    {questionKeys.map(key => (
                        <Question
                            key={key}
                            question={selectedTest.sujet[key]}
                            questionIndex={key}
                        />
                    ))}
                </div>

            </div>
        </div>
    );

    /* ── Liste ── */
    return (
        <div className="subj-page">
            <style>{css}</style>
            <div className="subj-inner">

                <div className="subj-header">
                    <div className="subj-badge">📖 Sujets</div>
                    <h2>Choisir un <em>sujet</em></h2>
                    <div className="subj-divider"/>
                </div>

                {tests.length === 0 ? (
                    <div className="subj-empty">
                        <div className="subj-empty-icon">📭</div>
                        <p>Aucun sujet disponible pour l'instant.</p>
                    </div>
                ) : (
                    <div className="subj-grid">
                        {tests.map((test, i) => (
                            <button
                                key={test.id}
                                className="subj-card"
                                style={{animationDelay: `${i * 0.07 + 0.1}s`}}
                                onClick={() => setSelectedTest(test)}
                            >
                                <div className="subj-card-icon">
                                    {CARD_ICONS[i % CARD_ICONS.length]}
                                </div>
                                <div className="subj-card-name">{test.name}</div>
                                <div className="subj-card-cta">
                                    Consulter
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}