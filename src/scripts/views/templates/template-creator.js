const mahasiswaViewCreateListDosen = () => `
    <div class="container">

        <h1 class="mt-5"><img class="me-4" src="https://www.polnep.ac.id/public/assets/images/theme/icon.png"
                              style="width: 3em; height: 3em;" alt="Logo Polnep">Kuesioner Online D3 | Teknik
            Informatika</h1>

        <h2 class="mt-5 text-secondary">List Dosen</h2>

        <table class="table table-striped table-hover table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nama Dosen</th>
                <th scope="col">Mata Kuliah</th>
                <th scope="col">Waktu</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody id="tableDosen">
            </tbody>
        </table>
    </div>
`
const dosenViewCreateListCourses = () => `
    <div class="container">
        <h1 class="mt-5"><img class="me-4" src="https://www.polnep.ac.id/public/assets/images/theme/icon.png"
                              style="width: 3em; height: 3em;" alt="Logo Polnep">Kuesioner Online D3 | Teknik
            Informatika</h1>

        <h2 class="mt-5 mb-3 text-secondary">Kinerja Dosen Menurut Penilaian Mahasiswa</h2>

        <table class="table table-responsive table-striped table-hover table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Mata Kuliah</th>
                <th scope="col">Kelas</th>
                <th scope="col">Tahun</th>
                <th scope="col">Semester</th>
                <th scope="col">Aksi</th>
            </tr>
            </thead>
            <tbody id="tableDosen">
       
            </tbody>
        </table>
    </div>
`
const teknisiViewHome = () => `
    <div class="container">

        <h1 class="mt-5"><img class="me-4" src="https://www.polnep.ac.id/public/assets/images/theme/icon.png"
                              style="width: 3em; height: 3em;" alt="Logo Polnep">Kuesioner Online D3 | Teknik
            Informatika</h1>

        <h2 class="mt-5 text-secondary">List Dosen</h2>

        <table class="table table-striped table-hover table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nama Dosen</th>
                <th scope="col">Mata Kuliah</th>
                <th scope="col">Waktu</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody id="tableDosen">
            </tbody>
        </table>
    </div>
`
const adminViewHome = () =>`
<div class="container mt-5">
  <div class="p-2 list-group">
    <a href="/#/admin/user" class="btn btn-primary m-2">Users</a>
    <a href="/#/admin/kelas" class="btn btn-danger m-2">Kelas</a>
    <a href="/#/admin/makul" class="btn btn-dark m-2">Makul</a>
    <a href="/#/admin/question" class="btn btn-secondary m-2">Question</a>
  </div>
</div>
`

const dosenViewCreateItemListCourses = (no, makul, kelas, tahun, semester, id) => `
  <tr>
      <th scope="row">${no}</th>
      <td>${makul}</td>      
      <td>${kelas}</td>      
      <td>${tahun}</td>      
      <td>${semester}</td>      
      <td><a id="questioner" class="btn btn-primary" href="#/dosen/penilaian?coursesId=${id}">Detail</a></td>      
  </tr>     
`
const createListDosenItem = (no, nama, makul, stamp, courseId, userId, dataExists) => {
  return `
 <tr>
    <th scope="row">${no}</th>
    <td>${nama}</td>
    <td>${makul}</td>
    <td>${!dataExists ? '-' : stamp}</td>
    <td ><a id="questioner" class="btn ${dataExists ? "disabled" : ""} ${!dataExists ? 'btn-danger' : 'btn-primary'}" href="#/response?userId=${userId}&coursesId=${courseId}">${!dataExists ? 'Belum Dikerjakan' : 'Sudah Dikerjakan'}</a></td>
</tr>
`
}
const createQuestionItem = (nomorSoal, question, answer) => {
  const isDataExists = answer !== null


  let optionsHTML = ``
  for (let i = 1; i <= 5; i++) {
    optionsHTML += `<th><input class="form-check-input" type="radio" name="q${nomorSoal}" id="q${nomorSoal}-${i}" value="${i}" aria-label="${i}" ${isDataExists ? 'disabled' : ''} required></th>`
  }

  return `
<tr>
    <th>${nomorSoal}</th>
    <th class="soal">${question}</th>
    ${optionsHTML}
</tr>
`
}

const createHeader = (namaUser) => `
    <nav class="navbar navbar-expand-sm navbar-dark">
        <div class="container-fluid">

        <a class="navbar-brand" href="#">Kuesioner TI</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
         <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav col-6">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </div>
              
              <div class="col-6 text-white text-end d-inline">
                <div class="d-inline">${namaUser} 
                <img class="px-2" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" width="50em" alt="Avatar"></div>
                <div class="d-inline"><button id="logoutButton" type="button" class="btn btn-danger">Logout</button></div>
              </div>
            </div>
        
    </nav>
`
const createFooter = () => `
 <div class="container  py-3 text-center">
        <span class="text-muted" tabindex="0">Copyright © 2021 Questioner TI | </span>
        <a class="text-muted" tabindex="0" href="https://github.com/Leguna" style="text-decoration: none">Ahmad Tuflihun</a>
    </div>
`


const dosenDetailCoursesResponse = () => `
<div class="container my-5 p-5 bg-light border rounded-3">
        <h1>Kuesioner</h1>
        <h5 class="text-muted">Detail Hasil Kuesioner.</h5>
        <br>
        <table class="table table-responsive-md table-borderless mt-2">
            <tr>
                <th id="namaDosen" scope="col">-</th>
                <th id="namaMakul" scope="col">-</th>
            </tr>
            <tr>
                <th id="namaSemester" scope="col">-</th>
                <th id="namaKelas" scope="col">-</th>
            </tr>
        </table>
        <table id="q-table" class="table table-striped table-hover table-bordered">
              <thead>
              <tr>
                  <th scope="col" colspan="1">#</th>
                  <th scope="col" colspan="1">Pertanyaan</th>
                  <th scope="col" colspan="1"  style="">Rata-rata</th>
              </tr>
              <tr>
              </tr>
              </thead>
              <tbody id="tableQuestion">
              </tbody>
              <tfoot>
              <tr>
              <th colspan="2">Rata-Rata Seluruh</th>
              <td id="ratarata" style="text-align: center;" colspan="1">-</td>
              </tr>
              </tfoot>
          </table>
            <table class="table table-hover my-5">
              <thead>
              <tr><th colspan="2" style="text-align: center">Saran</th></tr>
              </thead>
              <tbody id="tableSaran">
              
              </tbody>
            </table>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mt-3">
                <a href="/#/" class="btn btn-danger">Kembali</a>
            </div>
    </div>
`
const dosenViewCreateQuestionItemDetailResponse = (no,pertanyaan,rata) => `
<tr>
  <th>${no}</th>
  <td>${pertanyaan}</td>
  <td style="min-width: 6em;align-content: center;text-align: center;">${rata}</td>
</tr>
`
const dosenViewDetailTableSaran = (saran)=>`
<tr><td style="text-align: center">${saran}</td></tr>
`

export {
  dosenViewDetailTableSaran,
  dosenDetailCoursesResponse,
  dosenViewCreateQuestionItemDetailResponse,
  createHeader,
  createFooter,
  mahasiswaViewCreateListDosen,
  createListDosenItem,
  createQuestionItem,
  dosenViewCreateListCourses,
  dosenViewCreateItemListCourses,
  adminViewHome,
  teknisiViewHome
}
