export default function Question({ question, questionIndex, correctIndices = [] }) {
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  const correctIndicesSet = new Set(correctIndices);

  // Vérifier si la question a une correction
  const hasCorrection = correctIndices && correctIndices.length > 0;

  return (
    <div className={`question ${!hasCorrection ? 'question--no-correction' : ''}`}>
      <h3>{questionIndex}. {question.title}</h3>
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
            <label key={idx} className={`option ${isCorrect ? 'correct' : ''} ${!hasCorrection ? 'option--disabled' : ''}`}>
              <span className="option-letter">{letter}</span>
              <span className="option-text">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

