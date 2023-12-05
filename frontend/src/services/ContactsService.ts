import ContactMapper from './mappers/ContactMapper'
import { HttpClient } from './utils/HttpClient'

type CreateContactDataType = {
  name: string
  email: string
  phone: string
  categoryId: string
}

type UpdateContactDataType = {
  name: string
  email: string
  phone: string
  categoryId: string
}

class ContactsService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listContacts(orderBy = 'asc', signal: AbortSignal) {
    const contacts = await this.httpClient.get({
      path: `/contacts?orderBy=${orderBy}`,
      options: { signal },
    })

    return contacts.map(ContactMapper.toDomain)
  }

  async getContactById(id: string, signal: AbortSignal) {
    const contact = await this.httpClient.get({
      path: `/contacts/${id}`,
      options: { signal },
    })

    return ContactMapper.toDomain(contact)
  }

  createContact(contactData: CreateContactDataType) {
    const contact = ContactMapper.topPersistence(contactData)

    return this.httpClient.post({
      path: '/contacts',
      options: {
        body: JSON.stringify(contact),
      },
    })
  }

  updateContact(id: string, contactData: UpdateContactDataType) {
    const contact = ContactMapper.topPersistence(contactData)

    return this.httpClient.put({
      path: `/contacts/${id}`,
      options: {
        body: JSON.stringify(contact),
      },
    })
  }

  deleteContact(id: string) {
    return this.httpClient.delete({ path: `/contacts/${id}` })
  }
}

export default new ContactsService()
