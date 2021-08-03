import CONFIG from '../globals/config'

const CacheHelper = {
  async cachingAppShell (requests) {
    const cache = await this._openCache()
    cache.addAll(requests)
  },

  async deleteOldCache () {
    const cacheNames = await caches.keys()
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .map((filteredName) => caches.delete(filteredName))
  },

  async revalidateCache (request) {
    const response = await caches.match(request)
    if (response) {
      if (request.url.includes('detail')) {
        return this._fetchRequest(request)
      }
      return response
    }
    return this._fetchRequest(request)
  },

  async _openCache () {
    return caches.open(CONFIG.CACHE_NAME)
  },

  async _fetchRequest (request) {
    let response
    try { response = await fetch(request) } catch (e) {
      response = await caches.match(request)
    }
    if (!response || response.status !== 200) {
      return response
    }

    await this._addCache(request)
    return response
  },

  async _addCache (request) {
    const cache = await this._openCache()
    cache.add(request)
  }
}

export default CacheHelper
