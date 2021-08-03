import {dosenDetailCoursesResponse} from '../../templates/template-creator'
import UrlParser from "../../../routes/url-parser";
import BackaendSource from "../../../data/backend-source";
import swal from 'sweetalert2'

const UserAdd = {

  async render() {
    const credentials = BackaendSource.getCredentials()
    let show = ''
    if (credentials == null) {
      window.location.href = "/#/login"
    } else {
      show = `
<div class="container p-5">
  <div class="card p-5 m-2">
    <h1 class="pb-3">Add User</h1>
    <form id="formAddUser" method="post">
      <div class="row mb-3">
        <label for="inputNIM" class="col-sm-2 col-form-label">NIM</label>
        <div class="col-sm-10">
          <input type="text" name="inputNIM" class="form-control" id="inputNIM" required>
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" name="inputEmail">
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputUserName" class="col-sm-2 col-form-label">Username</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="inputUserName" required>
        </div>
      </div>
        <div class="row mb-3">
        <label for="inputUserName" class="col-sm-2 col-form-label">Role</label>
        <div class="col-sm-10">
          <select name="inputRole" class="form-select">
            <option selected value="2">Mahasiswa</option>
            <option value="1">Dosen</option>
            <option value="0">Teknisi</option>
          </select>
        </div>
      </div>
      
      <button id="tambahButton" type="submit" class="btn btn-primary mt-3"><i class="fa fa-plus"></i> Tambah</button>
    </form>
  </div>
</div>
      `
    }

    return show
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const {params} = url.params

    const form = document.querySelector("#formAddUser")


    form.addEventListener('submit', async (evt) => {
      evt.preventDefault()
      const formData = Object.fromEntries(new FormData(evt.target));
      console.log(formData)
      swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
      swal.showLoading()

    })


  }

}

export default UserAdd
