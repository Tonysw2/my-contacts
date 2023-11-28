import { useRef } from 'react'

import ContactsService from '../../services/ContactsService'

import { toast } from '../../utils/toast'
import { ContactDTO } from '../../dtos/ContactDTO'
import { ContactFormRef } from '../../components/ContactForm'

export type FormDataType = Omit<ContactDTO, 'id' | 'category'> & {
  categoryId: string
}

export function useNewContact() {
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

  return {
    contactFormRef,
    handleSubmit,
  }
}
