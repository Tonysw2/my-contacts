import CategoryMapper from './mappers/CategoryMapper'
import { HttpClient } from './utils/HttpClient'

class CategoriesService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listCategories() {
    const categories = await this.httpClient.get({ path: '/categories' })

    return categories.map(CategoryMapper.toDomain)
  }
}

export default new CategoriesService()
