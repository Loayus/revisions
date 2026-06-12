import {useEffect, useState} from 'react';
import {getAllTests} from '../services/yamlLoader';
import Question from '../components/Question';
import './Subjects.css';

const SUBJECT_LABELS = {
  socio: 'Sociologie',
  science: 'Sciences',
  psycho: 'Psychologie',
  physiologie: 'Physiologie',
  science_educ: "Sciences de l'éducation",
};

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

    // group by subject
    const grouped = tests.reduce((acc, t) => {
        const key = t.subject || 'autre';
        if (!acc[key]) acc[key] = [];
        acc[key].push(t);
        return acc;
    }, {});

    /* ── Loading ── */
    if (loading) return (
        <div className="subj-page">
            <div className="subj-loading">
                <div className="subj-loading-dots"><span/><span/><span/></div>
                <p className="subj-loading-text">Chargement des sujets…</p>
            </div>
        </div>
    );

    /* ── Sujet ouvert ── */
    if (selectedTest) return (
        <div className="subj-page">
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

    /* ── Liste groupée par matière ── */
    return (
        <div className="subj-page">
            <div className="subj-inner">

                <div className="subj-header">
                    <div className="subj-badge">📚 Sujets</div>
                    <h2>Consulter les <em>sujets</em> par matière</h2>
                    <div className="subj-divider"/>
                </div>

                {tests.length === 0 ? (
                    <div className="subj-empty">
                        <div className="subj-empty-icon">📭</div>
                        <p>Aucun sujet disponible pour l'instant.</p>
                    </div>
                ) : (
                    <div className="subj-sections">
                        {Object.keys(grouped).map((subjectKey) => (
                            <section key={subjectKey} style={{marginBottom: '2.5rem'}}>
                                <h3 style={{margin: '0 0 0.75rem 0'}}>{SUBJECT_LABELS[subjectKey] || subjectKey}</h3>
                                <div className="subj-grid">
                                    {grouped[subjectKey].map((test, i) => (
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
                                                Ouvrir le sujet
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
