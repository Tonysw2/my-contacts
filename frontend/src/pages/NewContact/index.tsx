import { ContactForm } from '../../components/ContactForm'
import { PageHeader } from '../../components/PageHeader'
import { ContactDTO } from '../../dtos/ContactDTO'
import ContactsService from '../../services/ContactsService'
import { toast } from '../../utils/toast'

export function NewContact() {
  async function handleSubmit(
    formData: Omit<ContactDTO, 'id' | 'category_name'>,
  ) {
    try {
      await ContactsService.createContact(formData)
      toast({ text: 'deu bom', variant: 'success' })
    } catch (error) {
      console.log(error)
      toast({ text: 'deu ruim', variant: 'danger' })
    }
  }

  return (
    <div>
      <PageHeader title="Novo contato" />
      <ContactForm onSubmit={handleSubmit} buttonLabel="Cadastrar" />
    </div>
  )
}
