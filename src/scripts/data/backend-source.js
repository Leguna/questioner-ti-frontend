import API_ENDPOINT from '../globals/api-endpoint'
import axios from 'axios'

class BackendSource {
  static getCredentials() {
    try {
      return JSON.parse(window.sessionStorage.getItem('credentials'));
    } catch (e) {
      return false
    }
  }

  static async checkCredentials(credentials) {
    return axios({
      method: 'post',
      url: API_ENDPOINT.LOGIN,
      data: {
        username: credentials.username,
        password: credentials.password
      }
    });
  }


  // MAHASISWA
  static async getListDosen(userId) {
    const credentials = this.getCredentials()
    console.log(API_ENDPOINT.LIST_DOSEN)
    return axios({
      method: 'post',
      url: API_ENDPOINT.LIST_DOSEN,
      auth: {
        username: credentials.username,
        password: credentials.password,
      },
      data: {
        userId: userId
      },
    });
  }

  static async getQuestion(userId, coursesId) {
    const credentials = this.getCredentials()
    return axios({
      method: 'get',
      url: API_ENDPOINT.QUESTION,
      auth: {
        username: credentials.username,
        password: credentials.password,
      },
      params: {
        userId: userId,
        coursesId: coursesId,
      },
    });
  }

  static async addResponseQuestion(targetId, coursesId, answerResponses) {
    const credentials = this.getCredentials()
    return axios({
      method: 'post',
      url: API_ENDPOINT.QUESTION,
      auth: {
        username: credentials.username,
        password: credentials.password
      },
      data: {
        targetId: targetId,
        coursesId: coursesId,
        questionsGroup: answerResponses
      }
    });
  }

  // DOSEN
  static async getListKinerja() {
    const credentials = this.getCredentials()
    return axios({
      method: 'GET',
      url: API_ENDPOINT.DOSEN_COURSES,
      auth: {
        username: credentials.username,
        password: credentials.password,
      }
    });
  }
  static async dosenGetDetailCourses(coursesId) {
    const credentials = this.getCredentials()
    return axios({
      method: 'GET',
      url: API_ENDPOINT.DOSEN_COURSES_DETAIL,
      params:{
        coursesId
      },
      auth: {
        username: credentials.username,
        password: credentials.password,
      }
    });
  }
}

export default BackendSource
