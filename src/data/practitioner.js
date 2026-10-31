export const PRACTITIONER = {
  name: 'Dewi Kartini',
  url: 'https://relungjiwa.site/profil-praktisi/',
  image: 'https://relungjiwa.site/assets/img/upload/Folder%20Upload%20All%20Mentor/Foto%20mentor/DSC00539.jpeg',
  disclaimer: 'Layanan Relung Jiwa bersifat komplementer dan non-klinis. Layanan ini bukan diagnosis, psikoterapi klinis, atau pengganti konsultasi dan perawatan tenaga kesehatan berizin.',
}

export const PRACTITIONER_CREDENTIALS = [
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Hipnoterapis', category: 'Sertifikat kompetensi' },
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Public Relation', category: 'Sertifikat kompetensi' },
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Juru Hipnosis', category: 'Sertifikat kompetensi' },
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Pelaksanaan Program Pelatihan Tatap Muka', category: 'Sertifikat kompetensi' },
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Pelaksanaan Coaching', category: 'Sertifikat kompetensi' },
  { issuer: 'National Guild of Hypnotists Inc (NGH)', title: 'Consulting Hypnotists', category: 'Sertifikat' },
  { issuer: 'National Build of Hypnotis', title: 'Consulting Hypnosist', category: 'Sertifikat (nama lembaga sesuai data yang diberikan)' },
  { issuer: 'Ghazalian Institute', title: 'Pelatihan Ghazalian Counselling Psychotherapy', category: 'Pelatihan' },
  { issuer: 'Resource Therapy', title: 'Certificate of Achievement Resource Therapy Trainer', category: 'Certificate of Achievement' },
  { issuer: 'StoryPlay', title: 'Course Work StoryPlay', category: 'Course work' },
]

export const PRACTITIONER_PERSON_SCHEMA = {
  '@type': 'Person',
  '@id': 'https://relungjiwa.site/profil-praktisi/#dewi-kartini',
  name: PRACTITIONER.name,
  url: PRACTITIONER.url,
  image: PRACTITIONER.image,
  jobTitle: 'Praktisi Hipnoterapi dan Pendampingan Komplementer Non-Klinis',
  worksFor: { '@id': 'https://relungjiwa.site/#organization' },
  description: PRACTITIONER.disclaimer,
  hasCredential: PRACTITIONER_CREDENTIALS.map(({ issuer, title, category }) => ({
    '@type': 'EducationalOccupationalCredential',
    name: title,
    credentialCategory: category,
    recognizedBy: { '@type': 'Organization', name: issuer },
  })),
}
