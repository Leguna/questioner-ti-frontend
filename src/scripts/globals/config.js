const CONFIG = {
  BASE_URL: process.env.NODE_ENV==='production'?'https://questioner-ti.herokuapp.com/' : 'http://localhost:5000/',
  DEFAULT_LANGUAGE: 'en-us',
  CACHE_NAME: 'TI-v1',
  DATABASE_NAME: 'ti-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'response'
}

export default CONFIG
