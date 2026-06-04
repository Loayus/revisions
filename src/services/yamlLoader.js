import YAML from 'js-yaml';

function getFullPath(relativePath) {
    return import.meta.env.BASE_URL + relativePath.replace(/^\//, '');
}

export async function loadYAML(path) {
    try {
        const fullPath = getFullPath(path);
        const response = await fetch(fullPath);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status} for path: ${fullPath}`);
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
        {sem: '3', subjects: ['socio']},
        {sem: '4', subjects: ['psycho', 'science_educ']}
    ];

    const testNameMap = {
        'socio-3': 'sem3_socio_s1_annal_2024_2025',
        'psycho-4': 'sem4_psycho_s2_annal_2024_2025',
        'science_educ-4': 'sem4_science_educ_s2_annal_2024_2025'
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

            if (subjetData && correctionData) {
                tests.push({
                    id: `sem${semestre.sem}-${subject}-${testName}`,
                    name: subjetData.titre,
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

