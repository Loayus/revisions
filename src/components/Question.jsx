export default function Question({ question, questionIndex, correctIndices = [] }) {
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  const correctIndicesSet = new Set(correctIndices);

  return (
    <div className="question">
      <h3>{questionIndex}. {question.title}</h3>
      <div className="options">
        {question.options && question.options.map((option, idx) => {
          const letter = optionLetters[idx];
          const isCorrect = correctIndicesSet.has(letter);
          return (
            <label key={idx} className={`option ${isCorrect ? 'correct' : ''}`}>
              <span className="option-letter">{letter}</span>
              <span className="option-text">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

