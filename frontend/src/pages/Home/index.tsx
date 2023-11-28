import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
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

import { ContactDTO } from '../../dtos/ContactDTO'

import ContactsService from '../../services/ContactsService'

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
import { toast } from '../../utils/toast'

export function Home() {
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
