export default function InteractiveQuestion({
  question,
  questionIndex,
  correctIndices,
  selectedAnswers,
  onAnswerChange,
  showResults,
}) {
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  const correctIndicesSet = new Set(correctIndices);

  const getOptionStatus = (letter) => {
    const isCorrect = correctIndicesSet.has(letter);
    const isSelected = selectedAnswers.includes(letter);

    if (!showResults) return null;

    if (isCorrect && isSelected) return 'correct';
    if (isCorrect && !isSelected) return 'missed';
    if (!isCorrect && isSelected) return 'wrong';
    return null;
  };

  return (
    <div className="question">
      <h3>{questionIndex}. {question.title}</h3>
      <div className="options">
        {question.options &&
          question.options.map((option, idx) => {
            const letter = optionLetters[idx];
            const isSelected = selectedAnswers.includes(letter);
            const status = getOptionStatus(letter);

            return (
              <label
                key={idx}
                className={`option ${status ? status : ''} ${
                  showResults ? 'disabled' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onAnswerChange(questionIndex, letter)}
                  disabled={showResults}
                />
                <span className="option-letter">{letter}</span>
                <span className="option-text">{option}</span>
              </label>
            );
          })}
      </div>
    </div>
  );
}

