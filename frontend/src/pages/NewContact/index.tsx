import { useRef } from 'react'
import { ContactForm, ContactFormRef } from '../../components/ContactForm'
import { PageHeader } from '../../components/PageHeader'
import { ContactDTO } from '../../dtos/ContactDTO'
import ContactsService from '../../services/ContactsService'
import { toast } from '../../utils/toast'

export type FormDataType = Omit<ContactDTO, 'id' | 'category'> & {
  categoryId: string
}

export function NewContact() {
  const contactFormRef = useRef<ContactFormRef | null>(null)

  async function handleSubmit(formData: FormDataType) {
    try {
      await ContactsService.createContact(formData)
      contactFormRef.current?.resetFields()
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
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
      />
    </div>
  )
}
