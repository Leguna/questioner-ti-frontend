import routes from '../routes/routes'
import UrlParser from '../routes/url-parser'
import { createHeader, createFooter } from './templates/template-creator'

import '../../styles/main.scss'
import BackendSource from '../data/backend-source'
import 'bootstrap'
import '@fortawesome/fontawesome-free'

class App {
  constructor ({ content }) {
    this._content = content
    this._initialAppShell()
  }

  _initialAppShell () {
  }

  async renderPage () {
    const url = UrlParser.parseActiveUrlWithCombiner()

    const page = routes[url]

    const credentials = BackendSource.getCredentials()
    if (credentials) {
      let checkCredentials
      try {
        checkCredentials = await BackendSource.checkCredentials(credentials)
        if (url === '/login') {
          window.location.href = '/'
        }
      } catch (e) {
        sessionStorage.clear()
        window.location.href = '/#/login'
      }
      if (!checkCredentials.data.isValid) {
        sessionStorage.clear()
        window.location.href = '/#/login'
      }
    } else {
      window.location.href = '/#/login'
    }

    if (url !== '/login') {
      document.querySelector('.header').innerHTML = createHeader(credentials.name)
      document.querySelector('.footer').innerHTML = createFooter()
      document.querySelector('#logoutButton').addEventListener('click', evt => {
        sessionStorage.removeItem('credentials')
        window.location.href = '#/login'
      })
    } else {
      document.querySelector('.header').innerHTML = ''
      document.querySelector('.footer').innerHTML = ''
    }

    try {
      this._content.innerHTML = await page.render()
      await page.afterRender()
    }catch (e){
      console.log(e)
      this._content.innerHTML = `
<style>
*{
    transition: all 0.6s;
}

html {
    height: 100%;
}

body{
    font-family: 'Lato', sans-serif;
    color: #888;
    margin: 0;
}

#main{
    display: table;
    width: 100%;
    height: 100vh;
    text-align: center;
}

.fof{
\t  display: table-cell;
\t  vertical-align: middle;
}

.fof h1{
\t  font-size: 50px;
\t  display: inline-block;
\t  padding-right: 12px;
\t  animation: type .5s alternate infinite;
}

@keyframes type{
\t  from{box-shadow: inset -3px 0px 0px #888;}
\t  to{box-shadow: inset -3px 0px 0px transparent;}
}
</style>
      <div id="main">
        <div class="fof">
        <h1>404: Page Not Found</h1>
        </div>
      </div>
      `
    }
  }
}

export default App
