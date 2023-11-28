import { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ContactForm, ContactFormRef } from '../../components/ContactForm'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { ContactDTO } from '../../dtos/ContactDTO'
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction'
import ContactsService from '../../services/ContactsService'
import { toast } from '../../utils/toast'

type FormDataType = Omit<ContactDTO, 'id' | 'category'> & { categoryId: string }

export function EditContact() {
  const safeAsyncAction = useSafeAsyncAction()
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')
  const contactFormRef = useRef<ContactFormRef | null>(null)

  const { id } = useParams() as { id: string }
  const history = useHistory()

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id)

        safeAsyncAction(() => {
          contactFormRef.current?.setCurrentFieldValues(contactData)
          setIsLoading(false)
          setContactName(contactData.name)
        })
      } catch (error) {
        safeAsyncAction(() => {
          history.push('/')
          toast({ text: 'Contato não encontrado.', variant: 'danger' })
        })
      }
    }

    loadContact()
  }, [])

  async function handleSubmit(formData: FormDataType) {
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
