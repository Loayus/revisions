import {getImageUrl} from '../assets/imageMap'

export default function Question({question, questionIndex, correctIndices = []}) {
    const optionLetters = ['A', 'B', 'C', 'D', 'E'];
    const correctIndicesSet = new Set(correctIndices);
    const hasCorrection = correctIndices && correctIndices.length > 0;

    // Récupère juste le nom de fichier de ton YAML
    const imageUrl = question.visuel ? getImageUrl(question.visuel) : null;

    return (
        <div className={`question ${!hasCorrection ? 'question--no-correction' : ''}`}>
            <h3>{questionIndex}. {question.title}</h3>
            {imageUrl && (
                <div className="question-visuel">
                    <img src={imageUrl} alt="Visuel pour la question"/>
                </div>
            )}
            {!hasCorrection && (
                <div className="question-no-correction-msg">
                    ℹ️ Pas de correction pour cette question
                </div>
            )}
            <div className="options">
                {question.options && question.options.map((option, idx) => {
                    const letter = optionLetters[idx];
                    const isCorrect = correctIndicesSet.has(letter);
                    return (
                        <label key={idx}
                               className={`option ${isCorrect ? 'correct' : ''} ${!hasCorrection ? 'option--disabled' : ''}`}>
                            <span className="option-letter">{letter}</span>
                            <span className="option-text">{option}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

