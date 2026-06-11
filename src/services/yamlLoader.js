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

    const testsConfig = [
        {
            sem: '3',
            subject: 'socio',
            testNames: ['sem3_socio_s1_annal_2024_2025', 'sem3_socio_s2_annal_2024_2025']
        },
        {
            sem: '3',
            subject: 'science',
            testNames: ['sem3_science_s1_decembre_2025', 'sem3_science_s1_annal_2024_2025']
        },
        {
            sem: '4',
            subject: 'psycho',
            testNames: ['sem4_psycho_s2_annal_2024_2025']
        },
        {
            sem: '4',
            subject: 'physiologie',
            testNames: ['sem4_physiologie_s1_annal_2024_2025']
        },
        {
            sem: '4',
            subject: 'science_educ',
            testNames: ['sem4_science_educ_s2_annal_2024_2025']
        }
    ];

    for (const config of testsConfig) {
        for (const testName of config.testNames) {
            const subjetPath = `/QCM/sujet/semestre${config.sem}/${config.subject}/${testName}.yml`;
            const correctionPath = `/QCM/correction/semestre${config.sem}/${config.subject}/${testName}_correction.yml`;

            console.log('Loading:', subjetPath, correctionPath);

            const subjetData = await loadYAML(subjetPath);
            const correctionData = await loadYAML(correctionPath);

            if (subjetData && correctionData) {
                tests.push({
                    id: `sem${config.sem}-${config.subject}-${testName}`,
                    name: subjetData.titre,
                    semestre: config.sem,
                    subject: config.subject,
                    testName,
                    sujet: subjetData,
                    correction: correctionData
                });
            }
        }
    }

    return tests;
}

