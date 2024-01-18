
const specialtyMap = {
    'chest pain': 'Cardiology',
    'rash': 'Dermatologist',
    'joint pain': 'Rheumatologist',
    // Add more symptoms and specialties as needed
  };

const findRecommendeDoctor = (value) => {
    for (const symptom in specialtyMap) {
        if (value.includes(symptom)) {
            return specialtyMap[symptom];
        }
    }
    return 'General Practitioner';
};

export default findRecommendeDoctor;