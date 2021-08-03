import BackendSource from '../../data/backend-source'
import {
  dosenViewCreateListCourses,
  mahasiswaViewCreateListDosen,
  createListDosenItem, dosenViewCreateItemListCourses,
  teknisiViewHome,
  adminViewHome
} from '../templates/template-creator'

const homeMahasiswa = {

  async render() {
    const credentials = BackendSource.getCredentials()
    let show = ``
    switch (credentials.role) {
      case 1:
        show = dosenViewCreateListCourses()
        break
      case 2:
        show = mahasiswaViewCreateListDosen()
        break
      case 0:
        show = teknisiViewHome()
        break
      case -1:
        show = adminViewHome()
        break
      default:
        sessionStorage.clear()
        window.location.href = "/#/login"
        break
    }
    return show
  },

  async afterRender() {
    const credentials = BackendSource.getCredentials()
    switch (credentials.role) {
      case 0:
        await this.afterRenderTeknisi(credentials)
        break
      case 1:
        await this.afterRenderDosen(credentials)
        break
      case 2:
        await this.afterRenderMahasiswa(credentials)
        break
    }
  },

  async afterRenderTeknisi(credentials) {

  },
  async afterRenderDosen(credentials) {
    const table = document.querySelector('#tableDosen')
    let response = await BackendSource.getListKinerja(credentials.id)

    const data = response.data
    if(data.status){
      const listCourses = data.data.listDosenData
      for (let i = 0; i < listCourses.length; i++) {
        const {class_id,class_name,course_id,courses_name,dosen_id,q_group,semester,year} = listCourses[i];
        table.innerHTML+= dosenViewCreateItemListCourses(i+1,courses_name,class_name,year, semester,course_id)
      }
    }

  },

  async afterRenderMahasiswa(credentials) {
    const table = document.querySelector('#tableDosen')
    let response = BackendSource.getListDosen(credentials.id)
    response.then(value => {
      let data = value.data
      if (data.status) {
        let listDosen = data.data.list_dosen
        let no = 0

        for (const dosen of listDosen) {
          no++;
          const isDataExists = dosen.questions_group !== null
          let timestamp;
          if (isDataExists)
            timestamp = new Date(dosen.timestamp).toLocaleString("ID");

          table.innerHTML += createListDosenItem(no, dosen.name, dosen.courses_name, timestamp, dosen.course_id, credentials.id, isDataExists)
        }
      }
    })
  }
}

export default homeMahasiswa
