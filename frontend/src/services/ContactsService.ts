import { ContactDTO } from '../dtos/ContactDTO'
import { HttpClient } from './utils/HttpClient'

class ContactsService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get({ path: `/contacts?orderBy=${orderBy}` })
  }

  async createContact(contact: Omit<ContactDTO, 'id' | 'category_name'>) {
    return this.httpClient.post({
      path: '/contacts',
      options: {
        body: JSON.stringify(contact),
      },
    })
  }
}

export default new ContactsService()
