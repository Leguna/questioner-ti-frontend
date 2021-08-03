const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase()
    const splitedUrl = this._urlSplitter(url)
    return this._urlCombiner(splitedUrl)
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase()
    return this._urlSplitter(url)
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('?')
    let resource = ""

    resource = urlsSplits[0]
    const params = this._regex("?"+urlsSplits[1])
    return {
      resource: resource || null,
      params: params || null
    }
  },

  _urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `${splitedUrl.resource}` : '/') +
      (splitedUrl.id ? '/:id' : '') +
      (splitedUrl.verb ? `/${splitedUrl.verb}` : '')
  },

  _regex(data) {

    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while (match = regex.exec(data)) {
      params[match[1]] = match[2];
    }
    return params
  }
}

export default UrlParser
