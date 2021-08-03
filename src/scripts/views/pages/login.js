import BackendSource from '../../data/backend-source'
import '../../../styles/login.scss'
import swal from "sweetalert2";

const LoginPage = {
  async render() {
    return `
<div id="login">
    <div id="loginFluid" class="container-fluid">
      <div class="row" style="height: 100%">
        <div id="loginLeft" class="col-md-6 col-sm-12 p-5">
          <div id="loginLeftContainer">
            <img id="imageLogo" src="/assets/logo.png" alt="" />
            <h3>Welcome</h3>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quod eius deserunt quisquam, libero tempore, corrupti, placeat sed quia accusamus eaque laboriosam ipsam incidunt dicta eos maiores ratione veniam exercitationem.
            </p>
          </div>
        </div>
        <div id="loginRight" class="col-md-6 col-sm-12 formContainer p-5">
          <div
            class=""
            id="backgroundLogin"
          >
            <div class="box" id="box1"></div>
            <div class="box" id="box2"></div>
            <div class="box" id="box3"></div>
          </div>
          <div id="formLogin">
            <!-- <form action="speech.html" method="post" class="form"> -->
            <form id="loginAction" action="" class="form">
              <div class="logo img-fluid mb-5">
                <img src="" alt="" />
                <h2 style="font-weight: bold">SIGN IN</h2>
                <hr id="hr2" />
              </div>

              <div class="form-group mb-4">
                <input
                  type="text"
                  class="form-control"
                  id="usernameInput"
                  aria-describedby="emailHelp"
                  autocomplete="username"
                  placeholder="Masukkan Username"
                />
              </div>
              <div class="form-group mb-4">
                <div class="input-group">
                  <input
                    v-model="pass"
                    type="password"
                    class="form-control"
                    id="passwordInput"
                    placeholder="Masukkan Password"
                    autocomplete="current-password"
                  />

                  <!-- <div class="input-group-append">
                    <span
                      class="input-group-text"
                      style="z-index: 1; height: 100%"
                    >
                      <BIconEye style="cursor: pointer" />
                    </span>
                  </div> -->
                </div>
              </div>
              <div class="form-group m-5">
<!--                <div class="input-group">-->
<!--                  <select class="form-control">-->
<!--                    <option>Admin</option>-->
<!--                    <option>Dosen</option>-->
<!--                    <option>Mahasiswa</option>-->
<!--                  </select>-->
<!--                </div>-->
              </div>
              <div
                id="loginFailed"
                class="alert alert-danger"
                role="alert"
                hidden
              >
                Login failed. Invalid email or password.
              </div>
              
            </form>
            <div class="buttonDiv">
                <button
                  id="buttonLogin"
                  class="
                    btn btn-primary btn-block btn-primary
                    rounded-pill
                    text-center
                  "
                  style="margin: auto"
                >
                  <p id="buttonLoginText" class="font-weight-bold">LOGIN</p>
                </button>
              </div>
            <div class="lds-dual-ring"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
  },

  async afterRender() {
    document.querySelector('.header').html = ""
    document.querySelector('.footer').html = ""

    document.querySelector('#buttonLogin').addEventListener("click", async () => {
      swal.fire({
        title: "Mohon Tunggu",
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
      swal.showLoading()

      try {
        const username = document.querySelector('#usernameInput').value
        const password = document.querySelector('#passwordInput').value
        await BackendSource.checkCredentials({username: username, password:password}).then(response => {
          swal.hideLoading()
          swal.close()

          if (response.data.isValid && response.status == 200) {
            sessionStorage.setItem('credentials', JSON.stringify(response.data.credentials));
            window.location.href = '/'
          }
        })
      } catch (e) {
        swal.close()
        await swal.fire(
          'Gagal!',
          'Login gagal. Harap coba lagi!',
          'error'
        )
      }
    })
  }
}


export default LoginPage
