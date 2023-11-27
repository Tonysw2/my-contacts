import { ContactDTO } from '../dtos/ContactDTO'
import { HttpClient } from './utils/HttpClient'

class ContactsService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get({ path: `/contacts?orderBy=${orderBy}` })
  }

  getContactById(id: string) {
    return this.httpClient.get({ path: `/contacts/${id}` })
  }

  createContact(contact: Omit<ContactDTO, 'id' | 'category_name'>) {
    return this.httpClient.post({
      path: '/contacts',
      options: {
        body: JSON.stringify(contact),
      },
    })
  }

  updateContact(id: string, contact: Omit<ContactDTO, 'id' | 'category_name'>) {
    return this.httpClient.put({
      path: `/contacts/${id}`,
      options: {
        body: JSON.stringify(contact),
      },
    })
  }
}

export default new ContactsService()
