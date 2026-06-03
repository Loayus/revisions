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
    --correct:  #a8c5b0;
    --missed:   #f5c5a3;
    --wrong:    #e8a598;
  }

  .res-page {
    min-height: 100vh;
    padding: 2.5rem 1.5rem 5rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    background:
      radial-gradient(ellipse at 10% 15%, #c5b8e820 0%, transparent 50%),
      radial-gradient(ellipse at 85% 80%, #f5c5a318 0%, transparent 50%),
      var(--cream);
  }

  .res-inner {
    max-width: 720px;
    margin: 0 auto;
  }

  /* ── Back ── */
  .res-back {
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
  .res-back:hover {
    color: var(--text); border-color: var(--lavender);
    box-shadow: 0 4px 14px rgba(61,46,46,.07);
    transform: translateX(-3px);
  }

  /* ── Hero score ── */
  .res-hero {
    position: relative;
    background: rgba(255,255,255,.72);
    backdrop-filter: blur(16px);
    border: 1.5px solid rgba(255,255,255,.9);
    border-radius: 28px;
    padding: 2.5rem 2.5rem 2rem;
    text-align: center;
    box-shadow: 0 8px 40px rgba(61,46,46,.08);
    margin-bottom: 2rem;
    overflow: hidden;
    opacity: 0; transform: translateY(20px);
    animation: fadeUp .55s .05s cubic-bezier(.22,.8,.36,1) forwards;
  }
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

  /* Coin déco */
  .res-hero::before {
    content: '';
    position: absolute; top: 0; right: 24px;
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--lavender), var(--rose));
    border-radius: 0 0 16px 16px;
    opacity: .55;
  }

  .res-hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: linear-gradient(135deg, var(--lavender), #a090d8);
    color: white;
    font-size: .72rem; font-weight: 500;
    letter-spacing: .08em; text-transform: uppercase;
    padding: 5px 13px; border-radius: 20px;
    margin-bottom: 1.2rem;
    box-shadow: 0 2px 10px rgba(197,184,232,.4);
  }

  .res-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    font-weight: 700; color: var(--muted);
    margin-bottom: 1.5rem;
  }

  /* Cercle de score */
  .res-score-ring {
    position: relative;
    width: 150px; height: 150px;
    margin: 0 auto 1.5rem;
  }
  .res-score-ring svg {
    transform: rotate(-90deg);
    width: 150px; height: 150px;
  }
  .res-score-ring-bg {
    fill: none;
    stroke: var(--sand);
    stroke-width: 8;
  }
  .res-score-ring-fill {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-dasharray: 408;
    stroke-dashoffset: 408;
    animation: ringFill 1.1s .3s cubic-bezier(.22,.8,.36,1) forwards;
  }
  @keyframes ringFill {
    to { stroke-dashoffset: var(--dash-target); }
  }
  .res-score-center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .res-score-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem; font-weight: 700;
    line-height: 1; color: var(--text);
  }
  .res-score-denom {
    font-size: .85rem; color: var(--muted); margin-top: 2px;
  }

  /* Emoji feedback */
  .res-feedback-emoji { font-size: 2rem; margin-bottom: .4rem; }
  .res-feedback-msg {
    font-size: 1rem; color: var(--muted);
    font-style: italic;
  }

  /* Chips stats */
  .res-stats {
    display: flex; justify-content: center;
    gap: .75rem; flex-wrap: wrap;
    margin-top: 1.5rem; padding-top: 1.5rem;
    border-top: 1px dashed rgba(61,46,46,.1);
  }
  .res-stat-chip {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: .8rem; font-weight: 500;
  }
  .res-stat-chip.good  { background: #a8c5b022; color: #4d8a60; }
  .res-stat-chip.bad   { background: #e8a59822; color: #b55a4a; }
  .res-stat-chip.miss  { background: #f5c5a322; color: #a0702a; }

  /* ── Section détail ── */
  .res-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 700;
    color: var(--text);
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 8px;
    opacity: 0;
    animation: fadeUp .45s .35s cubic-bezier(.22,.8,.36,1) forwards;
  }
  .res-section-divider {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, var(--sand), transparent);
  }

  /* ── Carte question résultat ── */
  .res-question-card {
    background: rgba(255,255,255,.68);
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(255,255,255,.9);
    border-radius: 20px;
    padding: 1.4rem 1.5rem;
    margin-bottom: .85rem;
    box-shadow: 0 3px 16px rgba(61,46,46,.05);
    opacity: 0;
    animation: fadeUp .4s cubic-bezier(.22,.8,.36,1) forwards;
    transition: box-shadow .2s;
  }
  .res-question-card:hover {
    box-shadow: 0 6px 24px rgba(61,46,46,.09);
  }

  .res-q-top {
    display: flex; align-items: flex-start;
    justify-content: space-between; gap: 1rem;
    margin-bottom: 1rem;
  }
  .res-q-title {
    font-size: .95rem; font-weight: 500; line-height: 1.4;
  }
  .res-q-pill {
    flex-shrink: 0;
    padding: 4px 12px; border-radius: 50px;
    font-size: .75rem; font-weight: 600;
    white-space: nowrap;
  }
  .res-q-pill.full    { background: #a8c5b030; color: #3d7a50; }
  .res-q-pill.partial { background: #f5c5a330; color: #a06820; }
  .res-q-pill.zero    { background: #e8a59830; color: #a04030; }

  /* ── Options résultat ── */
  .res-options { display: flex; flex-direction: column; gap: 6px; }

  .res-option {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 14px; border-radius: 12px;
    font-size: .88rem; line-height: 1.35;
    transition: transform .15s;
  }
  .res-option.correct {
    background: #a8c5b022;
    border: 1.5px solid #a8c5b060;
  }
  .res-option.missed {
    background: #f5c5a322;
    border: 1.5px dashed #f5c5a380;
  }
  .res-option.wrong {
    background: #e8a59820;
    border: 1.5px solid #e8a59860;
  }
  .res-option:not(.correct):not(.missed):not(.wrong) {
    background: rgba(61,46,46,.03);
    border: 1.5px solid transparent;
  }

  .res-option-letter {
    width: 26px; height: 26px; flex-shrink: 0;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: .78rem; font-weight: 600;
    background: rgba(61,46,46,.07);
    color: var(--muted);
  }
  .res-option.correct .res-option-letter {
    background: #a8c5b0; color: white;
  }
  .res-option.missed .res-option-letter {
    background: var(--peach); color: white;
  }
  .res-option.wrong .res-option-letter {
    background: var(--rose); color: white;
  }

  .res-option-icon { margin-left: auto; flex-shrink: 0; font-size: .85rem; }

  /* ── Légende ── */
  .res-legend {
    display: flex; gap: 1rem; flex-wrap: wrap;
    margin-top: 2rem; padding: 12px 16px;
    background: rgba(255,255,255,.55);
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,.9);
    opacity: 0;
    animation: fadeUp .4s .5s cubic-bezier(.22,.8,.36,1) forwards;
  }
  .res-legend-item {
    display: flex; align-items: center; gap: 6px;
    font-size: .75rem; color: var(--muted);
  }
  .res-legend-dot {
    width: 10px; height: 10px; border-radius: 3px;
  }
  .res-legend-dot.correct { background: var(--sage); }
  .res-legend-dot.missed  { background: var(--peach); }
  .res-legend-dot.wrong   { background: var(--rose); }
`;

function getFeedback(pct) {
    if (pct >= 90) return {emoji: "🌟", msg: "Parfait, tu déchires !"};
    if (pct >= 75) return {emoji: "🎉", msg: "Très bien joué !"};
    if (pct >= 60) return {emoji: "💪", msg: "Bien, continue comme ça !"};
    if (pct >= 40) return {emoji: "📚", msg: "Encore un peu de révisions…"};
    return {emoji: "🌱", msg: "On va y arriver, courage !"};
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function ResultsPage({test, userAnswers, results, onBackClick}) {
    const totalScore = results.reduce((sum, r) => sum + r.points, 0);
    const maxScore = results.length;
    const pct = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const scoreOut20 = (pct / 100) * 20;
    const feedback = getFeedback(pct);

    const goodCount = results.filter(r => r.points === 1).length;
    const partialCount = results.filter(r => r.points > 0 && r.points < 1).length;
    const zeroCount = results.filter(r => r.points === 0).length;

    /* Calcul de l'offset SVG : circonférence = 2π×65 ≈ 408 */
    const dashTarget = 408 - (pct / 100) * 408;

    /* Couleur de l'anneau selon score */
    const ringColor = pct >= 75 ? '#a8c5b0' : pct >= 50 ? '#c5b8e8' : '#e8a598';

    return (
        <div className="res-page">
            <style>{css}</style>
            <div className="res-inner">

                <button className="res-back" onClick={onBackClick}>
                    ← Refaire le QCM
                </button>

                {/* ── Hero ── */}
                <div className="res-hero">
                    <div className="res-hero-badge">✨ Résultats</div>
                    <p className="res-hero-title">{test.name}</p>

                    <div className="res-score-ring">
                        <svg viewBox="0 0 150 150">
                            <circle className="res-score-ring-bg" cx="75" cy="75" r="65"/>
                            <circle
                                className="res-score-ring-fill"
                                cx="75" cy="75" r="65"
                                stroke={ringColor}
                                style={{'--dash-target': dashTarget}}
                            />
                        </svg>
                        <div className="res-score-center">
                            <span className="res-score-num">{scoreOut20.toFixed(1)}</span>
                            <span className="res-score-denom">/20</span>
                        </div>
                    </div>

                    <div className="res-feedback-emoji">{feedback.emoji}</div>
                    <p className="res-feedback-msg">{feedback.msg}</p>

                    <div className="res-stats">
                        <span className="res-stat-chip good">✅ {goodCount} correcte{goodCount > 1 ? "s" : ""}</span>
                        {partialCount > 0 && (
                            <span
                                className="res-stat-chip miss">🔶 {partialCount} partielle{partialCount > 1 ? "s" : ""}</span>
                        )}
                        <span className="res-stat-chip bad">❌ {zeroCount} incorrecte{zeroCount > 1 ? "s" : ""}</span>
                    </div>
                </div>

                {/* ── Détail ── */}
                <div className="res-section-title">
                    Détail des réponses
                    <span className="res-section-divider"/>
                </div>

                {results.map((result, idx) => {
                    const question = test.sujet[result.questionIndex];
                    const correctSet = new Set(result.correctIndices);
                    const pillClass = result.points === 1 ? 'full' : result.points > 0 ? 'partial' : 'zero';
                    const pillLabel = result.points === 1 ? `${result.points.toFixed(2)} pt ✓` : `${result.points.toFixed(2)} / 1`;

                    return (
                        <div
                            key={idx}
                            className="res-question-card"
                            style={{animationDelay: `${idx * 0.06 + 0.4}s`}}
                        >
                            <div className="res-q-top">
                <span className="res-q-title">
                  {result.questionIndex}. {question.title}
                </span>
                                <span className={`res-q-pill ${pillClass}`}>{pillLabel}</span>
                            </div>

                            <div className="res-options">
                                {question.options?.map((option, optIdx) => {
                                    const letter = OPTION_LETTERS[optIdx];
                                    const isCorrect = correctSet.has(letter);
                                    const wasSelected = result.userAnswers.includes(letter);

                                    const statusClass =
                                        isCorrect && wasSelected ? 'correct' :
                                            isCorrect && !wasSelected ? 'missed' :
                                                !isCorrect && wasSelected ? 'wrong' : '';

                                    const icon =
                                        statusClass === 'correct' ? '✅' :
                                            statusClass === 'missed' ? '⚠️' :
                                                statusClass === 'wrong' ? '❌' : '';

                                    return (
                                        <div key={optIdx} className={`res-option ${statusClass}`}>
                                            <span className="res-option-letter">{letter}</span>
                                            <span>{option}</span>
                                            {icon && <span className="res-option-icon">{icon}</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {/* ── Légende ── */}
                <div className="res-legend">
                    <div className="res-legend-item">
                        <span className="res-legend-dot correct"/>
                        Bonne réponse cochée
                    </div>
                    <div className="res-legend-item">
                        <span className="res-legend-dot missed"/>
                        Bonne réponse manquée
                    </div>
                    <div className="res-legend-item">
                        <span className="res-legend-dot wrong"/>
                        Mauvaise réponse cochée
                    </div>
                </div>

            </div>
        </div>
    );
}