import Home from '../views/pages/home'
import Login from '../views/pages/login'
import Response from '../views/pages/response'
import DosenDetail from '../views/pages/dosen-courses-detail'
import AdminUser from "../views/pages/admin/adminuser";
import UserAdd from "../views/pages/admin/useradd";

const routes = {
  '/': Home,
  '/login': Login,
  '/response': Response,
  '/dosen/penilaian': DosenDetail,
  '/admin/user': AdminUser,
  '/admin/user/add': UserAdd,
  // '/admin/kelas': AdminKelas,
  // '/admin/makul': AdminMakul,
  // '/admin/question': AdminQuestion,

}

export default routes
