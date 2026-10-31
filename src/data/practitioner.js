// ─── TODO: Isi konstanta di bawah setelah data resmi diterima dari praktisi ───
// Jangan mengarang nomor sertifikat atau URL profil publik.

/** URL profil publik Dewi Kartini (LinkedIn, Instagram profesional, dsb.)
 *  Isi hanya jika URL tersebut benar-benar ada dan dapat diakses publik.
 *  @type {string[]} */
export const DEWI_KARTINI_SAME_AS = [
  // TODO: 'https://www.linkedin.com/in/dewi-kartini-...',
  // TODO: 'https://www.instagram.com/...',
]

/** Nomor identifikasi sertifikat — diisi setelah dokumen fisik tersedia.
 *  Jangan mengisi kolom ini dengan data yang tidak terverifikasi. */
const CERT_IDS = {
  BNSP_HIPNOTERAPIS: null,            // TODO: isi nomor BNSP Hipnoterapis
  BNSP_PUBLIC_RELATION: null,         // TODO: isi nomor BNSP Public Relation
  BNSP_JURU_HIPNOSIS: null,           // TODO: isi nomor BNSP Juru Hipnosis
  BNSP_PELATIHAN_TATAP_MUKA: null,    // TODO: isi nomor BNSP Pelatihan Tatap Muka
  BNSP_COACHING: null,                // TODO: isi nomor BNSP Coaching
  NGH_CONSULTING_HYPNOTIST: null,     // TODO: isi nomor NGH
  // Catatan: "National Build of Hypnotis" (entri ke-7) kemungkinan typo dari NGH.
  // Konfirmasi ejaan resmi lembaga sebelum mengisi nomor sertifikat.
  NATIONAL_BUILD_HYPNOTIS: null,      // TODO: konfirmasi nama lembaga & nomor sertifikat
  GHAZALIAN_COUNSELLING: null,        // TODO: isi nomor Ghazalian Institute
  RESOURCE_THERAPY_TRAINER: null,     // TODO: isi nomor Resource Therapy
  STORYPLAY: null,                    // TODO: isi nomor StoryPlay
}

export const PRACTITIONER = {
  name: 'Dewi Kartini',
  url: 'https://relungjiwa.site/profil-praktisi/',
  image: 'https://relungjiwa.site/assets/img/upload/Folder%20Upload%20All%20Mentor/Foto%20mentor/DSC00539.jpeg',
  disclaimer: 'Layanan Relung Jiwa bersifat komplementer dan non-klinis. Layanan ini bukan diagnosis, psikoterapi klinis, atau pengganti konsultasi dan perawatan tenaga kesehatan berizin.',
}

export const PRACTITIONER_CREDENTIALS = [
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Hipnoterapis',                              category: 'Sertifikat kompetensi', certId: CERT_IDS.BNSP_HIPNOTERAPIS },
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Public Relation',                           category: 'Sertifikat kompetensi', certId: CERT_IDS.BNSP_PUBLIC_RELATION },
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Juru Hipnosis',                             category: 'Sertifikat kompetensi', certId: CERT_IDS.BNSP_JURU_HIPNOSIS },
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Pelaksanaan Program Pelatihan Tatap Muka',  category: 'Sertifikat kompetensi', certId: CERT_IDS.BNSP_PELATIHAN_TATAP_MUKA },
  { issuer: 'BNSP', title: 'Sertifikat Kompetensi Pelaksanaan Coaching',                      category: 'Sertifikat kompetensi', certId: CERT_IDS.BNSP_COACHING },
  { issuer: 'National Guild of Hypnotists Inc (NGH)', title: 'Consulting Hypnotist',          category: 'Sertifikat',            certId: CERT_IDS.NGH_CONSULTING_HYPNOTIST },
  // Catatan: nama lembaga "National Build of Hypnotis" dipertahankan sesuai data asli.
  // Konfirmasi ejaan resmi ke praktisi — kemungkinan merupakan typo dari NGH.
  { issuer: 'National Build of Hypnotis', title: 'Consulting Hypnotist',                      category: 'Sertifikat',            certId: CERT_IDS.NATIONAL_BUILD_HYPNOTIS },
  { issuer: 'Ghazalian Institute', title: 'Pelatihan Ghazalian Counselling Psychotherapy',    category: 'Pelatihan',             certId: CERT_IDS.GHAZALIAN_COUNSELLING },
  { issuer: 'Resource Therapy', title: 'Certificate of Achievement Resource Therapy Trainer', category: 'Certificate of Achievement', certId: CERT_IDS.RESOURCE_THERAPY_TRAINER },
  { issuer: 'StoryPlay', title: 'Course Work StoryPlay',                                      category: 'Course work',           certId: CERT_IDS.STORYPLAY },
]

export const PRACTITIONER_PERSON_SCHEMA = {
  '@type': 'Person',
  '@id': 'https://relungjiwa.site/profil-praktisi/#dewi-kartini',
  name: PRACTITIONER.name,
  url: PRACTITIONER.url,
  image: PRACTITIONER.image,
  jobTitle: 'Certified Hypnotherapist & Consulting Hypnotist',
  description: PRACTITIONER.disclaimer,
  worksFor: { '@id': 'https://relungjiwa.site/#organization' },
  knowsAbout: [
    'Hipnoterapi',
    'Hipnosis',
    'Manajemen kecemasan',
    'Manajemen stres',
    'Coaching',
    'Pengembangan diri',
    'Pendampingan komplementer non-klinis',
    'Pikiran bawah sadar',
  ],
  // TODO: Tambahkan URL profil publik yang terverifikasi ke DEWI_KARTINI_SAME_AS
  ...(DEWI_KARTINI_SAME_AS.length > 0 && { sameAs: DEWI_KARTINI_SAME_AS }),
  hasCredential: PRACTITIONER_CREDENTIALS.map(({ issuer, title, category, certId }) => ({
    '@type': 'EducationalOccupationalCredential',
    name: title,
    credentialCategory: category,
    recognizedBy: { '@type': 'Organization', name: issuer },
    // identifier hanya diisi jika certId sudah diverifikasi dari dokumen asli
    ...(certId != null && { identifier: certId }),
  })),
}
