import { Link } from 'react-router-dom'

import EmptyBoxSVG from '../../assets/empty-box.svg'
import ArrowSVG from '../../assets/icons/arrow.svg'
import EditSVG from '../../assets/icons/edit.svg'
import DeleteSVG from '../../assets/icons/trash.svg'
import MagnifySVG from '../../assets/magnifier-question.svg'
import SadSVG from '../../assets/sad.svg'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { Modal } from '../../components/Modal'

import { formatPhone } from '../../utils/formatPhone'

import {
  Card,
  Container,
  EmptyListContainer,
  ErrorContainer,
  Header,
  List,
  ListContainer,
  SearchNotFoundContainer,
} from './styles'
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

  return (
    <Container>
      <Loader isLoading={isLoading} />

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

      {!hasError && contacts.length > 0 && (
        <Input
          type="text"
          $variant="search"
          placeholder="Procure por um nome..."
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        $justifyContent={
          hasError
            ? 'flex-end'
            : contacts.length > 0
              ? 'space-between'
              : 'center'
        }
      >
        {!hasError && contacts.length > 0 && filteredContacts.length > 0 && (
          <strong>
            {filteredContacts.length}{' '}
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={SadSVG} alt="Sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && contacts.length > 0 && filteredContacts.length < 1 && (
        <SearchNotFoundContainer>
          <img src={MagnifySVG} alt="Magnify question" />
          <span>
            Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>
            .
          </span>
        </SearchNotFoundContainer>
      )}

      {!hasError && contacts.length < 1 && (
        <EmptyListContainer>
          <img src={EmptyBoxSVG} alt="Empty box" />
          <p>
            Você ainda não tem nenhum contato cadastrado! <br /> Clique no botão
            <strong> ”Novo contato”</strong> à cima para <br /> cadastrar o seu
            primeiro!
          </p>
        </EmptyListContainer>
      )}

      {!hasError && filteredContacts.length > 0 && (
        <ListContainer $orderBy={orderBy}>
          <header>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={ArrowSVG} alt="" />
            </button>
          </header>

          <List>
            {filteredContacts.map((contact) => (
              <Card key={contact.id}>
                <div className="info">
                  <div className="contact-name">
                    <strong>{contact.name}</strong>
                    {contact.category.name && (
                      <small>{contact.category.name}</small>
                    )}
                  </div>

                  <span>{contact.email}</span>
                  <span>{formatPhone(contact.phone)}</span>
                </div>

                <div className="actions">
                  <Link to={`/edit/${contact.id}`}>
                    <img alt="Edit" src={EditSVG} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    <img alt="Delete" src={DeleteSVG} />
                  </button>
                </div>
              </Card>
            ))}
          </List>
        </ListContainer>
      )}
    </Container>
  )
}
