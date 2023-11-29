import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { Modal } from '../../components/Modal'

import { ContactsList } from './components/ContactsList'
import { EmptyList } from './components/EmptyList'
import { ErrorStatus } from './components/ErrorStatus'
import { Header } from './components/Header'
import { SearchNotFound } from './components/SearchNotFound'
import { Container } from './styles'
import { useHome } from './useHome'

export function Home() {
  const {
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
  } = useHome()

  const hasContacts = contacts.length > 0
  const isListEmpty = !hasError && !isLoading && !hasContacts
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <Input
          type="text"
          $variant="search"
          placeholder="Procure por um nome..."
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && filteredContacts.length > 0 && (
        <>
          <ContactsList
            orderBy={orderBy}
            filteredContacts={filteredContacts}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            confirmLabel="Deletar"
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted.name}”?`}
          >
            <p>Esta ação não poderá ser desfeita.</p>
          </Modal>
        </>
      )}
    </Container>
  )
}
