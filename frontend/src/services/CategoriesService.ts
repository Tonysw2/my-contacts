import { HttpClient } from './utils/HttpClient'

class CategoriesService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  listCategories() {
    return this.httpClient.get({ path: '/categories' })
  }
}

export default new CategoriesService()
