import {dosenDetailCoursesResponse} from '../../templates/template-creator'
import UrlParser from "../../../routes/url-parser";
import BackaendSource from "../../../data/backend-source";

const AdminUser = {

  async render() {
    const credentials = BackaendSource.getCredentials()
    let show = ''
    if (credentials == null) {
      window.location.href = "/#/login"
    } else {
      show = `
<div class="container p-5">
  <div class="border border-1 p-5 m-2">
  <h1>List user</h1>
  <div class="row my-4">
    <div class="col">
        <select class="form-select" aria-label="">
      <option value="1">Dosen</option>
      <option value="2">Teknisi</option>
      <option value="3">Mahasiswa</option>
    </select>
    </div>
  <div class="col">
      <button id="refreshList" class="btn btn-secondary fa fa-refresh btn-lg"></button>
    </div>
  </div>
    <table class="table table-bordered">
      <thead>
        <tr>
           <th>#</th>
           <th>Nama</th>
           <th>NIM</th>
           <th>Username</th>
           <th>Email</th>
           <th>Role</th>
           <th>Aksi</th>
        </tr>
      </thead>
        <tbody>
          <tr>
              <th>1</th>
              <td>Ahmad Tuflihun</td>
              <td>3201816084</td>
              <td>tuflihun</td>
              <td>ahmadgabut@gmail.com</td>
              <td>Mahasiswa</td>
              <td>
              <a class="btn btn-success fa fa-edit" href="/#/admin/user/edit"></a>
              <button id="3201816084" class="btn btn-danger fa fa-trash delete" value="3201816084"></button>
              </td>
          </tr>
          <tr>
              <th>2</th>
              <td>Siswa 2</td>
              <td>2001</td>
              <td>tuflihun</td>
              <td>ahmadgabut@gmail.com</td>
              <td>Mahasiswa</td>
              <td>
              <a class="btn btn-success fa fa-edit" href="/#/admin/user/edit"></a>
              <button id="2001" class="btn btn-danger fa fa-trash delete" value="2001"></button>
              </td>
          </tr>
          <tr>
              <th>3</th>
              <td>Siswa 3</td>
              <td>2002</td>
              <td>tuflihun</td>
              <td>ahmadgabut@gmail.com</td>
              <td>Mahasiswa</td>
              <td>
              <a class="btn btn-success fa fa-edit" href="/#/admin/user/edit"></a>
              <button id="2002" class="btn btn-danger fa fa-trash delete" value="2002"></button>
              </td>
          </tr>
      </tbody>
    </table>
    <div class="d-inline">
    <a class="btn btn-secondary" href="/#/"><i class="fa fa-arrow-left"></i></a>
    <a class="btn btn-primary " href="/#/admin/user/add"><i class="fa fa-plus"></i> Tambah user</a>
</div>
    </div>
</div>
      `
    }

    return show
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const {coursesid} = url.params

    const listButtonDelete = document.querySelectorAll('.delete')

    listButtonDelete.forEach(buttonDelete => {
      console.log(buttonDelete.value)
      buttonDelete.addEventListener('click',evt => {

        console.log(this.value)
      })
    })
  }

}

export default AdminUser
