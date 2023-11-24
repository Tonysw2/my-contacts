import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowSVG from '../../assets/icons/arrow.svg'
import EditSVG from '../../assets/icons/edit.svg'
import DeleteSVG from '../../assets/icons/trash.svg'
import SadSVG from '../../assets/sad.svg'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { ContactDTO } from '../../dtos/ContactDTO'
import { formatPhone } from '../../utils/formatPhone'
import {
  Card,
  Container,
  ErrorContainer,
  Header,
  List,
  ListContainer,
} from './styles'
import ContactsService from '../../services/ContactsService'

export function Home() {
  const [contacts, setContacts] = useState<ContactDTO[]>([])
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

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

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
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
        {!hasError && contacts.length > 0 && (
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
                    {contact.category_name && (
                      <small>{contact.category_name}</small>
                    )}
                  </div>

                  <span>{contact.email}</span>
                  <span>{formatPhone(contact.phone)}</span>
                </div>

                <div className="actions">
                  <Link to={`/edit/${contact.id}`}>
                    <img alt="Edit" src={EditSVG} />
                  </Link>
                  <button type="button">
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
