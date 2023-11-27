import { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ContactForm } from '../../components/ContactForm'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { ContactDTO } from '../../dtos/ContactDTO'
import ContactsService from '../../services/ContactsService'
import { toast } from '../../utils/toast'

type ContactFormHandle = {
  setCurrentFieldValues: (contact: ContactDTO) => void
}

export function EditContact() {
  const contactFormRef = useRef<ContactFormHandle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')

  const { id } = useParams() as { id: string }
  const history = useHistory()

  useEffect(() => {
    loadContact()
  }, [id])

  async function loadContact() {
    try {
      const contactData = await ContactsService.getContactById(id)
      contactFormRef.current?.setCurrentFieldValues(contactData)
      setIsLoading(false)
      setContactName(contactData.name)
    } catch {
      history.push('/')
      toast({ text: 'Contato não encontrado.', variant: 'danger' })
    }
  }

  async function handleSubmit(
    formData: Omit<ContactDTO, 'id' | 'category_name'>,
  ) {
    try {
      const updatedContactData: ContactDTO =
        await ContactsService.updateContact(id, formData)

      toast({ text: 'Contato editado com sucesso!', variant: 'success' })

      setContactName(updatedContactData.name)
    } catch (error) {
      toast({ text: 'Ocorreu um erro ao editar o contato.', variant: 'danger' })
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Salvar alterações"
      />
    </>
  )
}
