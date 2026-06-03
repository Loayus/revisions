import YAML from 'js-yaml';

export async function loadYAML(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status} for path: ${path}`);
      return null;
    }
    const text = await response.text();
    return YAML.load(text);
  } catch (error) {
    console.error('Error loading YAML from path:', path, error);
    return null;
  }
}

export async function getAllTests() {
  const tests = [];

  const semestres = [
    { sem: '3', subjects: ['socio'] },
    { sem: '4', subjects: ['psycho', 'science_educ'] }
  ];

  const testNameMap = {
    'socio-3': 'exam_1session_sem3',
    'psycho-4': 'exam_2session_sem4',
    'science_educ-4': 'exam_2session_sem4'
  };

  for (const semestre of semestres) {
    for (const subject of semestre.subjects) {
      const testName = testNameMap[`${subject}-${semestre.sem}`];

      if (!testName) continue;

      const subjetPath = `/QCM/sujet/semestre${semestre.sem}/${subject}/${testName}.yml`;
      const correctionPath = `/QCM/correction/semestre${semestre.sem}/${subject}/${testName}_correction.yml`;

      console.log('Loading:', subjetPath, correctionPath);

      const subjetData = await loadYAML(subjetPath);
      const correctionData = await loadYAML(correctionPath);

      // Only add test if both files loaded successfully
      if (subjetData && correctionData) {
        tests.push({
          id: `sem${semestre.sem}-${subject}-${testName}`,
          name: `Semestre ${semestre.sem} - ${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${testName}`,
          semestre: semestre.sem,
          subject,
          testName,
          sujet: subjetData,
          correction: correctionData
        });
      }
    }
  }

  return tests;
}

