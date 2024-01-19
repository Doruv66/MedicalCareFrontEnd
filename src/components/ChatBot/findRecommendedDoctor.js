
const specialtyMap = {
    'chest pain': 'Cardiology',
    'menstrual irregularities': 'Gynecology',
    'rash': 'Dermatology',
    'unexplained weight loss': 'Oncology',
    'headaches': 'Neurology',
    'back pain': 'Orthopedics',
    'mood disorders': 'Psychiatry',
    'fatigue': 'Internal Medicine',
    'fever in children': 'Pediatrics',
    'chest pain': 'Cardiology',
    'skin changes': 'Dermatology',
    'hair loss': 'Dermatology',
    'sexual health concerns': 'Gynecology',
    'eating disorders': 'Psychiatry',
    'bone fractures': 'Orthopedics',
    'dizziness and balance issues': 'Neurology',
    'sleep disorders': 'Sleep Medicine',
    'skin cancer': 'Dermatology',
    'joint swelling': 'Orthopedics',
    'high blood pressure': 'Cardiology',
    'diabetes management': 'Endocrinology',
    'pediatric developmental issues': 'Pediatrics',
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