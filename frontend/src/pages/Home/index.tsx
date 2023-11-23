import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowSVG from '../../assets/icons/arrow.svg'
import EditSVG from '../../assets/icons/edit.svg'
import DeleteSVG from '../../assets/icons/trash.svg'
import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { ContactDTO } from '../../dtos/ContactDTO'
import ContactsService from '../../services/ContactsService'
import { formatPhone } from '../../utils/formatPhone'
import { Card, Container, Header, List, ListContainer } from './styles'

export function Home() {
  const [contacts, setContacts] = useState<ContactDTO[]>([])
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [contacts, searchTerm],
  )

  useEffect(() => {
    fetchContacts()
  }, [orderBy])

  function handleToggleOrderBy() {
    setOrderBy((state) => (state === 'asc' ? 'desc' : 'asc'))
  }

  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  async function fetchContacts() {
    try {
      setIsLoading(true)
      const contactsList = await ContactsService.listContacts(orderBy)
      setContacts(contactsList)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Input
        type="text"
        $variant="search"
        placeholder="Procure por um nome..."
        onChange={handleChangeSearchTerm}
      />

      <Header>
        <strong>
          {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'contato' : 'contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

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
    </Container>
  )
}
