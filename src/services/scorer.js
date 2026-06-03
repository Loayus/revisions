export function calculateScore(correctIndices, userAnswers) {
  const correctSet = new Set(correctIndices);
  const userAnswersSet = new Set(userAnswers);

  const nbCorrectAnswers = correctIndices.length;

  if (nbCorrectAnswers === 0) {
    return 0; // Si pas de bonnes réponses, on peut pas scorer
  }

  const pointsPerAnswer = 1 / nbCorrectAnswers;

  let score = 0;

  // Ajouter les points pour les bonnes réponses correctement cochées
  for (const answer of userAnswers) {
    if (correctSet.has(answer)) {
      score += pointsPerAnswer;
    } else {
      // Retirer les points pour les mauvaises réponses cochées
      score -= pointsPerAnswer;
    }
  }

  // S'assurer que le score ne soit pas négatif
  score = Math.max(0, score);

  return score;
}

export function calculateAllResults(test, userAnswersMap) {
  const results = [];

  const sujetKeys = Object.keys(test.sujet).filter((key) =>
    /^Q\d+$/.test(key)
  );

  for (const questionKey of sujetKeys) {
    const correctIndices =
      test.correction.questions[questionKey]?.correct_indices || [];
    const userAnswers = userAnswersMap[questionKey] || [];

    const points = calculateScore(correctIndices, userAnswers);

    results.push({
      questionIndex: questionKey,
      correctIndices,
      userAnswers,
      points,
    });
  }

  return results;
}

