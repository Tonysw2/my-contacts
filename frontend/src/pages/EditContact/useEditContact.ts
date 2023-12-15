import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ContactFormRef } from '../../components/ContactForm'

import { ContactDTO } from '../../dtos/ContactDTO'

import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction'

import ContactsService from '../../services/ContactsService'

import { toast } from '../../utils/toast'

type FormDataType = Omit<ContactDTO, 'id' | 'category'> & { categoryId: string }

export function useEditContact() {
  const safeAsyncAction = useSafeAsyncAction()
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')
  const contactFormRef = useRef<ContactFormRef | null>(null)

  const { id } = useParams() as { id: string }
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()

    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(
          id,
          controller.signal,
        )

        safeAsyncAction(() => {
          contactFormRef.current?.setCurrentFieldValues(contactData)
          setIsLoading(false)
          setContactName(contactData.name)
        })
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          safeAsyncAction(() => {
            navigate('/', { replace: true })
            toast({ text: 'Contato não encontrado.', variant: 'danger' })
          })
        }
      }
    }

    loadContact()

    return () => {
      controller.abort()
    }
  }, [])

  async function handleSubmit(formData: FormDataType) {
    try {
      console.log(formData)
      const updatedContactData: ContactDTO =
        await ContactsService.updateContact(id, formData)

      toast({ text: 'Contato editado com sucesso!', variant: 'success' })

      setContactName(updatedContactData.name)
    } catch (error) {
      toast({ text: 'Ocorreu um erro ao editar o contato.', variant: 'danger' })
    }
  }

  return {
    isLoading,
    contactName,
    handleSubmit,
    contactFormRef,
  }
}
