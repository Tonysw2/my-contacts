import { ContactForm } from '../../components/ContactForm'
import { PageHeader } from '../../components/PageHeader'
import { ContactDTO } from '../../dtos/ContactDTO'
import ContactsService from '../../services/ContactsService'

export function NewContact() {
  async function handleSubmit(
    formData: Omit<ContactDTO, 'id' | 'category_name'>,
  ) {
    try {
      const res = await ContactsService.createContact(formData)
      console.log(res)
    } catch (error) {
      console.log(error)
      alert('Deu ruim mané')
    }
  }

  return (
    <div>
      <PageHeader title="Novo contato" />
      <ContactForm onSubmit={handleSubmit} buttonLabel="Cadastrar" />
    </div>
  )
}
