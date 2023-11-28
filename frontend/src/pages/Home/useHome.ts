import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { ContactDTO } from '../../dtos/ContactDTO'

import ContactsService from '../../services/ContactsService'

import { toast } from '../../utils/toast'

export function useHome() {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [contacts, setContacts] = useState<ContactDTO[]>([])
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc')
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState<ContactDTO>(
    {} as ContactDTO,
  )

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [contacts, searchTerm],
  )

  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true)
      const contactsList = await ContactsService.listContacts(orderBy)
      setHasError(false)
      setContacts(contactsList)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [orderBy])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  function handleToggleOrderBy() {
    setOrderBy((state) => (state === 'asc' ? 'desc' : 'asc'))
  }

  function handleTryAgain() {
    fetchContacts()
  }

  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function handleDeleteContact(contact: ContactDTO) {
    setIsDeleteModalVisible(true)
    setContactBeingDeleted(contact)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false)
    setContactBeingDeleted({} as ContactDTO)
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
