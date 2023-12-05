import {
  ChangeEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ContactDTO } from '../../dtos/ContactDTO'

import ContactsService from '../../services/ContactsService'

import { toast } from '../../utils/toast'

export function useHome() {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState<ContactDTO[]>([])
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc')
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState<ContactDTO>(
    {} as ContactDTO,
  )

  const [searchTerm, setSearchTerm] = useState('')
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name
          .toLocaleLowerCase()
          .includes(deferredSearchTerm.toLowerCase()),
      ),
    [contacts, deferredSearchTerm],
  )

  const fetchContacts = useCallback(
    async (signal: AbortSignal) => {
      try {
        setIsLoading(true)
        const contactsList = await ContactsService.listContacts(orderBy, signal)
        setHasError(false)
        setContacts(contactsList)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setHasError(true)
        setContacts([])
      } finally {
        setIsLoading(false)
      }
    },
    [orderBy],
  )

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((state) => (state === 'asc' ? 'desc' : 'asc'))
  }, [])

  const handleDeleteContact = useCallback((contact: ContactDTO) => {
    setIsDeleteModalVisible(true)
    setContactBeingDeleted(contact)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetchContacts(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchContacts])

  function handleTryAgain() {
    const controller = new AbortController()
    fetchContacts(controller.signal)
  }

  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false)
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true)
      await ContactsService.deleteContact(contactBeingDeleted.id)
      setContacts((state) =>
        state.filter((contact) => contact.id !== contactBeingDeleted.id),
      )
      handleCloseDeleteModal()
      toast({ text: 'Contato deletado com sucesso!', variant: 'success' })
    } catch {
      toast({
        text: 'Ocorreu um erro ao deletar o contato.',
        variant: 'danger',
      })
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return {
    orderBy,
    contacts,
    hasError,
    isLoading,
    searchTerm,
    isLoadingDelete,
    filteredContacts,
    contactBeingDeleted,
    isDeleteModalVisible,
    handleTryAgain,
    handleToggleOrderBy,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleChangeSearchTerm,
    handleConfirmDeleteContact,
  }
}
