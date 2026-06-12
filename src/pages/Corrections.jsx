import {useEffect, useState} from 'react';
import {getAllTests} from '../services/yamlLoader';
import Question from '../components/Question';
import './Corrections.css';

const SUBJECT_LABELS = {
  socio: 'Sociologie',
  science: 'Sciences',
  psycho: 'Psychologie',
  physiologie: 'Physiologie',
  science_educ: "Sciences de l'éducation",
};

const CARD_ICONS = ["🧪", "📐", "🔬", "🌿", "📊", "⚗️", "🗺️", "🧮"];

export default function Corrections() {
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

    // group by subject
    const grouped = tests.reduce((acc, t) => {
        const key = t.subject || 'autre';
        if (!acc[key]) acc[key] = [];
        acc[key].push(t);
        return acc;
    }, {});

    /* ── Loading ── */
    if (loading) return (
        <div className="corr-page">
            <div className="corr-loading">
                <div className="corr-loading-dots"><span/><span/><span/></div>
                <p className="corr-loading-text">Chargement des corrections…</p>
            </div>
        </div>
    );

    /* ── Correction ouverte ── */
    if (selectedTest) return (
        <div className="corr-page">
            <div className="corr-inner">

                <button className="corr-back" onClick={() => setSelectedTest(null)}>
                    ← Retour aux corrections
                </button>

                <div className="corr-header">
                    <div className="corr-badge">✅ Correction</div>
                    <h2>{selectedTest.name}</h2>
                    <div className="corr-divider"/>
                </div>

                <div className="corr-meta">
                    <span className="corr-meta-dot"/>
                    {questionKeys.length} question{questionKeys.length > 1 ? "s" : ""} — les bonnes réponses sont
                    surlignées
                </div>

                <div className="corr-questions">
                    {questionKeys.map(key => (
                        <Question
                            key={key}
                            question={selectedTest.sujet[key]}
                            questionIndex={key}
                            correctIndices={selectedTest.correction.questions?.[key]?.correct_indices || []}
                        />
                    ))}
                </div>

            </div>
        </div>
    );

    /* ── Liste groupée par matière ── */
    return (
        <div className="corr-page">
            <div className="corr-inner">

                <div className="corr-header">
                    <div className="corr-badge">✅ Corrections</div>
                    <h2>Consulter les <em>corrections</em> par matière</h2>
                    <div className="corr-divider"/>
                </div>

                {tests.length === 0 ? (
                    <div className="corr-empty">
                        <div className="corr-empty-icon">📭</div>
                        <p>Aucune correction disponible pour l'instant.</p>
                    </div>
                ) : (
                    <div className="corr-sections">
                        {Object.keys(grouped).map((subjectKey) => (
                            <section key={subjectKey} style={{marginBottom: '2.25rem'}}>
                                <h3 style={{margin: '0 0 0.75rem 0'}}>{SUBJECT_LABELS[subjectKey] || subjectKey}</h3>
                                <div className="corr-grid">
                                    {grouped[subjectKey].map((test, i) => (
                                        <button
                                            key={test.id}
                                            className="corr-card"
                                            style={{animationDelay: `${i * 0.07 + 0.1}s`}}
                                            onClick={() => setSelectedTest(test)}
                                        >
                                            <div className="corr-card-icon">
                                                {CARD_ICONS[i % CARD_ICONS.length]}
                                            </div>
                                            <div className="corr-card-name">{test.name}</div>
                                            <div className="corr-card-cta">
                                                Voir la correction
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                                                          strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
