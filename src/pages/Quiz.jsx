import {useEffect, useState} from 'react';
import {getAllTests} from '../services/yamlLoader';
import {calculateAllResults} from '../services/scorer';
import InteractiveQuestion from '../components/InteractiveQuestion';
import ResultsPage from '../components/ResultsPage';
import './Quiz.css';

const SUBJECT_LABELS = {
  socio: 'Sociologie',
  science: 'Sciences',
  psycho: 'Psychologie',
  physiologie: 'Physiologie',
  science_educ: "Sciences de l'éducation",
};

/* ─── Icônes par index (cycle) ───────────────────────────────────────────── */
const CARD_ICONS = ["🧪", "📐", "🔬", "🌿", "📊", "⚗️", "🗺️", "🧮"];

/* ─── Composant ─────────────────────────────────────────────────────────── */
export default function Quiz() {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTest, setSelectedTest] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        getAllTests().then(all => {
            setTests(all);
            setLoading(false);
        });
    }, []);

    /* Nombre de questions répondues */
    const questionKeys = selectedTest
        ? Object.keys(selectedTest.sujet || {}).filter(k => /^Q\d+$/.test(k))
        : [];
    const answeredCount = questionKeys.filter(k => (userAnswers[k] || []).length > 0).length;
    const progressPct = questionKeys.length > 0
        ? Math.round((answeredCount / questionKeys.length) * 100)
        : 0;

    const handleAnswerChange = (questionIndex, letter) => {
        setUserAnswers(prev => {
            const cur = prev[questionIndex] || [];
            return {
                ...prev,
                [questionIndex]: cur.includes(letter)
                    ? cur.filter(a => a !== letter)
                    : [...cur, letter],
            };
        });
    };

    const handleValidate = () => {
        setResults(calculateAllResults(selectedTest, userAnswers));
        setShowResults(true);
    };

    const handleBackToTests = () => {
        setSelectedTest(null);
        setUserAnswers({});
        setShowResults(false);
        setResults([]);
    };

    const handleBackFromResults = () => {
        setUserAnswers({});
        setShowResults(false);
        setResults([]);
    };

    /* Group tests by subject for sections */
    const grouped = tests.reduce((acc, t) => {
        const key = t.subject || 'autre';
        if (!acc[key]) acc[key] = [];
        acc[key].push(t);
        return acc;
    }, {});

    /* ── Loading ── */
    if (loading) return (
        <div className="quiz-page">
            <div className="quiz-loading">
                <div className="quiz-loading-dots">
                    <span/><span/><span/>
                </div>
                <p className="quiz-loading-text">Chargement des QCM…</p>
            </div>
        </div>
    );

    /* ── Résultats ── */
    if (showResults && selectedTest) return (
        <ResultsPage
                test={selectedTest}
                results={results}
                onBackClick={handleBackFromResults}
            />
    );

    /* ── Quiz en cours ── */
    if (selectedTest && !showResults) return (
        <div className="quiz-page">
            <div className="quiz-page-inner">

                <button className="quiz-back" onClick={handleBackToTests}>
                    ← Retour aux QCM
                </button>

                <div className="quiz-header">
                    <div className="quiz-header-badge">📝 QCM en cours</div>
                    <h2>{selectedTest.name}</h2>
                    <div className="quiz-header-divider"/>
                </div>

                {/* Barre de progression */}
                <div className="quiz-progress">
                    <div className="quiz-progress-bar-wrap">
                        <div
                            className="quiz-progress-bar-fill"
                            style={{width: `${progressPct}%`}}
                        />
                    </div>
                    <span className="quiz-progress-label">
            {answeredCount} / {questionKeys.length} réponses
          </span>
                </div>

                <div className="quiz-questions">
                    {questionKeys.map(key => (
                        <InteractiveQuestion
                            key={key}
                            question={selectedTest.sujet[key]}
                            questionIndex={key}
                            correctIndices={selectedTest.correction.questions[key]?.correct_indices || []}
                            selectedAnswers={userAnswers[key] || []}
                            onAnswerChange={handleAnswerChange}
                            showResults={false}
                        />
                    ))}
                </div>

                <div className="quiz-validate-wrap">
                    <button className="quiz-validate" onClick={handleValidate}>
                        Valider mes réponses ✨
                    </button>
                </div>

            </div>
        </div>
    );

    /* ── Liste des tests groupée par matière ── */
    return (
        <div className="quiz-page">
            <div className="quiz-page-inner">

                <div className="quiz-header">
                    <div className="quiz-header-badge">🎯 Choix du QCM</div>
                    <h2>Quel QCM <em>aujourd'hui</em>&nbsp;?</h2>
                    <div className="quiz-header-divider"/>
                </div>

                {tests.length === 0 ? (
                    <div className="quiz-empty">
                        <div className="quiz-empty-icon">📭</div>
                        <p>Aucun QCM disponible pour l'instant.</p>
                    </div>
                ) : (
                    <div className="quiz-sections">
                        {Object.keys(grouped).map((subjectKey, sIdx) => (
                            <section key={subjectKey} style={{marginBottom: '2.25rem'}}>
                                <h3 style={{margin: '0 0 0.75rem 0'}}>
                                    {SUBJECT_LABELS[subjectKey] || subjectKey}
                                </h3>
                                <div className="quiz-grid">
                                    {grouped[subjectKey].map((test, i) => (
                                        <button
                                            key={test.id}
                                            className="quiz-card"
                                            style={{animationDelay: `${i * 0.07 + 0.1}s`}}
                                            onClick={() => {
                                                setSelectedTest(test);
                                                setUserAnswers({});
                                                setShowResults(false);
                                            }}
                                        >
                                            <div className="quiz-card-icon">
                                                {CARD_ICONS[i % CARD_ICONS.length]}
                                            </div>
                                            <div className="quiz-card-name">{test.name}</div>
                                            <div className="quiz-card-cta">
                                                Commencer
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
