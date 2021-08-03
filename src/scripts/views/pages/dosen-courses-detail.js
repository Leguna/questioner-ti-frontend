import BackendSource from '../../data/backend-source'
import {
  dosenDetailCoursesResponse, dosenViewCreateQuestionItemDetailResponse, dosenViewDetailTableSaran
} from '../templates/template-creator'
import UrlParser from "../../routes/url-parser";
import swal from "sweetalert2";

const dosenCoursesDetail = {

  async render() {
    const credentials = BackendSource.getCredentials()
    let show = ''
    if (credentials == null) {
      window.location.href = "/#/login"
    } else {
      show = dosenDetailCoursesResponse("Gabut")
    }

    return show
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const {coursesid} = url.params

    let response = await BackendSource.dosenGetDetailCourses(coursesid)
    console.log(response.data.data)
    if (response.data.status) {
      const {dataKelas, listQuestions, listRataRata, listSaran, rataRataSeluruh} = response.data.data
      const credentials = BackendSource.getCredentials()

      document.querySelector('#namaDosen').innerHTML = `Dosen: ${credentials.name}`
      document.querySelector('#namaMakul').innerHTML = `Mata Kuliah: ${dataKelas["courses_name"]}`
      document.querySelector('#namaSemester').innerHTML = `Semester: ${dataKelas["semester"]} tahun ${dataKelas["year"]}`
      document.querySelector('#namaKelas').innerHTML = `Kelas: ${dataKelas["class_name"]}`

      const tableQuestion = document.querySelector('#tableQuestion')
      const ratarata = document.querySelector('#ratarata')
      const tableSaran = document.querySelector('#tableSaran')

      for (let i = 0; i < listQuestions.length; i++) {
        tableQuestion.innerHTML+=dosenViewCreateQuestionItemDetailResponse(i+1,listQuestions[i],listRataRata[i])
      }
      for (const saran of listSaran) {
        tableSaran.innerHTML+= dosenViewDetailTableSaran(saran)
      }
      ratarata.innerHTML = rataRataSeluruh.toFixed(2)
    } else {

    }

  }

}

export default dosenCoursesDetail
