import CONFIG from './config'

const API_ENDPOINT = {
  BASE: `${CONFIG.BASE_URL}`,
  LOGIN: `${CONFIG.BASE_URL}login`,
  LIST_DOSEN: `${CONFIG.BASE_URL}mahasiswa/dosen`,
  QUESTION: `${CONFIG.BASE_URL}mahasiswa/response`,
  NILAI_DOSEN: `${CONFIG.BASE_URL}dosen/nilai`,
  DOSEN_COURSES: `${CONFIG.BASE_URL}dosen/courses`,
  CETAK_BUKTI: `${CONFIG.BASE_URL}responses/cetak`,
  DOSEN_COURSES_DETAIL: `${CONFIG.BASE_URL}dosen/courses/details`,
}

export default API_ENDPOINT
