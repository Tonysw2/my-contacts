import { HttpClient } from './utils/HttpClient'

class ContactsService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`)
  }
}

export default new ContactsService()
