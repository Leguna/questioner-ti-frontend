import BackendSource from '../../data/backend-source'
import {createQuestionItem} from '../templates/template-creator'
import UrlParser from "../../routes/url-parser";
import swal from "sweetalert2";


const Response = {
  async render() {
    return `
<div class="container my-5 p-5 bg-light border rounded-3">
        <h1>Kuesioner</h1>
        <h5 class="text-muted">Diharapkan kepada para mahasiswa untuk mengisi kuesioner dengan lengkap dan obyektif,
            untuk kepentingan bersama.</h5>
        <br>
        <table class="table table-borderless mt-2">
            <tr>
                <th id="namaDosen" scope="col">-</th>
                <th id="namaJurusan" scope="col">-</th>
            </tr>
            <tr>
                <th id="namaMakul" scope="col">-</th>
                <th id="namaKelas" scope="col">-</th>
            </tr>
        </table>
        <form id="formResponse" method="post" class="py-2">
            <table id="q-table" class="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col" rowspan="2">#</th>
                    <th scope="col" rowspan="2">Pertanyaan</th>
                    <th scope="col" rowspan="1" colspan="5" style="">Nilai</th>
                    <!--                <th scope="col">Aksi</th>-->
                </tr>
                <tr>
                    <th>1: Sangat Tidak Setuju</th>
                    <th>2: Tidak Setuju</th>
                    <th>3: Biasa</th>
                    <th>4: Setuju</th>
                    <th>5: Sangat Setuju</th>
                </tr>
                </thead>
                <tbody id="tableQuestion">
                </tbody>
                <tfoot>
                <tr>
                </tr>
                </tfoot>
            </table>
            
            <div class="input-group">
              <span class="input-group-text">Saran untuk dosen</span>
              <textarea id="textSaran" class="form-control" aria-label="With textarea" name="saran" disabled required></textarea>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button id="kirim_response" type="submit" class="btn btn-primary btn-lg" disabled>Kirim</button>
            </div>
        </form>    
    </div>      
    `
  },

  async afterRender() {

    const url = UrlParser.parseActiveUrlWithoutCombiner()

    const tableQuestion = document.querySelector('#tableQuestion')
    const buttonKirim = document.querySelector('#kirim_response')
    const textAreaSaran = document.querySelector('#textSaran')
    const {userid: userId, coursesid: coursesId} = url.params

    const dataQuestion = BackendSource.getQuestion(userId, coursesId)

    dataQuestion.then(value => {
      if (value.data.status === "success") {
        const dataResponse = value.data.data
        const questions = dataResponse.questions
        const isDataExists = questions[0].questions_group !== null
        const targetId = questions[0].dosen_id;

        if (!isDataExists) {
          buttonKirim.disabled = false
          textAreaSaran.disabled = false
        } else {
          buttonKirim.disabled = true
          textAreaSaran.disabled = true
        }

        document.querySelector('#namaDosen').innerHTML = `Dosen: ${questions[0].name}`
        document.querySelector('#namaJurusan').innerHTML = `Jurusan: Teknik Informatika`
        document.querySelector('#namaMakul').innerHTML = `Matakuliah: ${questions[0].courses_name}`
        document.querySelector('#namaKelas').innerHTML = `Kelas: ${questions[0].class_name}`

        for (let i = 0; i < questions.length; i++) {
          const question = questions[i]
          tableQuestion.innerHTML += createQuestionItem(i + 1, question.question, question.questions_group)
        }

        let formResponse = document.querySelector('#formResponse')
        formResponse.addEventListener("submit", (evt) => {
          evt.preventDefault();


          const formData = new FormData(evt.target);
          const answerQuestions = Object.fromEntries(formData);

          buttonKirim.disabled = true
          textAreaSaran.disabled = true

          swal.fire({
            title: "Mohon Tunggu",
            allowOutsideClick: false,
            allowEscapeKey: false,
          })
          swal.showLoading()


          //  KIRIM DATA
          const dataSubmit = BackendSource.addResponseQuestion(targetId, coursesId, JSON.stringify(answerQuestions))
          dataSubmit.then(value1 => {
            window.location.href = "/"
            swal.close()
          })


        });

      }
    })
  }
}

export default Response
