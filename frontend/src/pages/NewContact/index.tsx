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

      toast({ text: 'Contato criado com sucesso!', variant: 'success' })
    } catch (error) {
      toast({
        text: 'Ocorreu um erro ao criar um novo contato.',
        variant: 'danger',
      })
    }
  }

  return (
    <div>
      <PageHeader title="Novo contato" />
      <ContactForm onSubmit={handleSubmit} buttonLabel="Cadastrar" />
    </div>
  )
}
